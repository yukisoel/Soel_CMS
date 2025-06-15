#!/bin/bash
set -euo pipefail

# === 引数処理 ===
ENV="${1:-xxx}"  # 引数がなければ "xxx" をダミーとして使用
if [[ "$ENV" != "dev" && "$ENV" != "prd" ]]; then
  echo "❌ 使用方法: $0 [dev|prd]"
  exit 1
fi

# 出力を less などに渡さないようにする
export AWS_PAGER=""

# === 設定 ===
source ./env/${ENV}.env

# === ECS サービス停止・削除 ===
echo "🛑 ECS サービスを停止＆削除します（${SERVICE_NAME}）"

# DesiredCount を 0 に更新
echo "🔻 Updating desired count to 0..."
aws ecs update-service \
  --cluster "$CLUSTER_NAME" \
  --service "$SERVICE_NAME" \
  --desired-count 0 \
  --region "$REGION" || echo "⚠️ サービスが見つからないか既に削除済み"

# タスクが停止するのを待機（10秒）
echo "⏱️ 停止待機中..."
sleep 10

# サービス削除（force 付き）
echo "🗑️ Deleting ECS service..."
aws ecs delete-service \
  --cluster "$CLUSTER_NAME" \
  --service "$SERVICE_NAME" \
  --force \
  --region "$REGION" || echo "⚠️ サービスが見つからないか既に削除済み"

# === ECR リポジトリ削除 ===
echo "🗑️ Deleting ECR repository: $ECR_REPO_NAME"
aws ecr delete-repository \
  --repository-name "$ECR_REPO_NAME" \
  --force \
  --region "$REGION" || echo "⚠️ ECR repository not found or already deleted"

# === CloudFormation stacks の削除 ===
STACKS=(
  "${ENV}-${PROJECT}-cognito"
  "${ENV}-${PROJECT}-codedeploy"
  "${ENV}-${PROJECT}-ecs-service"
  "${ENV}-${PROJECT}-ecs"
  "${ENV}-${PROJECT}-rds-bastion"
  "${ENV}-${PROJECT}-ecr"
  "${ENV}-${PROJECT}-alb"
  "${ENV}-${PROJECT}-vpce"
  "${ENV}-${PROJECT}-sg"
  "${ENV}-${PROJECT}-routes"
  "${ENV}-${PROJECT}-igw-nat"
  "${ENV}-${PROJECT}-vpc"
)

echo "▶️ CloudFormation stacks を削除中..."
for stack in "${STACKS[@]}"; do
  echo "🧹 Deleting stack: $stack"
  aws cloudformation delete-stack --stack-name "$stack" --region "$REGION"
  echo "⏱️ 停止待機中..."
  sleep 3
done

echo "⏳ スタックの削除を待機（任意で監視を推奨）"

# === SecretsManager シークレット削除 ===
# echo "🗝️ Deleting secret: $SECRET_NAME"
# aws secretsmanager delete-secret \
#   --secret-id "$SECRET_NAME" \
#   --force-delete-without-recovery \
#   --region "$REGION" || echo "⚠️ Secret not found or already deleted"

# === CloudWatch Logs 削除 ===
echo "📋 Deleting CloudWatch Logs group: $LOG_GROUP"
aws logs delete-log-group \
  --log-group-name "$LOG_GROUP" \
  --region "$REGION" || echo "⚠️ Log group not found or already deleted"

# === ユーザープール削除 ===
echo "🔍 ユーザープール名 '$USER_POOL_NAME' の ID を取得中..."

USER_POOL_ID=$(aws cognito-idp list-user-pools \
  --max-results 60 \
  --region "$REGION" \
  --query "UserPools[?Name=='$USER_POOL_NAME'].Id" \
  --output text)

if [[ -z "$USER_POOL_ID" ]]; then
  echo "⚠️ ユーザープール '$USER_POOL_NAME' は見つかりませんでした。"
  exit 1
fi

echo "✅ 見つかりました: ユーザープールID = $USER_POOL_ID"
echo -n "⚠️ 本当にこのユーザープールを削除しますか？ [y/N]: "
read -r CONFIRM

if [[ "$CONFIRM" == "y" || "$CONFIRM" == "Y" ]]; then
  echo "🗑️ ユーザープールを削除中..."
  aws cognito-idp delete-user-pool \
    --user-pool-id "$USER_POOL_ID" \
    --region "$REGION"
  echo "✅ 削除完了"
else
  echo "キャンセルしました。"
fi
echo "✅ クリーンアップ指示完了 スタックが完全に削除されるまでは数十分かかる場合があります"
