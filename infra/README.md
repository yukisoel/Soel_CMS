# インフラデプロイ手順

## 事前準備
### 作業用アカウント
- aws-cli を使用できる環境
  - 適切なcredentialなどが設定されていること
  - Admin権限で動作を確認済

※要各自設定

~/.aws/config に設定
```
[profile infra-sso]
sso_session = my-session
sso_account_id = 211125631266
sso_role_name = InfraAccess
region = ap-northeast-1
output = json
```

デフォルトで使用するプロファイルを設定
```
export AWS_PROFILE=infra-sso
```

sso login
```
aws sso login --profile infra-sso
```

現在の権限確認
```
aws sts get-caller-identity
```

### 環境変数の設定
※ 詳細は infra/env/README.md を参照

- infra/env/{ENV}.env を埋める
- infra/env/{ENV}.secret.env を作成する

### ROUTE53まわり
- ホストゾーンがすでに存在すること
- ACM が各 FQDN について作成済であること
  - ない場合は下記手順で作成する
```bash
cd infra
./script/request-acm-test-cert.sh [dev|prd]
```

※ 2025/10/13 現在下記の証明書が作成済
- cmssoel.click
- dev.cmssoel.click
- prd.cmssoel.click

*.cmssoel.click についてはまとめた方がsand環境作成時などが楽かもしれない

### 環境周り
- deploy用のバケットがあること
  - cmssoel-deploy-bucket を想定
- ない場合は下記で作成する
  - aws s3 mb s3://cmssoel-deploy-artifacts --region ap-northeast-1

※ 2025/05/21 現在作成済。 バケット名は env/ のファイルにも影響する

## インフラ作成スクリプトの実行
```bash
cd infra
./script/deploy-all.sh [dev|prd]
```

## インフラ削除手順
※ ECR内のイメージなどもすべて削除するため、注意する
※ シークレットとCognitoユーザープールは、スクリプト実行後、残すかどうかを選択できるようになっている
```bash
cd infra
./script/cleanup.sh [dev|prd]
```

# アプリデプロイ手順
```bash
cd infra
./script/900-deploy-app.sh [dev|prd] [タグ名]
# e.g. ./script/900-deploy-app.sh dev dev-v1.0.0
# タグ名は省略可能。その場合は "init" が使用される
```

