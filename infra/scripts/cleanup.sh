#!/bin/bash
set -euo pipefail

# 出力を less などに渡さない
export AWS_PAGER=""

#=== 共通関数 ===
confirm_yn () {
  local prompt="${1:-Proceed?}"
  read -r -p "$prompt [y/N]: " ans || true
  [[ "$ans" == "y" || "$ans" == "Y" ]]
}

stack_status () {
  # 存在しなければ NOT_FOUND を返す
  local name="$1"
  aws cloudformation describe-stacks \
    --stack-name "$name" \
    --region "$REGION" \
    --query 'Stacks[0].StackStatus' \
    --output text 2>/dev/null || echo "NOT_FOUND"
}

delete_stack_and_wait () {
  local name="$1"
  local st
  st="$(stack_status "$name")"
  if [[ "$st" == "NOT_FOUND" ]]; then
    echo "🔎 Stack not found (skip): $name"
    return 0
  fi

  echo "🧹 Deleting stack: $name (current status: $st)"
  aws cloudformation delete-stack --stack-name "$name" --region "$REGION" || {
    echo "⚠️  delete-stack 発行に失敗: $name（既に削除中の可能性）"
  }

  echo "⏳ 削除完了待機中（10秒ごとにステータス表示）: $name"
  local iter=0
  while true; do
    iter=$((iter+1))
    st="$(stack_status "$name")"
    printf "  [%s] %s : %s\n" "$(date '+%Y-%m-%d %H:%M:%S')" "$name" "$st"

    case "$st" in
      NOT_FOUND|DELETE_COMPLETE)
        echo "✅ 削除完了: $name"
        break
      ;;
      DELETE_FAILED|ROLLBACK_FAILED)
        echo "❌ 削除失敗: $name （状態: $st）" >&2
        exit 1
      ;;
      *)
        sleep 10
      ;;
    esac
  done
}

#=== 引数処理 ===
ENV="${1:-xxx}"  # 引数がなければ "xxx" をダミーとして使用
if [[ "$ENV" != "dev" && "$ENV" != "prd" ]]; then
  echo "❌ 使用方法: $0 [dev|prd]"
  exit 1
fi

#=== 設定 ===
source "./env/${ENV}.env"
REGION="${REGION:-ap-northeast-1}"

# SECRET_NAME は env にある想定。無ければ PREFIX から補完
SECRET_NAME="${SECRET_NAME:-${PREFIX}-secret}"     # 例: dev-cmssoel-secret

STACKS=(
  "${ENV}-${PROJECT}-cognito"
  "${ENV}-${PROJECT}-codedeploy"
  "${ENV}-${PROJECT}-ecs-service"
  "${ENV}-${PROJECT}-ecs"
  "${ENV}-${PROJECT}-rds"
  "${ENV}-${PROJECT}-ecr"
  "${ENV}-${PROJECT}-alb"
  "${ENV}-${PROJECT}-vpce"
  "${ENV}-${PROJECT}-sg"
  "${ENV}-${PROJECT}-routes"
  "${ENV}-${PROJECT}-igw-nat"
  "${ENV}-${PROJECT}-vpc"
)

echo "=============================="
echo "削除対象の概要"
echo "環境            : $ENV"
echo "リージョン      : $REGION"
echo "ECS クラスター  : $CLUSTER_NAME"
echo "ECS サービス    : $SERVICE_NAME"
echo "ECR リポジトリ  : $ECR_REPO_NAME"
echo "CFN スタック順  :"
for s in "${STACKS[@]}"; do echo "  - $s"; done
echo "シークレット    : $SECRET_NAME"
echo "ロググループ    : $LOG_GROUP"
echo "ユーザープール名: $USER_POOL_NAME"
echo "=============================="

#=== 開始直後の確認（ユーザープール・シークレットのみ） ===
DELETE_SECRET=false
DELETE_USERPOOL=false

