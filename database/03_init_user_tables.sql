-- 1. ユーザー
CREATE TABLE IF NOT EXISTS users (
    user_id   UUID      PRIMARY KEY,            -- Cognito の sub
    email     TEXT      NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. ブランド
--    1 ユーザーは複数ブランドを持つ
CREATE TABLE IF NOT EXISTS brands (
    brand_id   UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID      NOT NULL
        REFERENCES users(user_id)
            ON DELETE CASCADE,
    name       TEXT      NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- user_id での検索を高速化するインデックス
CREATE INDEX idx_brands_user_id ON brands(user_id);

-- 3. 店舗
--    ・1 ユーザーは複数店舗を持つ
--    ・1 ブランドは複数店舗を持つ（ブランド未所属も許容）
CREATE TABLE IF NOT EXISTS stores (
    store_id    UUID      PRIMARY KEY DEFAULT gen_random_uuid(),  -- Web アプリ側生成 ID
    user_id     UUID      NOT NULL
        REFERENCES users(user_id)
            ON DELETE CASCADE,                                        -- ユーザー削除で関連店舗も消す
    brand_id    UUID      NULL
        REFERENCES brands(brand_id)
            ON DELETE SET NULL,                                       -- ブランド削除でこのカラムを NULL に
    name        TEXT      NOT NULL,
    google_account_id VARCHAR(128) NULL,   -- GBP の accountId
    google_location_id VARCHAR(128) NULL,  -- GBP の locationId
    google_linked_at      TIMESTAMPTZ NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    prefecture VARCHAR(16) NULL  -- 都道府県
);
-- 検索を速くするためのインデックス
CREATE INDEX idx_stores_user_id  ON stores(user_id);
CREATE INDEX idx_stores_brand_id ON stores(brand_id);

