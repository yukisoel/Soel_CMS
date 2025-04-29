package com.soel.backend.backend.model

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonValue

//Google Business Profile APIのレスポンスモデル
data class GoogleMe(
    val names: List<GoogleName>,
)

data class GoogleName(
    val displayName: String,
    val familyName: String? = null,
    val givenName: String? = null,
)

data class GoogleAccountsResponse(
    val accounts: List<GoogleAccount>,
)

data class GoogleLocationsResponse(
    val nextPageToken: String? = null,
    val locations: List<GoogleLocation>,
)

data class GoogleAccount (
    val name: String,
    val accountName: String
)

data class GoogleCategoriesResponse(
    val categories: List<GoogleLocationCategory>,
    val nextPageToken: String? = null,
)

data class GoogleLocation (
    val name: String,
    val title: String
)

data class GoogleLocationAttributesModel(
    val name: String? = null,
    val attributes: List<GoogleLocationAttribute>? = null,
)

data class GoogleLocationAttributeSnsLinkRequest(
    val snsType: GoogleAttributeSnsType,
    val snsUrl: String
)

data class GoogleLocationAttribute(
    val name: String? = null,
    val valueType: GoogleLocationAttributeValueType? = null,
    val uriValues: List<GoogleLocationAttributeUriValue>? = null,
)

data class GoogleLocationAttributeUriValue(
    val uri: String? = null,
)

data class GoogleLocationProfileModel(
    val name: String? = null,
    val title: String? = null,
    val phoneNumbers: GoogleLocationPhoneNumbers? = null,
    val categories: GoogleLocationCategories? = null,
    val storefrontAddress: GoogleLocationPostalAddress? = null,
    val websiteUri: String? = null,
//    val regularHours: GoogleLocationVusinessHours,
    val profile: GoogleLocationProfile? = null,
    val openInfo: GoogleLocationOpenInfo? = null,
    val serviceArea: GoogleLocationServiceArea? = null,
)

data class GoogleLocationPhoneNumbers(
    val primaryPhone: String? = null,
    val additionalPhones: List<String>? = null,
)

data class GoogleLocationCategories(
    val primaryCategory: GoogleLocationCategory? = null,
    val additionalCategories: List<GoogleLocationCategory>? = null,
)

data class GoogleLocationCategory(
    val name: String? = null,
    val displayName: String? = null,
)

data class GoogleLocationPostalAddress(
    val postalCode: String? = null,
    val regionCode: String? = null,
    val administrativeArea: String? = null,
    val addressLines: List<String>? = null,
)

data class GoogleLocationStoreFrontAddressRequest(
    val postalCode: String,
    val administrativeArea: Prefecture,
    val addressLines: List<String>,
)

data class GoogleLocationVusinessHours(
    val periods: List<GoogleLocationTimePeriod>,
)

data class GoogleLocationTimePeriod(
    val openDay: String,
    val openTime: GoogleLocationTimeOfDay,
    val closeDay: String,
    val closeTime: GoogleLocationTimeOfDay,
)

data class GoogleLocationTimeOfDay(
    val hours: Int? = null,
    val minutes: Int? = null,
    val seconds: Int? = null,
    val nanos: Int? = null,
)

data class GoogleLocationProfile(
    val description: String? = null,
)

data class GoogleLocationOpenInfo(
    val status: String? = null,
    val canReopen: Boolean? = null,
    val openingDate: GoogleLocationDate? = null,
)

data class GoogleLocationServiceArea(
    val businessType: String? = null,
    val regionCode: String? = null,
    val places: GoogleLocationPlaceInfos? = null,
)

data class GoogleLocationPlaceInfos(
    val placeInfos: List<GoogleLocationPlaceInfo>? = null,
)

data class GoogleLocationPlaceInfo(
    val placeName: String? = null,
    val placeId: String? = null,
)

data class GoogleLocationDate(
    val year: Int? = null,
    val month: Int? = null,
    val day: Int? = null,
)

data class GoogleLocationPhotosResponse(
    val nextPageToken: String? = null,
    val mediaItems: List<GoogleLocationPhotoModel>,
)

