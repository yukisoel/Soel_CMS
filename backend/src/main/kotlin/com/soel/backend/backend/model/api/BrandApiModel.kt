package com.soel.backend.backend.model.api

data class Brand(
    val brandId: String,
    val userId: String,
    val name: String,
    val createdAt: String
)

data class BrandResponse(
    val brandId: String,
    val userId: String,
    val name: String,
    val createdAt: String
)

data class BrandListResponse(
    val brands: List<BrandResponse>
)

data class BrandWithStoresResponse(
    val brandId: String,
    val userId: String,
    val name: String,
    val createdAt: String,
    val stores: List<StoreResponse>,
    val storesCount: Int = stores.size
)

data class BrandWithStoresListResponse(
    val brands: List<BrandWithStoresResponse>
)