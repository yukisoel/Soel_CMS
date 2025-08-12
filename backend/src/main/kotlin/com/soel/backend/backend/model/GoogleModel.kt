package com.soel.backend.backend.model

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonValue
import com.fasterxml.jackson.databind.JsonNode
import com.soel.backend.backend.domain.enum.Prefecture

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

data class GoogleLocationAvailableAttributesResponse(
    val attributeMetadata: List<GoogleAttributeMetadata>? = null,
    val nextPageToken: String? = null,
)

data class GoogleAttributeMetadata(
    val parent: String? = null,
    val displayName: String? = null,
    val groupDisplayName: String? = null,
    val repeatable: Boolean? = null,
    val deprecated: Boolean? = null,
    val valueType: GoogleLocationAttributeValueType? = null,
    val valueMetadata: List<GoogleAttributeValueMetadata>? = null,
)

data class GoogleAttributeValueMetadata(
    val displayName: String? = null,
    val values: List<JsonNode>? = null,
)

data class GoogleLocationAttributesModel(
    val name: String? = null,
    val attributes: List<GoogleLocationAttribute?>? = null,
)

data class GoogleLocationAttributeService(
    val type: BoolAttributeServiceType,
    val value: Boolean? = null
)

data class GoogleLocationAttributeServiceOption(
    val type: BoolAttributeServiceOptionType,
    val value: Boolean? = null,
)

data class GoogleLocationAttributeSnsLinkRequest(
    val snsType: GoogleAttributeSnsType,
    val snsUrl: String
)

