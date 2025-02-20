-- レコード数がゼロの場合にデータを挿入
DO $$
BEGIN
    IF (SELECT COUNT(*) FROM menu_logs) = 0 THEN
        INSERT INTO menu_logs (userName, locationId, menu)
        VALUES ('admin', 'location1', '{"item": "pizza", "size": "large"}');
END IF;
END $$;