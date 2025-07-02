#!/usr/bin/env bash
set -e

# psql の接続情報は環境変数 POSTGRES_USER/POSTGRES_DB などを利用
psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
-- 1) users テーブルへの初期ユーザー登録
INSERT INTO users (user_id, email)
VALUES (
  '${SAMPLE_USER_ID}',
  '${SAMPLE_USER_EMAIL}'
);
-- 2) brands テーブルへの初期ブランド登録
INSERT INTO brands (brand_id,user_id, name)
VALUES (
  '${SAMPLE_BRAND_ID}',
  '${SAMPLE_USER_ID}',
  '${SAMPLE_BRAND_NAME}'
);
-- 3) stores テーブルへの初期店舗登録
INSERT INTO stores (brand_id, user_id, name, google_account_id, google_location_id, prefecture)
VALUES (
  '${SAMPLE_BRAND_ID}',
  '${SAMPLE_USER_ID}',
  '${SAMPLE_STORE_NAME}',
  '${SAMPLE_GOOGLE_ACCOUNT_ID}',
  '${SAMPLE_GOOGLE_LOCATION_ID}',
  '${SAMPLE_STORE_PREFECTURE}'
);
EOSQL