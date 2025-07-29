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
TEMPLATE_PATH="cloudformation/codedeploy/app.yml"
STACK_NAME="${ENV}-${PROJECT}-codedeploy"

# ✅ CloudFormation の Output を取得する関数
stack_output() {
  aws cloudformation describe-stacks \
    --stack-name "$1" \
    --query "Stacks[0].Outputs[?OutputKey=='$2'].OutputValue" \
    --output text \
    --region "$REGION"
}

echo "🔍 事前リソースの確認中..."

CLUSTER_NAME=$(stack_output "${ENV}-${PROJECT}-ecs" ECSClusterName)
SERVICE_NAME=$(stack_output "${ENV}-${PROJECT}-ecs-service" ECSServiceName)
TG1_ARN=$(stack_output "${ENV}-${PROJECT}-alb" TargetGroup1Arn)
TG2_ARN=$(stack_output "${ENV}-${PROJECT}-alb" TargetGroup2Arn)
LISTENER_ARN=$(stack_output "${ENV}-${PROJECT}-alb" AlbListenerArn)

echo "▶️ CodeDeploy スタックの作成中..."
aws cloudformation deploy \
  --template-file "$TEMPLATE_PATH" \
  --stack-name "$STACK_NAME" \
  --region $REGION \
  --role-arn ${CF_EXEC_ROLE} \
  --parameter-overrides \
    Environment=$ENV \
    ProjectName=$PROJECT \
    ECSClusterName=$CLUSTER_NAME \
    ServiceName=$SERVICE_NAME \
    TargetGroup1Arn=$TG1_ARN \
    TargetGroup2Arn=$TG2_ARN \
    ListenerArn=$LISTENER_ARN \
    DeployBucketName=${DEPLOY_BUCKET} \
  --capabilities CAPABILITY_NAMED_IAM

echo "✅ CodeDeploy スタックの作成が完了しました"
