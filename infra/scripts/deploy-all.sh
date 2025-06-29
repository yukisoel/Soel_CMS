#!/bin/bash
set -euo pipefail

# ✅ 実行ディレクトリチェック
if [[ ! -f "scripts/deploy-all.sh" ]]; then
  echo "❌ Please run this script from the project root (e.g., ./scripts/deploy-all.sh)"
  exit 1
fi

# === 引数処理 ===
ENV="${1:-xxx}"  # 引数がなければ "xxx" をダミーとして使用
if [[ "$ENV" != "dev" && "$ENV" != "prd" ]]; then
  echo "❌ 使用方法: $0 [dev|prd]"
  exit 1
fi

SCRIPTS=(
  "010-deploy-secrets.sh"
  "020-deploy-network.sh"
  "030-deploy-alb.sh"
  "040-create-route53-alias.sh"
  "050-deploy-ecr.sh"
  "060-deploy-rds.sh"
  "070-push-dummy-image.sh"
  "080-deploy-ecs.sh"
  "090-deploy-codedeploy.sh"
  "100-create-user-pool.sh"
  # "900-deploy-app.sh"
)

echo "🚀 全スタックを順番にデプロイします"

for script in "${SCRIPTS[@]}"; do
  echo ""
  echo "==============================="
  echo "▶️ 実行中: scripts/$script"
  echo "==============================="
  bash "scripts/$script" "${ENV}"
done

echo ""
echo "✅ すべてのスクリプトが完了しました"
