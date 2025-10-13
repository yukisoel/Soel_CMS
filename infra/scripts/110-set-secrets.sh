#!/bin/bash
set -euo pipefail

# === 引数処理 ===
ENV="${1:-xxx}"
if [[ "$ENV" != "dev" && "$ENV" != "prd" ]]; then
  echo "❌ 使用方法: $0 [dev|prd]"
  exit 1
fi

# === 設定読み込み ===
source "./env/${ENV}.env"

echo "🚀 シークレットをセットします"

SECRET_NAME="${PREFIX}-secret"                 # 例: dev-cmssoel-secret
REGION="${REGION:-ap-northeast-1}"            # envファイルにREGIONがなければ既定
PATCH_FILE="./env/${ENV}.secret.env"          # 追加/更新したいキーだけ入れたJSON（任意）

# === Cognito スタック名（必要なら環境変数 COGNITO_STACK で上書き可能） ===
COGNITO_STACK="${COGNITO_STACK:-${PREFIX}-cognito}"

# --- シークレットが無ければ空JSONで作成（put-secret-value は既存前提のため） ---
if ! aws secretsmanager describe-secret --region "$REGION" --secret-id "$SECRET_NAME" >/dev/null 2>&1; then
  echo "ℹ️  シークレット ${SECRET_NAME} が存在しないため作成します"
  aws secretsmanager create-secret \
    --region "$REGION" \
    --name "$SECRET_NAME" \
    --description "${ENV}-${PROJECT} application secret" \
    --secret-string '{}'
fi

# === CFN から必要情報を取得 ===
# 1) UserPoolId
USER_POOL_ID=$(aws cloudformation describe-stacks \
  --region "$REGION" --stack-name "$COGNITO_STACK" \
  --query "Stacks[0].Outputs[?OutputKey=='UserPoolId'].OutputValue" \
  --output text 2>/dev/null || true)

if [[ -z "$USER_POOL_ID" || "$USER_POOL_ID" == "None" ]]; then
  echo "❌ CFN出力(UserPoolId)が見つかりません。スタック名やOutputsを確認してください: $COGNITO_STACK" >&2
  exit 1
fi

# 2) ClientId（Outputが無ければ Parameters のクライアント名で検索）
USER_POOL_CLIENT_ID=$(aws cloudformation describe-stacks \
  --region "$REGION" --stack-name "$COGNITO_STACK" \
  --query "Stacks[0].Outputs[?OutputKey=='UserPoolClientId'].OutputValue" \
  --output text 2>/dev/null || true)

if [[ -z "$USER_POOL_CLIENT_ID" || "$USER_POOL_CLIENT_ID" == "None" ]]; then
  USER_POOL_CLIENT_NAME=$(aws cloudformation describe-stacks \
    --region "$REGION" --stack-name "$COGNITO_STACK" \
    --query "Stacks[0].Parameters[?ParameterKey=='UserPoolClientName'].ParameterValue" \
    --output text 2>/dev/null || true)

  if [[ -n "$USER_POOL_CLIENT_NAME" && "$USER_POOL_CLIENT_NAME" != "None" ]]; then
    USER_POOL_CLIENT_ID=$(aws cognito-idp list-user-pool-clients \
      --region "$REGION" --user-pool-id "$USER_POOL_ID" --max-results 60 \
      --query "UserPoolClients[?ClientName=='$USER_POOL_CLIENT_NAME'].ClientId | [0]" \
      --output text)
  else
    # 最初の1件をフォールバック（プール内に1件だけ想定なら可）
    USER_POOL_CLIENT_ID=$(aws cognito-idp list-user-pool-clients \
      --region "$REGION" --user-pool-id "$USER_POOL_ID" --max-results 60 \
      --query "UserPoolClients[0].ClientId" --output text)
  fi
fi

if [[ -z "$USER_POOL_CLIENT_ID" || "$USER_POOL_CLIENT_ID" == "None" ]]; then
  echo "❌ UserPool ClientId を特定できませんでした。" >&2
  exit 1
fi

