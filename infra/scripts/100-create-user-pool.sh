#!/bin/bash
set -euo pipefail

# === 引数処理 ===
ENV="${1:-xxx}"
if [[ "$ENV" != "dev" && "$ENV" != "prd" ]]; then
  echo "❌ 使用方法: $0 [dev|prd]"
  exit 1
fi

# === 設定読み込み ===
source ./env/${ENV}.env

echo "🚀 Cognito ユーザープール を確認中..."

# === 既存のユーザープール確認 ===
EXISTING_USER_POOL_ID=$(aws cognito-idp list-user-pools \
  --max-results 60 \
  --region "$REGION" \
  --query "UserPools[?Name=='$USER_POOL_NAME'].Id" \
  --output text)

# === CloudFormation パラメータ組み立て ===
PARAMS="Environment=$ENV ProjectName=$PROJECT UserPoolClientName=$USER_POOL_CLIENT_NAME UserPoolName=$USER_POOL_NAME"

if [[ -n "$EXISTING_USER_POOL_ID" ]]; then
  echo "🔁 既存のユーザープールを再利用: $EXISTING_USER_POOL_ID"
  PARAMS="$PARAMS ExistingUserPoolId=$EXISTING_USER_POOL_ID"
else
  echo "🆕 ユーザープールが見つかりません、新規作成します"
fi

# === CloudFormation デプロイ ===
aws cloudformation deploy \
  --template-file cloudformation/cognito/cognito.yml \
  --stack-name ${ENV}-${PROJECT}-cognito \
  --parameter-overrides $PARAMS \
  --region $REGION \
  --role-arn ${CF_EXEC_ROLE}

echo "✅ Cognito ユーザープール デプロイ完了"
