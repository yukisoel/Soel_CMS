#!/bin/bash
set -euo pipefail

# === 引数処理 ===
ENV="${1:-xxx}"
if [[ "$ENV" != "dev" && "$ENV" != "prd" ]]; then
  echo "❌ 使用方法: $0 [dev|prd]"
  exit 1
fi

# === 環境変数読み込み ===
source ./env/${ENV}.env

STACK_NAME="${ENV}-${PROJECT}-rds-bastion"
TEMPLATE_FILE="cloudformation/rds/rds-bastion.yml"

# === 依存スタックの出力を取得 ===
VPC_STACK_NAME="${ENV}-${PROJECT}-vpc"
SG_STACK_NAME="${ENV}-${PROJECT}-sg"
SECRETS_STACK_NAME="${ENV}-${PROJECT}-secrets"

echo "🔍 Retrieving CloudFormation Outputs..."

PRI_SUBNET_ID_1=$(aws cloudformation describe-stacks \
  --stack-name "$VPC_STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='SubnetPrivate1'].OutputValue" \
  --output text \
  --region "$REGION")

PRI_SUBNET_ID_2=$(aws cloudformation describe-stacks \
  --stack-name "$VPC_STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='SubnetPrivate2'].OutputValue" \
  --output text \
  --region "$REGION")

RDS_SG_ID=$(aws cloudformation describe-stacks \
  --stack-name "$SG_STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='RdsSecurityGroup'].OutputValue" \
  --output text \
  --region "$REGION")

SECRET_ARN=$(aws secretsmanager describe-secret \
  --secret-id "$SECRET_NAME" \
  --region "$REGION" \
  --query "ARN" \
  --output text)

# === RDSと踏み台の作成 ===
echo "🚀 Deploying RDS and Bastion host..."

aws cloudformation deploy \
  --template-file "$TEMPLATE_FILE" \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    Environment="$ENV" \
    ProjectName="$PROJECT" \
    SubnetPrivate1="$PRI_SUBNET_ID_1" \
    SubnetPrivate2="$PRI_SUBNET_ID_2" \
    RDSSecurityGroupId="$RDS_SG_ID" \
    RDSCredentialsSecretArn="$SECRET_ARN" \
    RDSInstanceClass="$DB_INSTANCE_CLASS" \
    BastionInstanceClass="$BASTION_INSTANCE_CLASS"

# === RDS エンドポイント取得 & シークレット更新 ===
echo "🔍 Fetching RDS endpoint to update secret..."
RDS_ENDPOINT=$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='RDSEndpoint'].OutputValue" \
  --output text \
  --region "$REGION")

SECRET_STRING=$(aws secretsmanager get-secret-value \
  --secret-id "$SECRET_NAME" \
  --region "$REGION" \
  --query SecretString \
  --output text)

UPDATED_SECRET=$(echo "$SECRET_STRING" | jq --arg host "$RDS_ENDPOINT" '.POSTGRES_HOST = $host')

echo "📝 Updating secret with RDS endpoint..."
aws secretsmanager put-secret-value \
  --secret-id "$SECRET_NAME" \
  --region "$REGION" \
  --secret-string "$UPDATED_SECRET"

echo "✅ RDS & Bastion stack deployed: $STACK_NAME"