# ローカルでの立ち上げ方
## フロントエンド
node: v18以降推奨
#### 初回
```bash
cd frontend
npm install
```
#### 起動
```bash
cd frontend
make start
```

## バックエンド
JDK: 21推奨
#### 初回
backendフォルダの.env.templateをコピーして.envを作成
```bash
cp backend/.env.template backend/.env
```
.envの環境変数に値を設定(知っている人から直接もらってください)

その後、以下を実行(以下を実行する前にデータベースの起動を完了してください)
```bash
cd backend
./gradlew build
```
#### 起動
```bash
cd backend
make start
```
## データベース
#### 初回
プロジェクトフォルダ直下の.env.templateをコピーして.envを作成
```bash
cp .env.template .env
```
#### 起動
```bash
make dockerComposeUp
```