data class GoogleLocationLocalPostsResponse(
    val nextPageToken: String? = null,
    val localPosts: List<GoogleLocationLocalPostModel>,
)

data class GoogleLocationFoodMenusResponse(
    val nextPageToken: String? = null,
    val foodMenus: List<GoogleLocationFoodMenusModel>,
)

data class GoogleLocationPhotoModel(
    val name: String? = null,
    val mediaFormat: String? = null,
    val googleUrl: String? = null,
    val thumbnailUrl: String? = null,
    val createTime: String? = null,
    val locationAssociation: GoogleLocationAssociation? = null,
    val dataRef: GoogleLocationPhotoDataRef? = null,
    val sourceUrl: String? = null,
)

data class GoogleLocationPhotoDataRef(
    val resourceName: String? = null,
)

data class GoogleLocationAssociation(
    val category: GoogleLocationAssociationCategory? = null,
)

data class GoogleLocationLocalPostModel(
    val name: String? = null,
    val languageCode: String? = null,
    val summary: String? = null,
    val callToAction: GoogleLocationCallToAction? = null,
    val createTime: String? = null,
    val updateTime: String? = null,
    val event: GoogleLocationEvent? = null,
    val state: String? = null,
    val media: List<GoogleLocationPhotoModel>? = null,
    val searchUrl: String? = null,
    val topicType: String? = null,
    val alertType: String? = null,
    val offer: GoogleLocationOffer? = null,
)

data class GoogleLocationCallToAction(
    val actionType: String? = null,
    val url: String? = null,
)

data class GoogleLocationEvent(
    val title: String? = null,
    val schedule: GoogleLocationTimeInterval? = null,
)

data class GoogleLocationTimeInterval(
    val startDate: GoogleLocationDate? = null,
    val endDate: GoogleLocationDate? = null,
    val startTime: GoogleLocationTimeOfDay? = null,
    val endTime: GoogleLocationTimeOfDay? = null,
)

data class GoogleLocationOffer(
    val couponCode: String? = null,
    val redeemOnlineUrl: String? = null,
    val termsConditions: String? = null,
)

data class GoogleLocationFoodMenusModel(
    val name: String? = null,
    val menus: List<GoogleLocationFoodMenu>? = null,
)

data class GoogleLocationFoodMenu(
    val labels: List<GoogleLocationMenuLabel>? = null,
    val sourceUrl: String? = null,
    val sections: List<GoogleLocationFoodMenuSection>? = null,
    val cuisines: List<String>? = null,
)

data class GoogleLocationMenuLabel(
    val displayName: String? = null,
    val description: String? = null,
    val languageCode: String? = null,
)

data class GoogleLocationFoodMenuSection(
    val labels: List<GoogleLocationMenuLabel>? = null,
    val items: List<GoogleLocationFoodMenuItem>? = null,
)

data class GoogleLocationFoodMenuItem(
    val labels: List<GoogleLocationMenuLabel>? = null,
    val attributes: GoogleLocationFoodMenuItemAttributes? = null,
    val options: List<GoogleLocationFoodMenuItemOption>? = null,
)

data class GoogleLocationFoodMenuItemOption(
    val labels: List<GoogleLocationMenuLabel>? = null,
    val attributes: GoogleLocationFoodMenuItemAttributes? = null,
)

data class GoogleLocationFoodMenuItemAttributes(
    val price: GoogleLocationMoney? = null,
    val spiciness: String? = null,
    val allergen: List<String>? = null,
    val dietaryRestriction: List<String>? = null,
    val nutritionFacts: GoogleLocationNutritionFacts? = null,
    val ingredients: List<GoogleLocationIngredient>? = null,
    val servesNumPeople: Int? = null,
    val preparationMethods: List<String>? = null,
    val portionSize: GoogleLocationPortionSize? = null,
    val mediaKeys: List<String>? = null,
)

data class GoogleLocationMoney(
    val currencyCode: String? = null,
    val units: String? = null,
    val nanos: Int? = null,
)

