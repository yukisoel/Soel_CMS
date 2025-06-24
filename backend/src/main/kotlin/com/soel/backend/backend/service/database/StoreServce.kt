package com.soel.backend.backend.service.database

import com.soel.backend.backend.entity.StoreEntity
import com.soel.backend.backend.model.api.StoreListResponse
import com.soel.backend.backend.model.api.StoreResponse
import com.soel.backend.backend.repository.database.StoreRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.util.*

interface StoreService {
    fun findStoresByUserId(userId: String): ResponseEntity<StoreListResponse>
    fun findStoresByBrandId(brandId: String): ResponseEntity<StoreListResponse>
    fun findStoreByStoreId(storeId: String): ResponseEntity<StoreResponse>

    fun createStore(userId: String, storeName: String, brandId: String?, googleAccountId: String?, googleLocationId: String?): ResponseEntity<StoreResponse>

    fun updateStoreName(storeId: String, storeName: String): ResponseEntity<StoreResponse>
    fun updateStoreBrand(storeId: String, brandId: String): ResponseEntity<StoreResponse>
    fun updateStoreGoogleAccount(storeId: String, googleAccountId: String): ResponseEntity<StoreResponse>
    fun updateStoreGoogleLocation(storeId: String, googleLocationId: String): ResponseEntity<StoreResponse>
    fun updateStoreGoogleAccountLocation(
        storeId: String,
        googleAccountId: String,
        googleLocationId: String
    ): ResponseEntity<StoreResponse>

    fun deleteStore(storeId: String): ResponseEntity<Void>
}

