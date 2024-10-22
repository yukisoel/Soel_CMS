package com.soel.backend.backend.model

data class GoogleMe(
    val names: List<GoogleName>,
)

data class GoogleName(
    val displayName: String,
    val familyName: String?,
    val givenName: String?,
)

data class GoogleAccountsResponse(
    val accounts: List<GoogleAccount>,
)

data class GoogleLocationsResponse(
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
    val name: String,
    val title: String,
    val phoneNumbers: GoogleLocationPhoneNumbers,
    val categories: GoogleLocationCategories,
    val storefrontAddress: GoogleLocationPostalAddress,
    val websiteUri: String,
    val regularHours: GoogleLocationVusinessHours,
    val profile: GoogleLocationProfile,
)

data class GoogleLocationPhoneNumbers(
    val primaryPhone: String,
)

data class GoogleLocationCategories(
    val primaryCategory: GoogleLocationCategory,
    val additionalCategories: List<GoogleLocationCategory>,
)

data class GoogleLocationCategory(
    val name: String,
    val displayName: String,
)

data class GoogleLocationPostalAddress(
    val postalCode: String,
    val administrativeArea: String,
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
    val hours: Int?,
    val minutes: Int?,
    val seconds: Int?,
    val nanos: Int?,
)

data class GoogleLocationProfile(
    val description: String,
)
