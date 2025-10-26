package com.soel.backend.backend.model.api

import com.soel.backend.backend.domain.enum.Prefecture

data class Store(
    val storeId: String,
    val name: String,
    val userId: String,
    val brandId: String? = null,
    val brandName: String? = null,
    val googleAccountId: String? = null,
    val googleLocationId: String? = null,
    val googleLinkedAt: String? = null,
    val createdAt: String,
    val prefecture: Prefecture? = null
)

data class StoreResponse(
    val storeId: String,
    val name: String,
    val userId: String,
    val brandId: String? = null,
    val brandName: String? = null,
    val googleAccountId: String? = null,
    val googleLocationId: String? = null,
    val googleLinkedAt: String? = null,
    val createdAt: String,
    val prefectureName: String? = null,
    val prefectureJapaneseName: String? = null
)

data class StoreListResponse(
    val stores: List<StoreResponse>
)

data class PrefectureWithBrandListWithStoreListResponse(
    val prefectureName: String?,
    val prefectureJapaneseName: String?,
    val brands: List<BrandWithStoresResponse>
)

data class PrefectureListWithBrandListWithStoreListResponse(
    val prefectures: List<PrefectureWithBrandListWithStoreListResponse>
)
