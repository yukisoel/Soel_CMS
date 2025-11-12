#!/bin/bash
set -euo pipefail

# === 引数処理 ===
ENV="${1:-xxx}"  # 引数がなければ "xxx" をダミーとして使用
if [[ "$ENV" != "dev" && "$ENV" != "prd" ]]; then
  echo "❌ 使用方法: $0 [dev|prd]"
  exit 1
fi

# 📌 環境変数
source ./env/${ENV}.env
TEMPLATE_DIR="cloudformation/network"

# ✅ CloudFormation の Output を取得する関数
stack_output() {
  aws cloudformation describe-stacks \
    --stack-name "$1" \
    --query "Stacks[0].Outputs[?OutputKey=='$2'].OutputValue" \
    --output text \
    --region "$REGION"
}

echo "▶️ 1. VPC スタック作成"
aws cloudformation deploy \
  --template-file ${TEMPLATE_DIR}/vpc.yml \
  --stack-name ${ENV}-${PROJECT}-vpc \
  --parameter-overrides Environment=$ENV ProjectName=$PROJECT \
  --region $REGION \
  --role-arn ${CF_EXEC_ROLE}

echo "⏳ VPC スタック完了待ち..."
aws cloudformation wait stack-create-complete \
  --stack-name ${ENV}-${PROJECT}-vpc \
  --region $REGION

# VPC Output 取得
VPC_ID=$(stack_output "${ENV}-${PROJECT}-vpc" VpcId)
VPC_CIDR=$(stack_output "${ENV}-${PROJECT}-vpc" VpcCidrBlock)
PUB1_ID=$(stack_output "${ENV}-${PROJECT}-vpc" SubnetPublic1)
PUB2_ID=$(stack_output "${ENV}-${PROJECT}-vpc" SubnetPublic2)
PRV1_ID=$(stack_output "${ENV}-${PROJECT}-vpc" SubnetPrivate1)
PRV2_ID=$(stack_output "${ENV}-${PROJECT}-vpc" SubnetPrivate2)

echo "▶️ 2. IGW/NAT スタック作成"
aws cloudformation deploy \
  --template-file ${TEMPLATE_DIR}/igw_nat.yml \
  --stack-name ${ENV}-${PROJECT}-igw-nat \
  --parameter-overrides \
    Environment=$ENV \
    ProjectName=$PROJECT \
    VpcId=$VPC_ID \
    SubnetPublic1Id=$PUB1_ID \
  --region $REGION \
  --role-arn ${CF_EXEC_ROLE}

echo "⏳ IGW/NAT スタック完了待ち..."
aws cloudformation wait stack-create-complete \
  --stack-name ${ENV}-${PROJECT}-igw-nat \
  --region $REGION

# IGW/NAT Output 取得
IGW_ID=$(stack_output "${ENV}-${PROJECT}-igw-nat" InternetGatewayId)
NAT_ID=$(stack_output "${ENV}-${PROJECT}-igw-nat" NatGatewayId)

echo "▶️ 3. Route Table スタック作成"
aws cloudformation deploy \
  --template-file ${TEMPLATE_DIR}/route_tables.yml \
  --stack-name ${ENV}-${PROJECT}-routes \
  --parameter-overrides \
    Environment=$ENV \
    ProjectName=$PROJECT \
    VpcId=$VPC_ID \
    InternetGatewayId=$IGW_ID \
    NatGatewayId=$NAT_ID \
    SubnetPublic1Id=$PUB1_ID \
    SubnetPublic2Id=$PUB2_ID \
    SubnetPrivate1Id=$PRV1_ID \
    SubnetPrivate2Id=$PRV2_ID \
  --region $REGION \
  --role-arn ${CF_EXEC_ROLE}

echo "▶️ 4. Security Group スタック作成"
aws cloudformation deploy \
  --template-file ${TEMPLATE_DIR}/sg.yml \
  --stack-name ${ENV}-${PROJECT}-sg \
  --parameter-overrides \
    Environment=$ENV \
    ProjectName=$PROJECT \
    VpcId=$VPC_ID \
    VpcCidrBlock=$VPC_CIDR \
  --region $REGION \
  --role-arn ${CF_EXEC_ROLE}

echo "✅ ネットワーク関連のスタック作成が完了しました"

echo "▶️ 5. VPC Endpoint スタック作成"
