package com.soel.backend.backend.model.api

data class Store(
    val storeId: String,
    val userId: String,
    val brandId: String? = null,
    val name: String,
    val googleAccountId: String? = null,
    val googleLocationId: String? = null,
    val googleLinkedAt: String? = null,
    val createdAt: String
)

data class StoreResponse(
    val storeId: String,
    val userId: String,
    val brandId: String? = null,
    val name: String,
    val googleAccountId: String? = null,
    val googleLocationId: String? = null,
    val googleLinkedAt: String? = null,
    val createdAt: String
)

data class StoreListResponse(
    val stores: List<StoreResponse>
)