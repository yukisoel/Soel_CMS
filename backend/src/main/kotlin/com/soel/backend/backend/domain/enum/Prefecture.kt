package com.soel.backend.backend.domain.enum

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonValue

enum class Prefecture(
    /** このプロパティの値（日本語名）をシリアライズ／デシリアライズの文字列に使う */
    @get:JsonValue val japaneseName: String
) {


    HOKKAIDO("北海道"),
    AOMORI("青森県"),
    IWATE("岩手県"),
    MIYAGI("宮城県"),
    AKITA("秋田県"),
    YAMAGATA("山形県"),
    FUKUSHIMA("福島県"),
    IBARAKI("茨城県"),
    TOCHIGI("栃木県"),
    GUNMA("群馬県"),
    SAITAMA("埼玉県"),
    CHIBA("千葉県"),
    TOKYO("東京都"),
    KANAGAWA("神奈川県"),
    NIIGATA("新潟県"),
    TOYAMA("富山県"),
    ISHIKAWA("石川県"),
    FUKUI("福井県"),
    YAMANASHI("山梨県"),
    NAGANO("長野県"),
    GIFU("岐阜県"),
    SHIZUOKA("静岡県"),
    AICHI("愛知県"),
    MIE("三重県"),
    SHIGA("滋賀県"),
    KYOTO("京都府"),
    OSAKA("大阪府"),
    HYOGO("兵庫県"),
    NARA("奈良県"),
    WAKAYAMA("和歌山県"),
    TOTTORI("鳥取県"),
    SHIMANE("島根県"),
    OKAYAMA("岡山県"),
    HIROSHIMA("広島県"),
    YAMAGUCHI("山口県"),
    TOKUSHIMA("徳島県"),
    KAGAWA("香川県"),
    EHIME("愛媛県"),
    KOCHI("高知県"),
    FUKUOKA("福岡県"),
    SAGA("佐賀県"),
    NAGASAKI("長崎県"),
    KUMAMOTO("熊本県"),
    OITA("大分県"),
    MIYAZAKI("宮崎県"),
    KAGOSHIMA("鹿児島県"),
    OKINAWA("沖縄県");

    override fun toString(): String = japaneseName

    companion object {
        /**
         * JSON の文字列 → Prefecture 変換用ファクトリ。
         * "愛知県" や "AICHI" のどちらでもマッチするようにしています。
         */
        @JvmStatic
        @JsonCreator
        fun fromValue(value: String): Prefecture =
            entries.firstOrNull {
                it.japaneseName == value || it.name.equals(value, ignoreCase = true)
            } ?: throw IllegalArgumentException("Unknown Prefecture: $value")
    }
}