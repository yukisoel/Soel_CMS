#!/bin/bash
set -euo pipefail

# === 引数処理 ===
ENV="${1:-xxx}"  # 引数がなければ "xxx" をダミーとして使用
if [[ "$ENV" != "dev" && "$ENV" != "prd" ]]; then
  echo "❌ 使用方法: $0 [dev|prd]"
  exit 1
fi

# === 設定 ===
source ./env/${ENV}.env
IMAGE_TAG="${2:-init}"

REPO_URI=$(aws cloudformation describe-stacks \
  --stack-name ${ENV}-${PROJECT}-ecr \
  --query "Stacks[0].Outputs[?OutputKey=='ECRRepositoryUri'].OutputValue" \
  --output text --region "$REGION")

# === 既存イメージの確認 ===
echo "🔍 既存イメージの確認中 (${IMAGE_TAG})..."
if aws ecr describe-images \
  --repository-name "${REPO_URI##*/}" \
  --image-ids imageTag="${IMAGE_TAG}" \
  --region "$REGION" >/dev/null 2>&1; then
  echo "⏭️  イメージ ${IMAGE_TAG} は既に存在するため、ビルド＆プッシュをスキップします。"
  exit 0
fi

echo "🔐 ECR にログイン..."
aws ecr get-login-password --region $REGION \
  | docker login --username AWS --password-stdin ${REPO_URI%%/*}

echo "🚀 Docker イメージをビルド中..."
cd ..
make build_for_actions
cd backend
docker buildx build --platform linux/amd64 \
  -f Dockerfile-gitops \
  -t ${REPO_URI}:${IMAGE_TAG} \
  --push .

echo "✅ イメージのプッシュ完了"
