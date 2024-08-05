package com.soel.backend.backend.model

data class GoogleMe(
    val names: List<GoogleName>,
)

data class GoogleName(
    val displayName: String,
    val familyName: String?,
    val givenName: String?,
)
