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
