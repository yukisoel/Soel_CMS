package com.soel.backend.backend.model

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
//    val storefrontAddress: GoogleLocationPostalAddress,
    val websiteUri: String? = null,
//    val regularHours: GoogleLocationVusinessHours,
    val profile: GoogleLocationProfile? = null,
    val openInfo: GoogleLocationOpenInfo? = null,
    val serviceArea: GoogleLocationServiceArea? = null,
)

data class GoogleLocationPhoneNumbers(
    val primaryPhone: String? = null,
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
    val administrativeArea: String? = null,
    val addressLines: List<String>? = null,
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
    val category: String? = null,
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



