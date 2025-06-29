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
# push-image で使用しているもの
IMAGE_TAG="dummy"

# ✅ ECR の ARN 取得
ECR_REPO=$(aws cloudformation describe-stacks \
  --stack-name "${ENV}-${PROJECT}-ecr" \
  --query "Stacks[0].Outputs[?OutputKey=='ECRRepositoryUri'].OutputValue" \
  --output text --region "$REGION")

# ✅ SecretsManager の ARN 取得
echo "🔍 シークレットの ARN を取得中..."
SECRET_ARN=$(aws secretsmanager describe-secret \
  --secret-id "$SECRET_NAME" \
  --region "$REGION" \
  --query "ARN" \
  --output text)

RDS_SECRET_ARN=$(aws cloudformation describe-stacks \
  --stack-name "${ENV}-${PROJECT}-rds" \
  --query "Stacks[0].Outputs[?OutputKey=='RDSSecretArn'].OutputValue" \
  --output text)

# ✅ ネットワーク関連の Output 取得
echo "🔍 サブネットとセキュリティグループの情報を取得中..."
SUBNET_PRIVATE1=$(aws cloudformation describe-stacks \
  --stack-name ${ENV}-${PROJECT}-vpc \
  --query "Stacks[0].Outputs[?OutputKey=='SubnetPrivate1'].OutputValue" \
  --output text --region "$REGION")
SUBNET_PRIVATE2=$(aws cloudformation describe-stacks \
  --stack-name ${ENV}-${PROJECT}-vpc \
  --query "Stacks[0].Outputs[?OutputKey=='SubnetPrivate2'].OutputValue" \
  --output text --region "$REGION")

ECS_SG=$(aws cloudformation describe-stacks \
  --stack-name ${ENV}-${PROJECT}-sg \
  --query "Stacks[0].Outputs[?OutputKey=='EcsSecurityGroup'].OutputValue" \
  --output text --region "$REGION")

TG1_ARN=$(aws cloudformation describe-stacks \
  --stack-name ${ENV}-${PROJECT}-alb \
  --query "Stacks[0].Outputs[?OutputKey=='TargetGroup1Arn'].OutputValue" \
  --output text --region "$REGION")
TG2_ARN=$(aws cloudformation describe-stacks \
  --stack-name ${ENV}-${PROJECT}-alb \
  --query "Stacks[0].Outputs[?OutputKey=='TargetGroup2Arn'].OutputValue" \
  --output text --region "$REGION")
LISTENER_ARN=$(aws cloudformation describe-stacks \
  --stack-name ${ENV}-${PROJECT}-alb \
  --query "Stacks[0].Outputs[?OutputKey=='AlbListenerArn'].OutputValue" \
  --output text --region "$REGION")

# === ECSクラスタ・タスク定義・IAMロール ===
echo "▶️ 1. ECSクラスタ・タスク定義・IAMロールをデプロイ中..."
aws cloudformation deploy \
  --template-file cloudformation/compute/ecs.yml \
  --stack-name ${ENV}-${PROJECT}-ecs \
  --parameter-overrides \
    Environment=$ENV \
    ProjectName=$PROJECT \
    ECRRepositoryUri=$ECR_REPO \
    ECRImageTag=$IMAGE_TAG \
    ContainerPort=$CONTAINER_PORT \
    SecretArn=$SECRET_ARN \
    RdsSecretArn=$RDS_SECRET_ARN \
    LogGroupName=$LOG_GROUP \
  --capabilities CAPABILITY_NAMED_IAM \
  --region $REGION \
  --role-arn ${CF_EXEC_ROLE}

# ✅ タスク定義とクラスタ名を取得
TASK_DEFINITION_ARN=$(aws cloudformation describe-stacks \
  --stack-name ${ENV}-${PROJECT}-ecs \
  --query "Stacks[0].Outputs[?OutputKey=='TaskDefinitionArn'].OutputValue" \
  --output text --region "$REGION")
CLUSTER_NAME=$(aws cloudformation describe-stacks \
  --stack-name ${ENV}-${PROJECT}-ecs \
  --query "Stacks[0].Outputs[?OutputKey=='ECSClusterName'].OutputValue" \
  --output text --region "$REGION")

# === ECS サービス（CodeDeploy Blue/Green 対応） ===
echo "▶️ 2. ECSサービスをデプロイ中..."
aws cloudformation deploy \
  --template-file cloudformation/compute/ecs-service.yml \
  --stack-name ${ENV}-${PROJECT}-ecs-service \
  --parameter-overrides \
    Environment=$ENV \
    ProjectName=$PROJECT \
    ECSClusterName=$CLUSTER_NAME \
    TaskDefinitionArn=$TASK_DEFINITION_ARN \
    AlbListenerArn=$LISTENER_ARN \
    TargetGroup1Arn=$TG1_ARN \
    TargetGroup2Arn=$TG2_ARN \
    SubnetPrivate1Id=$SUBNET_PRIVATE1 \
    SubnetPrivate2Id=$SUBNET_PRIVATE2 \
    EcsSecurityGroup=$ECS_SG \
  --capabilities CAPABILITY_NAMED_IAM \
  --region $REGION \
  --role-arn ${CF_EXEC_ROLE}

echo "✅ ECSサービスのデプロイが完了しました"