data class GoogleLocationAttribute(
    val name: String? = null,
    val valueType: GoogleLocationAttributeValueType? = null,
    val uriValues: List<GoogleLocationAttributeUriValue>? = null,
    val values: List<JsonNode>? = null,
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
    val regularHours: GoogleLocationBusinessHours? = null,
    val moreHours: List<GoogleLocationMoreHours>? = null,
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

data class GoogleLocationBusinessHours(
    val periods: List<GoogleLocationTimePeriod>,
)

data class GoogleLocationTimePeriod(
    val openDay: DayOfWeek,
    val openTime: GoogleLocationTimeOfDay,
    val closeDay: DayOfWeek,
    val closeTime: GoogleLocationTimeOfDay,
)

data class GoogleLocationTimeOfDay(
    val hours: Int? = null,
    val minutes: Int? = null,
    val seconds: Int? = null,
    val nanos: Int? = null,
)

data class GoogleLocationMoreHours(
    val hoursTypeId: String? = null,
    val periods: List<GoogleLocationTimePeriod>? = null,
)

data class GoogleLocationBusinessHoursRequest(
    val hoursTypeId: BusinessHoursType,
    val periods: List<GoogleLocationTimePeriod>
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

data class GoogleLocationLocalPostRequest(
    val summary: String,
    val callToAction: GoogleLocationCallToAction? = null,
    val event: GoogleLocationEvent? = null,
    val topicType: String? = null,
    val alertType: String,
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

data class GoogleApiLocationReviewsResponse(
    val nextPageToken: String? = null,
    val reviews: List<GoogleLocationReview>? = null,
    val totalReviewCount: Int? = null,
    val averageRating: Double? = null,
)

data class GoogleLocationReview(
    val name: String? = null,
    val reviewId: String? = null,
    val comment: String? = null,
    val starRating: StarRating? = null,
    val reviewer: GoogleLocationReviewReviewer? = null,
    val reviewReply: GoogleLocationReviewReply? = null,
    val createTime: String? = null,
    val updateTime: String? = null,
)

data class GoogleLocationReviewCustom(
    val name: String? = null,
    val reviewId: String? = null,
    val comment: String? = null,
    val starRating: StarRating? = null,
    val reviewer: GoogleLocationReviewReviewer? = null,
    val reviewReply: GoogleLocationReviewReply? = null,
    val createTime: String? = null,
    val updateTime: String? = null,
    val isReply: Boolean? = null,
)

data class GoogleLocationReviewReviewer(
    val profilePhotoUrl: String? = null,
    val displayName: String? = null,
    val isAnonymous: Boolean? = null,
)

data class GoogleLocationReviewReply(
    val comment: String? = null,
    val updateTime: String? = null,
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

enum class DayOfWeek {
    DAY_OF_WEEK_UNSPECIFIED,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY,
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

enum class StarRating {
    STAR_RATING_UNSPECIFIED,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
}

enum class BusinessHoursType(
    /** 機械向けコード（"LUNCH", "DINNER"） */
    val code: String,
    /** 表示用ラベル（"ランチ", "ディナー"） */
    @get:JsonValue val label: String
){
    REGULAR("REGULAR", "通常営業"),
    ACCESS("ACCESS", "入店可能時間"),
    KITCHEN("KITCHEN", "注文可能時間"),
    DRIVE_THROUGH("DRIVE_THROUGH", "ドライブスルー"),
    DELIVERY("DELIVERY", "宅配"),
    TAKEOUT("TAKEOUT", "テイクアウト"),
    BREAKFAST("BREAKFAST", "朝食"),
    LUNCH("LUNCH", "ランチ"),
    DINNER("DINNER", "ディナー"),
    BRUNCH("BRUNCH", "ブランチ"),
    HAPPY_HOURS("HAPPY_HOURS", "ハッピーアワー"),
    SENIOR_HOURS("SENIOR_HOURS", "高齢者限定時間帯"),
    ONLINE_SERVICE_HOURS("ONLINE_SERVICE_HOURS", "オンラインサービスの提供時間");

    companion object {
        /**
         * デシリアライズ時に呼ばれるファクトリ。
         * リクエスト JSON の値（大文字小文字区別なく "LUNCH"/"DINNER"、
         * あるいは日本語ラベル "ランチ"/"ディナー"）を受け取って
         * 対応する enum に変換します。
         */
        @JvmStatic
        @JsonCreator
        fun fromValue(value: String): BusinessHoursType =
            entries.firstOrNull {
                it.code.equals(value, ignoreCase = true) || it.label == value
            } ?: throw IllegalArgumentException("Unknown BusinessHoursType: $value")
    }
}

enum class BoolAttributeServiceType(
    val attributeName: String,
    @get:JsonValue val value: String
) {
    SERVICE_ALCOHOL("attributes/serves_alcohol", "アルコール飲料あり"),
    SERVES_ORGANIC("attributes/serves_organic", "オーガニック料理あり"),
    SERVES_COCKTAILS("attributes/serves_cocktails", "カクテルあり"),
    SERVES_COFFEE("attributes/serves_coffee", "コーヒーあり"),
    HAS_SALAD_BAR("attributes/has_salad_bar", "サラダバーあり"),
    SERVES_HAPPY_HOUR_DRINKS("attributes/serves_happy_hour_drinks", "ドリンクのハッピーアワーあり"),
    SERVES_LIQUOR("attributes/serves_liquor", "ハードリカーあり"),
    SERVES_HALAL_FOOD("attributes/serves_halal_food", "ハラルメニューあり"),
    SERVES_VEGAN("attributes/serves_vegan", "ビーガンメニューあり"),
    SERVES_BEER("attributes/serves_beer", "ビールあり"),
    SERVES_VEGETARIAN("attributes/serves_vegetarian", "ベジタリアンメニューあり"),
    SERVES_WINE("attributes/serves_wine", "ワインあり"),
    HAS_PRIVATE_DINING_ROOM("attributes/has_private_dining_room", "個室あり"),
    SERVES_SMALL_PLATES("attributes/serves_small_plates", "小皿料理を提供するお店"),
    SERVES_HAPPY_HOUR_FOOD("attributes/serves_happy_hour_food", "食べ物のハッピーアワーあり"),
    HAS_ALL_YOU_CAN_EAT_ALWAYS("attributes/has_all_you_can_eat_always", "食べ放題あり"),
    SERVES_LATE_NIGHT_FOOD("attributes/serves_late_night_food", "深夜の食事可"),
    HAS_BRAILLE_MENU("attributes/has_braille_menu", "点字メニューあり");

    companion object {
        @JvmStatic
        @JsonCreator
        fun fromValue(value: String): BoolAttributeServiceType =
            entries.firstOrNull {
                it.name.equals(value, ignoreCase = true) ||
                        it.attributeName == value ||
                        it.value == value
            } ?: throw IllegalArgumentException("Unknown BoolAttributeServiceType: $value")
    }
}

enum class BoolAttributeServiceOptionType(
    val attributeName: String,
    @get:JsonValue val value: String
) {
    HAS_SEATING_OUTDOORS("attributes/has_seating_outdoors", "テラス席あり"),
    HAS_CURBSIDE_PICKUP("attributes/has_curbside_pickup", "店先受取可"),
    HAS_NO_CONTACT_DELIVERY("attributes/has_no_contact_delivery", "非接触宅配可"),
    HAS_DELIVERY("attributes/has_delivery", "宅配可"),
    HAS_DRIVE_THROUGH("attributes/has_drive_through", "ドライブスルーあり"),
    HAS_ONSITE_SERVICES("attributes/has_onsite_services", "実店舗の営業あり"),
    HAS_TAKEOUT("attributes/has_takeout", "テイクアウト可"),
    SERVES_DINE_IN("attributes/serves_dine_in", "イートイン利用可");

    companion object {
        @JvmStatic
        @JsonCreator
        fun fromValue(value: String): BoolAttributeServiceOptionType =
            entries.firstOrNull {
                it.name.equals(value, ignoreCase = true) ||
                        it.attributeName == value ||
                        it.value == value
            } ?: throw IllegalArgumentException("Unknown BoolAttributeServiceOptionType: $value")
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