if confirm_yn "シークレット ${SECRET_NAME} を削除しますか？（復旧不可）"; then
  DELETE_SECRET=true
fi

if confirm_yn "ユーザープール ${USER_POOL_NAME} を削除しますか？"; then
  DELETE_USERPOOL=true
fi

echo "選択: シークレット削除=${DELETE_SECRET}, ユーザープール削除=${DELETE_USERPOOL}"
echo

#=== ECS サービス停止・削除（必要なら順番調整可） ===
echo "🛑 ECS サービスを停止＆削除します（${SERVICE_NAME}）"

echo "🔻 Updating desired count to 0..."
aws ecs update-service \
  --cluster "$CLUSTER_NAME" \
  --service "$SERVICE_NAME" \
  --desired-count 0 \
  --region "$REGION" || echo "⚠️ サービスが見つからないか既に削除済み"

echo "⏱️ タスク停止のため短時間待機..."
sleep 10

echo "🗑️ Deleting ECS service..."
aws ecs delete-service \
  --cluster "$CLUSTER_NAME" \
  --service "$SERVICE_NAME" \
  --force \
  --region "$REGION" || echo "⚠️ サービスが見つからないか既に削除済み"

#=== ECR リポジトリ削除（CF管理でない場合のみ。CF管理ならこのブロックは外してOK） ===
echo "🗑️ Deleting ECR repository: $ECR_REPO_NAME"
aws ecr delete-repository \
  --repository-name "$ECR_REPO_NAME" \
  --force \
  --region "$REGION" || echo "⚠️ ECR repository not found or already deleted"

#=== CloudFormation stacks の削除（順次、1つずつ完了待ち） ===
echo "▶️ CloudFormation stacks を順次削除します（1件ずつ完了待ち、10秒間隔で進捗表示）"
for stack in "${STACKS[@]}"; do
  delete_stack_and_wait "$stack"
done
echo "✅ すべてのスタック削除が完了しました。"

#=== CloudWatch Logs 削除（任意。スタック外の想定） ===
echo "📋 Deleting CloudWatch Logs group: $LOG_GROUP"
aws logs delete-log-group \
  --log-group-name "$LOG_GROUP" \
  --region "$REGION" || echo "⚠️ Log group not found or already deleted"

#=== シークレット削除（開始時の選択に基づき、ここで実行） ===
if [[ "$DELETE_SECRET" == "true" ]]; then
  echo "🗝️ Deleting secret: $SECRET_NAME"
  aws secretsmanager delete-secret \
    --secret-id "$SECRET_NAME" \
    --force-delete-without-recovery \
    --region "$REGION" || echo "⚠️ Secret not found or already deleted"
  echo "✅ シークレット削除完了"
else
  echo "➡️ シークレット削除はスキップ（開始時の選択による）"
fi

#=== ユーザープール削除（開始時の選択に基づき、ここで実行） ===
if [[ "$DELETE_USERPOOL" == "true" ]]; then
  echo "🔍 ユーザープール名 '$USER_POOL_NAME' の ID を取得中..."
  USER_POOL_ID=$(aws cognito-idp list-user-pools \
    --max-results 60 \
    --region "$REGION" \
    --query "UserPools[?Name=='$USER_POOL_NAME'].Id" \
    --output text 2>/dev/null || true)

  if [[ -z "${USER_POOL_ID:-}" || "$USER_POOL_ID" == "None" ]]; then
    echo "⚠️ ユーザープール '$USER_POOL_NAME' は見つかりませんでした（既に削除済みの可能性）。"
  else
    echo "🗑️ ユーザープールを削除中... (ID: $USER_POOL_ID)"
    aws cognito-idp delete-user-pool \
      --user-pool-id "$USER_POOL_ID" \
      --region "$REGION"
    echo "✅ ユーザープール削除完了"
  fi
else
  echo "➡️ ユーザープール削除はスキップ（開始時の選択による）"
fi

echo "🎉 クリーンアップ完了"
