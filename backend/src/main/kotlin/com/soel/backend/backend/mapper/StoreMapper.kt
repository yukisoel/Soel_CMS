package com.soel.backend.backend.mapper

import com.soel.backend.backend.entity.StoreEntity
import com.soel.backend.backend.model.api.Store
import com.soel.backend.backend.model.api.StoreResponse

object StoreMapper {

    fun entityToDomain(e: StoreEntity): Store =
        Store(
            storeId = e.storeId.toString(),
            userId = e.userId.toString(),
            brandId = e.brandId?.toString(),
            name = e.name,
            googleAccountId = e.googleAccountId,
            googleLocationId = e.googleLocationId,
            googleLinkedAt = e.googleLinkedAt?.toString(),
            createdAt = e.createdAt.toString()
        )

    fun entityToResponse(e: StoreEntity): StoreResponse =
        StoreResponse(
            storeId = e.storeId.toString(),
            userId = e.userId.toString(),
            brandId = e.brandId?.toString(),
            name = e.name,
            googleAccountId = e.googleAccountId,
            googleLocationId = e.googleLocationId,
            googleLinkedAt = e.googleLinkedAt?.toString(),
            createdAt = e.createdAt.toString()
        )

    fun entitiesToResponses(entities: List<StoreEntity>): List<StoreResponse> =
        entities.map { entityToResponse(it) }
}