@Service
class StoreServiceImpl(
     private val storeRepository: StoreRepository
): StoreService {
    override fun findStoresByUserId(userId: String): ResponseEntity<StoreListResponse> {
        val uuid = UUID.fromString(userId)
        val stores = storeRepository.findByUserId(uuid) ?: emptyList()
        return ResponseEntity.ok(
            StoreListResponse(stores.map { entity ->
                StoreResponse(
                    storeId = entity.storeId.toString(),
                    userId = entity.userId.toString(),
                    brandId = entity.brandId?.toString(),
                    name = entity.name,
                    googleAccountId = entity.googleAccountId,
                    googleLocationId = entity.googleLocationId,
                    googleLinkedAt = entity.googleLinkedAt?.toString(),
                    createdAt = entity.createdAt.toString()
                )
            })
        )
    }

    override fun findStoresByBrandId(brandId: String): ResponseEntity<StoreListResponse> {
        val uuid = UUID.fromString(brandId)
        val stores = storeRepository.findByBrandId(uuid) ?: emptyList()
        return ResponseEntity.ok(
            StoreListResponse(stores.map { entity ->
                StoreResponse(
                    storeId = entity.storeId.toString(),
                    userId = entity.userId.toString(),
                    brandId = entity.brandId?.toString(),
                    name = entity.name,
                    googleAccountId = entity.googleAccountId,
                    googleLocationId = entity.googleLocationId,
                    googleLinkedAt = entity.googleLinkedAt?.toString(),
                    createdAt = entity.createdAt.toString()
                )
            })
        )
    }

    override fun findStoreByStoreId(storeId: String): ResponseEntity<StoreResponse> {
        val uuid = UUID.fromString(storeId)
        val store = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        return ResponseEntity.ok(
            StoreResponse(
                storeId = store.storeId.toString(),
                userId = store.userId.toString(),
                brandId = store.brandId?.toString(),
                name = store.name,
                googleAccountId = store.googleAccountId,
                googleLocationId = store.googleLocationId,
                googleLinkedAt = store.googleLinkedAt?.toString(),
                createdAt = store.createdAt.toString()
            )
        )
    }

    override fun createStore(userId: String, storeName: String, brandId: String?, googleAccountId: String?, googleLocationId: String?): ResponseEntity<StoreResponse> {
        val userUuid = UUID.fromString(userId)
        val brandUuid = brandId?.let { UUID.fromString(it) }

        val storeEntity = StoreEntity(userId = userUuid, name = storeName, brandId = brandUuid,
            googleAccountId = googleAccountId, googleLocationId = googleLocationId)

        val savedStore = storeRepository.save(storeEntity)

        return ResponseEntity
            .status(org.springframework.http.HttpStatus.CREATED)
            .body(
                StoreResponse(
                    storeId = savedStore.storeId.toString(),
                    userId = savedStore.userId.toString(),
                    brandId = savedStore.brandId?.toString(),
                    name = savedStore.name,
                    googleAccountId = savedStore.googleAccountId,
                    googleLocationId = savedStore.googleLocationId,
                    googleLinkedAt = savedStore.googleLinkedAt?.toString(),
                    createdAt = savedStore.createdAt.toString()
                )
            )
    }

    override fun updateStoreName(storeId: String, storeName: String): ResponseEntity<StoreResponse> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        existingStore.name = storeName

        val updatedStore = storeRepository.save(existingStore)

        return ResponseEntity.ok(
            StoreResponse(
                storeId = updatedStore.storeId.toString(),
                userId = updatedStore.userId.toString(),
                brandId = updatedStore.brandId?.toString(),
                name = updatedStore.name,
                googleAccountId = updatedStore.googleAccountId,
                googleLocationId = updatedStore.googleLocationId,
                googleLinkedAt = updatedStore.googleLinkedAt?.toString(),
                createdAt = updatedStore.createdAt.toString()
            )
        )
    }

    override fun updateStoreBrand(storeId: String, brandId: String): ResponseEntity<StoreResponse> {
        val storeUuid = UUID.fromString(storeId)
        val brandUuid = UUID.fromString(brandId)

        val existingStore = storeRepository.findByStoreId(storeUuid)
            ?: return ResponseEntity.notFound().build()

        existingStore.brandId = brandUuid

        val updatedStore = storeRepository.save(existingStore)

        return ResponseEntity.ok(
            StoreResponse(
                storeId = updatedStore.storeId.toString(),
                userId = updatedStore.userId.toString(),
                brandId = updatedStore.brandId?.toString(),
                name = updatedStore.name,
                googleAccountId = updatedStore.googleAccountId,
                googleLocationId = updatedStore.googleLocationId,
                googleLinkedAt = updatedStore.googleLinkedAt?.toString(),
                createdAt = updatedStore.createdAt.toString()
            )
        )
    }

    override fun updateStoreGoogleAccount(storeId: String, googleAccountId: String): ResponseEntity<StoreResponse> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        existingStore.googleAccountId = googleAccountId

        val updatedStore = storeRepository.save(existingStore)

        return ResponseEntity.ok(
            StoreResponse(
                storeId = updatedStore.storeId.toString(),
                userId = updatedStore.userId.toString(),
                brandId = updatedStore.brandId?.toString(),
                name = updatedStore.name,
                googleAccountId = updatedStore.googleAccountId,
                googleLocationId = updatedStore.googleLocationId,
                googleLinkedAt = updatedStore.googleLinkedAt?.toString(),
                createdAt = updatedStore.createdAt.toString()
            )
        )
    }

    override fun updateStoreGoogleLocation(storeId: String, googleLocationId: String): ResponseEntity<StoreResponse> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        existingStore.googleLocationId = googleLocationId

        val updatedStore = storeRepository.save(existingStore)

        return ResponseEntity.ok(
            StoreResponse(
                storeId = updatedStore.storeId.toString(),
                userId = updatedStore.userId.toString(),
                brandId = updatedStore.brandId?.toString(),
                name = updatedStore.name,
                googleAccountId = updatedStore.googleAccountId,
                googleLocationId = updatedStore.googleLocationId,
                googleLinkedAt = updatedStore.googleLinkedAt?.toString(),
                createdAt = updatedStore.createdAt.toString()
            )
        )
    }

    override fun updateStoreGoogleAccountLocation(
        storeId: String,
        googleAccountId: String,
        googleLocationId: String
    ): ResponseEntity<StoreResponse> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        existingStore.googleAccountId = googleAccountId
        existingStore.googleLocationId = googleLocationId

        val updatedStore = storeRepository.save(existingStore)

        return ResponseEntity.ok(
            StoreResponse(
                storeId = updatedStore.storeId.toString(),
                userId = updatedStore.userId.toString(),
                brandId = updatedStore.brandId?.toString(),
                name = updatedStore.name,
                googleAccountId = updatedStore.googleAccountId,
                googleLocationId = updatedStore.googleLocationId,
                googleLinkedAt = updatedStore.googleLinkedAt?.toString(),
                createdAt = updatedStore.createdAt.toString()
            )
        )
    }

    override fun deleteStore(storeId: String): ResponseEntity<Void> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        storeRepository.delete(existingStore)
        return ResponseEntity.noContent().build()
    }
}