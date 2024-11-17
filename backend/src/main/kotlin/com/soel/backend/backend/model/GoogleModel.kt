package com.soel.backend.backend.model

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

data class GoogleLocation (
    val name: String,
    val title: String
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
    val openingDate: GoogleLocationOpeningDate? = null,
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

data class GoogleLocationOpeningDate(
    val year: String? = null,
    val month: String? = null,
    val day: String? = null,
)

data class GoogleLocationPhotosResponse(
    val nextPageToken: String? = null,
    val mediaItems: List<GoogleLocationPhotoModel>,
)

data class GoogleLocationPhotoModel(
    val name: String? = null,
    val googleUrl: String? = null,
    val thumbnailUrl: String? = null,
    val createTime: String? = null,
    val locationAssociation: GoogleLocationAssociation? = null,
)

data class GoogleLocationAssociation(
    val category: String? = null,
)
