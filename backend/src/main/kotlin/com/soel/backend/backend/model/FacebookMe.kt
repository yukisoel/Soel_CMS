package com.soel.backend.backend.model

data class FacebookMe(
    val id: String?,
    val name: String?,
    val email: String?
)

data class FacebookMeAccounts(
    val data: List<FacebookMeAccount>?
)

data class FacebookMeAccount(
    val id: String?,
    val name: String?,
    val category: String?
)
