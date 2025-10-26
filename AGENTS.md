# Repository Guidelines

## プロジェクト構成とモジュール配置
本リポジトリは Vite/React フロントエンドと Spring Boot + Kotlin バックエンドで構成されています。

UI ソースは `frontend/src`、共通型定義は `frontend/src/types`、ビルド成果物は `frontend/dist` に生成されます。

バックエンドの Kotlin コードは `backend/src/main/kotlin`、設定ファイルは `backend/src/main/resources`、テストは `backend/src/test/kotlin` に配置されています。

補助的な IaC・運用資材は `infra/`、`gitops/`、`terraform/`、初期 SQL は `database/` にまとまっています。

## ビルド・テスト・開発コマンド
初期セットアップではルートで `.env.template` を `.env` にコピーし、`backend/.env.template` も同様に複製して値を取得してください。

DB は `make dockerComposeUp` で Postgres とボリュームを起動します。

統合動作は `make start` でフロントのビルドと静的ファイル同期、`local-integration` プロファイルでの API 起動まで自動化されています。

単独開発時は `cd frontend && npm run dev`（Vite）、`cd backend && ./gradlew bootRun`（API）の利用が推奨です。

成果物を固める際は `cd backend && ./gradlew build` を使用してください。

## コーディングスタイルと命名規則
フロントエンドは ESLint の TypeScript/React 推奨設定に従い、2 スペースインデント、変数は camelCase、コンポーネントは PascalCase、スタイルやテストはコンポーネント付近に配置します。

バックエンドは Spring Kotlin の慣習に沿い、クラスは PascalCase、関数・プロパティは camelCase、Flyway マイグレーションは `backend/src/main/resources/db/migration` で `VYYYYMMDDHHMM__description.sql` のスネークケースを守ってください。

コミット前に `npm run lint` と Gradle の警告を確認しましょう。

## テスト方針
バックエンドは JUnit 5 と MockK を使用します。

`cd backend && ./gradlew test` で実行し、テストは本番コードと同じパッケージ構造を維持してください。

フロントエンドは Vitest と Testing Library を使い、`*.test.tsx` 形式でコンポーネント横に配置し、`cd frontend && npm run test` でカバレッジを確認します。

新規ロジックには分岐ごとのテストを追加し、ビジネス意図をテスト名に反映させてください。

## コミットとプルリクエストのガイドライン
コミットメッセージは Git 履歴に倣い、簡潔な英語もしくは日本語（例:`施設検索APIを高速化`）で現在形を基本とします。

共有ブランチへ push する前に `WIP` を解消し、必要に応じて squash/ amend を使って履歴を整えます。

プルリクエストでは関連 Issue のリンク、変更範囲、想定影響、必要な手動手順（例: DB マイグレーション、UI スクリーンショット）を明記し、ローカルで lint/テストが通過していることを確認してください。

## 設定とシークレット管理
`.env` および `backend/.env` はテンプレートから作成し、値は管理者から安全に受け取ります。

秘匿情報は Git に含めず、AWS プロファイルなどの認証情報はローカル環境で保持してください。

`build-docker` は ECR への push を含むため、AWS CLI の認証状態を確認してから実行します。

## エージェント対応ポリシー
このプロダクト内で Codex エージェントがコミュニケーションする際は、レビュアーや開発者との整合性を保つため必ず日本語で対応してください。

チームとの合意事項や用語は日本語表記を優先し、疑義がある場合は日本語で確認を取ってから作業を進めましょう。
