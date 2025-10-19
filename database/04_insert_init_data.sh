#!/usr/bin/env bash
set -e

# psql の接続情報は環境変数 POSTGRES_USER/POSTGRES_DB などを利用
psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
-- 1) users テーブルへの初期ユーザー登録
INSERT INTO users (user_id, email)
VALUES (
  '${SAMPLE_USER_ID}',
  '${SAMPLE_USER_EMAIL}'
)
ON CONFLICT (user_id) DO NOTHING;
-- 2) brands テーブルへの初期ブランド登録
INSERT INTO brands (brand_id, user_id, name)
VALUES (
  '${SAMPLE_BRAND_ID}',
  '${SAMPLE_USER_ID}',
  '${SAMPLE_BRAND_NAME}'
)
ON CONFLICT (brand_id) DO NOTHING;

-- 2-1) 追加のブランドを登録
INSERT INTO brands (user_id, name)
VALUES
  ('${SAMPLE_USER_ID}', 'カフェブランドA'),
  ('${SAMPLE_USER_ID}', 'レストランチェーンB'),
  ('${SAMPLE_USER_ID}', 'ラーメンチェーンC'),
  ('${SAMPLE_USER_ID}', 'ファストフードD'),
  ('${SAMPLE_USER_ID}', 'イタリアンE'),
  ('${SAMPLE_USER_ID}', '居酒屋チェーンF'),
  ('${SAMPLE_USER_ID}', 'スイーツショップG'),
  ('${SAMPLE_USER_ID}', 'ベーカリーH'),
  ('${SAMPLE_USER_ID}', '焼肉チェーンI'),
  ('${SAMPLE_USER_ID}', '寿司チェーンJ');
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

-- 4) 追加の100店舗を登録（各ブランドにランダムに割り当て）
DO \$\$
DECLARE
  i INTEGER;
  prefectures TEXT[] := ARRAY[
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
    '岐阜県', '静岡県', '愛知県', '三重県',
    '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
  ];
  brand_ids UUID[];
  store_name TEXT;
  prefecture TEXT;
  selected_brand_id UUID;
BEGIN
  -- 全ブランドIDを取得
  SELECT ARRAY_AGG(brand_id) INTO brand_ids FROM brands WHERE user_id = '${SAMPLE_USER_ID}';

  FOR i IN 1..100 LOOP
    store_name := 'テスト店舗 ' || i || '号店';

    -- 都道府県とブランドをランダムに設定
    IF i % 5 = 0 THEN
      -- 5店舗に1店舗は都道府県もブランドも未割り当て
      prefecture := NULL;
      selected_brand_id := NULL;
    ELSIF i % 3 = 0 THEN
      -- 3店舗に1店舗はブランドのみ未割り当て
      prefecture := prefectures[(i % array_length(prefectures, 1)) + 1];
      selected_brand_id := NULL;
    ELSE
      -- その他は都道府県もブランドも設定
      prefecture := prefectures[(i % array_length(prefectures, 1)) + 1];
      selected_brand_id := brand_ids[(i % array_length(brand_ids, 1)) + 1];
    END IF;

    INSERT INTO stores (brand_id, user_id, name, prefecture)
    VALUES (
      selected_brand_id,
      '${SAMPLE_USER_ID}',
      store_name,
      prefecture
    );
  END LOOP;
END \$\$;
EOSQL
