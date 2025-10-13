# env ディレクトリ概要
infra/script 内のスクリプトを実行する前に、必要なファイルを用意する

## 必要なファイル
- [dev|prd].env
- [dev|prd].secret.env
  - secret.env.example をコピーして作成する
  - シークレットに初期設定したい値をJSON形式で指定しておく
  - 秘匿情報を含む可能性があるため、リポジトリにアップしない