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

data class FacebookAdAccounts(
    val data: List<FacebookMeAccount>?
)

data class FacebookAdAccount(
    val id: String?,
    val name: String?,
    val amount_spent: String?
)

data class FacebookCampaingnDetails(
    val data: List<FacebookCampaingnDetail>?
)

data class FacebookCampaingnDetail(
    val name: String?,
    val impressions: String?,
    val spend: String?,
    val reach: String?,
    val cpm: String?
)

data class FacebookCampaingns(
    val data: List<FacebookCampaingn>?
)

data class FacebookCampaingn(
    val id: String?,
    val name: String?
)
