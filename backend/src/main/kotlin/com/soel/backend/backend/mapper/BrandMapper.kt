package com.soel.backend.backend.mapper

import com.soel.backend.backend.entity.BrandEntity
import com.soel.backend.backend.entity.StoreEntity
import com.soel.backend.backend.model.api.Brand
import com.soel.backend.backend.model.api.BrandResponse
import com.soel.backend.backend.model.api.BrandWithStoresResponse
import com.soel.backend.backend.model.api.StoreResponse

object BrandMapper {

    fun entityToDomain(e: BrandEntity): Brand =
        Brand(
            brandId = e.brandId.toString(),
            userId = e.userId.toString(),
            name = e.name,
            createdAt = e.createdAt.toString()
        )

    fun entityToResponse(e: BrandEntity): BrandResponse =
        BrandResponse(
            brandId = e.brandId.toString(),
            userId = e.userId.toString(),
            name = e.name,
            createdAt = e.createdAt.toString()
        )

    fun entityAndStoresToResponse(
        e: BrandEntity,
        stores: List<StoreEntity>
    ): BrandWithStoresResponse =
        BrandWithStoresResponse(
            brandId = e.brandId.toString(),
            userId = e.userId.toString(),
            name = e.name,
            createdAt = e.createdAt.toString(),
            stores = StoreMapper.entitiesToResponses(stores)
        )

    fun domainToResponse(b: Brand): BrandResponse =
        BrandResponse(
            brandId = b.brandId,
            userId = b.userId,
            name = b.name,
            createdAt = b.createdAt
        )
}