data class GoogleLocationNutritionFacts(
    val calories: GoogleLocationCaloriesFact? = null,
    val totalFat: GoogleLocationNutritionFact? = null,
    val cholesterol: GoogleLocationNutritionFact? = null,
    val sodium: GoogleLocationNutritionFact? = null,
    val totalCarbohydrates: GoogleLocationNutritionFact? = null,
    val protein: GoogleLocationNutritionFact? = null,
)

data class GoogleLocationCaloriesFact(
    val lowerAmount: Int? = null,
    val upperAmount: Int? = null,
    val unit: String? = null,
)

data class GoogleLocationNutritionFact(
    val lowerAmount: Int? = null,
    val upperAmount: Int? = null,
    val unit: String? = null,
)

data class GoogleLocationIngredient(
    val labels: List<GoogleLocationMenuLabel>? = null,
)

data class GoogleLocationPortionSize(
    val quantity: Int? = null,
    val unit: List<GoogleLocationMenuLabel>? = null,
)

data class GoogleLocationQuestionsResponse(
    val pageSize: Int? = null,
    val questions: List<GoogleLocationQuestion>? = null,
    val nextPageToken: String? = null,
)

data class GoogleLocationAnswersResponse(
    val pageSize: Int? = null,
    val answers: List<GoogleLocationAnswer>? = null,
    val nextPageToken: String? = null,
)

data class GoogleLocationQuestion(
    val name: String? = null,
    val text: String? = null,
    val createTime: String? = null,
    val updateTime: String? = null,
    val upvoteCount: Int? = null,
    val totalAnswerCount: Int? = null,
    val author: GoogleLocationAuthor? = null,
    val topAnswers: List<GoogleLocationAnswer>? = null,
)

data class GoogleLocationAnswerUpsert(
    val answer: GoogleLocationAnswer,
)

data class GoogleLocationAnswer(
    val name: String? = null,
    val text: String? = null,
    val createTime: String? = null,
    val updateTime: String? = null,
    val upvoteCount: Int? = null,
    val author: GoogleLocationAuthor? = null,
)

data class GoogleLocationAuthor(
    val name: String? = null,
    val profilePhotoUrl: String? = null,
    val type: GoogleLocationAuthorType? = null,
)

enum class GoogleLocationAttributeValueType {
    ATTRIBUTE_VALUE_TYPE_UNSPECIFIED,
    URL,
    BOOL,
    ENUM,
    REPEATED_ENUM,
}

enum class GoogleLocationAuthorType {
    AUTHOR_TYPE_UNSPECIFIED,
    REGULAR_USER,
    LOCAL_GUIDE,
    MERCHANT,
}

enum class GoogleLocationAssociationCategory {
    COVER,
    PROFILE,
    LOGO,
    EXTERIOR,
    INTERIOR,
    PRODUCT,
    AT_WORK,
    FOOD_AND_DRINK,
    MENU,
    ROOMS,
    TEAMS,
    ADDITIONAL,
    CATEGORY_UNSPECIFIED,
}

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


//backend用
enum class GoogleAttributeSnsType(
    val snsType: String,
    val attributeName: String
) {
    TWITTER("twitter", "attributes/url_twitter"),
    TIKTOK("tiktok", "attributes/url_tiktok"),
    YOUTUBE("youtube", "attributes/url_youtube"),
    INSTAGRAM("instagram", "attributes/url_instagram"),
    FACEBOOK("facebook", "attributes/url_facebook"),
    LINKEDIN("linkedin", "attributes/url_linkedin"),
    PINTEREST("pinterest", "attributes/url_pinterest");

    companion object {
        private val snsTypeMap: Map<String, GoogleAttributeSnsType> = entries.associateBy { it.snsType }

        private fun fromSnsType(type: String): GoogleAttributeSnsType? {
            return snsTypeMap[type]
        }

        fun fromSnsTypeOrThrow(type: String): GoogleAttributeSnsType {
            return fromSnsType(type)
                ?: throw IllegalArgumentException("Unknown snsType: $type")
        }
    }
}