# 3) Hosted UI Domain（Outputが無ければ CognitoDomainPrefix から合成）
COGNITO_USER_POOL_DOMAIN=$(aws cloudformation describe-stacks \
  --region "$REGION" --stack-name "$COGNITO_STACK" \
  --query "Stacks[0].Outputs[?OutputKey=='HostedUIDomain'].OutputValue" \
  --output text 2>/dev/null || true)

if [[ -z "$COGNITO_USER_POOL_DOMAIN" || "$COGNITO_USER_POOL_DOMAIN" == "None" ]]; then
  COGNITO_DOMAIN_PREFIX=$(aws cloudformation describe-stacks \
    --region "$REGION" --stack-name "$COGNITO_STACK" \
    --query "Stacks[0].Parameters[?ParameterKey=='CognitoDomainPrefix'].ParameterValue" \
    --output text 2>/dev/null || true)
  if [[ -n "$COGNITO_DOMAIN_PREFIX" && "$COGNITO_DOMAIN_PREFIX" != "None" ]]; then
    COGNITO_USER_POOL_DOMAIN="https://${COGNITO_DOMAIN_PREFIX}.auth.${REGION}.amazoncognito.com"
  else
    # さらにフォールバック：ENV/PROJECT から推測（例：dev-cmssoel）
    FALLBACK_PREFIX="${ENV}-${PROJECT}"
    COGNITO_USER_POOL_DOMAIN="https://${FALLBACK_PREFIX}.auth.${REGION}.amazoncognito.com"
  fi
fi

# 4) ClientSecret
CLIENT_SECRET=$(aws cognito-idp describe-user-pool-client \
  --region "$REGION" --user-pool-id "$USER_POOL_ID" --client-id "$USER_POOL_CLIENT_ID" \
  --query "UserPoolClient.ClientSecret" --output text)

# === 既存のSecret値を取得（無ければ {}） ===
CURRENT_JSON=$(aws secretsmanager get-secret-value \
  --region "$REGION" --secret-id "$SECRET_NAME" \
  --query 'SecretString' --output text 2>/dev/null || echo '{}')

# === 追加/更新したいパッチ（任意ファイル） ===
PATCH_CONTENT='{}'
if [[ -f "$PATCH_FILE" ]]; then
  PATCH_CONTENT="$(cat "$PATCH_FILE")"
fi

# === Cognitoの値で構成するパッチを作成 ===
COG_PATCH=$(jq -n \
  --arg domain "$COGNITO_USER_POOL_DOMAIN" \
  --arg cid "$USER_POOL_CLIENT_ID" \
  --arg csec "$CLIENT_SECRET" \
  --arg upid "$USER_POOL_ID" \
  '{
     COGNITO_USER_POOL_DOMAIN: $domain,
     COGNITO_CLIENT_ID: $cid,
     COGNITO_USER_POOL_ID: $upid
   } + ( if $csec == "" then {} else { COGNITO_CLIENT_SECRET: $csec } end )')

# === マージ順: current <- PATCH_FILE <- COG_PATCH（後勝ちで上書き） ===
MERGED_JSON=$(jq -n \
  --argjson current "$CURRENT_JSON" \
  --argjson patch "$PATCH_CONTENT" \
  --argjson cog   "$COG_PATCH" \
  '$current * $patch * $cog')

# === 登録（新しいバージョンとして保存） ===
printf '%s' "$MERGED_JSON" > merged_secret.json
aws secretsmanager put-secret-value \
  --region "$REGION" \
  --secret-id "$SECRET_NAME" \
  --secret-string file://merged_secret.json >/dev/null

echo "✅ シークレットのセット 完了"
echo "  - ${SECRET_NAME}"
echo "  - COGNITO_USER_POOL_DOMAIN=${COGNITO_USER_POOL_DOMAIN}"
echo "  - COGNITO_CLIENT_ID=${USER_POOL_CLIENT_ID}"
if [[ -n "$CLIENT_SECRET" ]]; then
  echo "  - COGNITO_CLIENT_SECRET=******** (保存済)"
else
  echo "  - COGNITO_CLIENT_SECRET=(なし / GenerateSecret=false)"
fi
echo "  - COGNITO_USER_POOL_ID=${USER_POOL_ID}"
