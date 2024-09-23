package com.soel.backend.backend.model

data class GoogleMe(
    val names: List<GoogleName>,
)

data class GoogleName(
    val displayName: String,
    val familyName: String?,
    val givenName: String?,
)

data class GoogleAccountList(
    val accountList: List<GoogleAccount>
)

data class GoogleAccount (
    val name: String,
    val accountName: String
)

data class GoogleLocationItem (
    val name: String,
    val title: String
)
