package com.soel.backend.backend.service.database

import com.soel.backend.backend.domain.enum.Prefecture
import com.soel.backend.backend.entity.StoreEntity
import com.soel.backend.backend.mapper.StoreMapper
import com.soel.backend.backend.model.GoogleLocationWithPrefecture
import com.soel.backend.backend.model.api.BrandWithStoresResponse
import com.soel.backend.backend.model.api.PrefectureListWithBrandListWithStoreListResponse
import com.soel.backend.backend.model.api.PrefectureWithBrandListWithStoreListResponse
import com.soel.backend.backend.model.api.StoreListResponse
import com.soel.backend.backend.model.api.StoreResponse
import com.soel.backend.backend.repository.database.BrandRepository
import com.soel.backend.backend.repository.database.StoreRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.util.*

interface StoreService {
    fun findStoresByUserId(userId: String): ResponseEntity<StoreListResponse>
    fun findStoresByUserIdAndBrandIdIsNull(userId: String): ResponseEntity<StoreListResponse>
    fun findStoreGroupByPrefecture(userId: String): ResponseEntity<PrefectureListWithBrandListWithStoreListResponse>
    fun findStoresByBrandId(brandId: String): ResponseEntity<StoreListResponse>
    fun findStoreByStoreId(storeId: String): ResponseEntity<StoreResponse>

    fun createStore(userId: String, storeName: String, brandId: String?, googleAccountId: String?, googleLocationId: String?, prefectureName: String?): ResponseEntity<StoreResponse>

    fun updateStore(storeId: String, storeName: String, brandId: String?, googleAccountId: String?, googleLocationId: String?, prefectureName: String?): ResponseEntity<StoreResponse>
    fun updateStoreName(storeId: String, storeName: String): ResponseEntity<StoreResponse>
    fun updateStoreBrand(storeId: String, brandId: String): ResponseEntity<StoreResponse>
    fun updateStoreGoogleAccount(storeId: String, googleAccountId: String): ResponseEntity<StoreResponse>
    fun updateStoreGoogleLocation(storeId: String, googleLocationId: String): ResponseEntity<StoreResponse>
    fun updateStoreGoogleAccountLocation(
        storeId: String,
        googleAccountId: String,
        googleLocationId: String
    ): ResponseEntity<StoreResponse>
    fun updateStorePrefecture(storeId: String, prefectureName: String): ResponseEntity<StoreResponse>

    fun deleteStore(storeId: String): ResponseEntity<Void>

    fun syncGoogleStores(userId: String, googleAccountId: String, locations: List<GoogleLocationWithPrefecture>): ResponseEntity<StoreListResponse>
}

@Service
class StoreServiceImpl(
    private val storeRepository: StoreRepository,
    private val brandRepository: BrandRepository
): StoreService {
    override fun findStoresByUserId(userId: String): ResponseEntity<StoreListResponse> {
        val uuid = UUID.fromString(userId)
        val stores = storeRepository.findByUserId(uuid) ?: emptyList()
        val brandNameMap = loadBrandNameMap(stores)
        return ResponseEntity.ok(
            StoreListResponse(stores.map { entity ->
                toStoreResponse(entity, brandNameMap)
            })
        )
    }

    override fun findStoresByUserIdAndBrandIdIsNull(userId: String): ResponseEntity<StoreListResponse> {
        val uuid = UUID.fromString(userId)
        val stores = storeRepository.findByUserIdAndBrandIdIsNull(uuid) ?: emptyList()
        val brandNameMap = loadBrandNameMap(stores)
        return ResponseEntity.ok(
            StoreListResponse(stores.map { entity ->
                toStoreResponse(entity, brandNameMap)
            })
        )
    }

    override fun findStoreGroupByPrefecture(userId: String): ResponseEntity<PrefectureListWithBrandListWithStoreListResponse> {
        val uuid = UUID.fromString(userId)
        val stores = storeRepository.findByUserId(uuid) ?: emptyList()
        val brands = brandRepository.findByUserId(uuid) ?: emptyList()
        val brandNameMap = brands.associate { it.brandId to it.name }

        val prefectureMap = stores.groupBy { it.prefecture }
        val prefectureListWithBrandListWithStoreListResponse = prefectureMap.map { (prefecture, storeEntities) ->
            val brandMap = storeEntities.groupBy { it.brandId }
            val brandListWithStoresResponse = brandMap.map { (brandId, storeEntities) ->
                val brandEntity = brands.find { it.brandId == brandId }
                val storeListResponse = storeEntities.filter { it.brandId == brandId }
                        .map { storeEntity ->
                            val brandName = brandEntity?.name ?: storeEntity.brandId?.let { brandNameMap[it] } ?: ""
                            StoreMapper.entityToResponse(storeEntity, brandName)
                        }

                BrandWithStoresResponse(
                    brandId = brandEntity?.brandId?.toString() ?: "",
                    userId = userId,
                    name = brandEntity?.name ?: "",
                    createdAt = brandEntity?.createdAt.toString(),
                    stores = storeListResponse,
                    storesCount = storeListResponse.size
                )
            }
            PrefectureWithBrandListWithStoreListResponse(
                prefectureName = prefecture?.name ?: "",
                prefectureJapaneseName = prefecture?.japaneseName ?: "",
                brands = brandListWithStoresResponse
            )
        }

        return ResponseEntity.ok(PrefectureListWithBrandListWithStoreListResponse(prefectureListWithBrandListWithStoreListResponse))
    }

    override fun findStoresByBrandId(brandId: String): ResponseEntity<StoreListResponse> {
        val uuid = UUID.fromString(brandId)
        val stores = storeRepository.findByBrandId(uuid) ?: emptyList()
        return ResponseEntity.ok(
            StoreListResponse(stores.map { entity ->
                StoreMapper.entityToResponse(entity)
            })
        )
    }

    override fun findStoreByStoreId(storeId: String): ResponseEntity<StoreResponse> {
        val uuid = UUID.fromString(storeId)
        val store = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        return ResponseEntity.ok(StoreMapper.entityToResponse(store))
    }

    override fun createStore(userId: String, storeName: String, brandId: String?, googleAccountId: String?, googleLocationId: String?, prefectureName: String?): ResponseEntity<StoreResponse> {
        val userUuid = UUID.fromString(userId)
        val brandUuid = brandId?.let { UUID.fromString(it) }
        val prefecture = prefectureName?.let { Prefecture.fromValue(it) }
        val storeEntity = StoreEntity(userId = userUuid, name = storeName, brandId = brandUuid,
            googleAccountId = googleAccountId, googleLocationId = googleLocationId, prefecture = prefecture)

        val savedStore = storeRepository.save(storeEntity)

        return ResponseEntity
            .status(org.springframework.http.HttpStatus.CREATED)
            .body(StoreMapper.entityToResponse(savedStore))
    }

    override fun updateStore(storeId: String, storeName: String, brandId: String?, googleAccountId: String?, googleLocationId: String?, prefectureName: String?): ResponseEntity<StoreResponse> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        existingStore.name = storeName
        existingStore.brandId = brandId?.let { UUID.fromString(it) }
        existingStore.googleAccountId = googleAccountId
        existingStore.googleLocationId = googleLocationId
        existingStore.prefecture = prefectureName?.let { Prefecture.fromValue(it) }

        val updatedStore = storeRepository.save(existingStore)

        return ResponseEntity.ok(StoreMapper.entityToResponse(updatedStore))
    }

    override fun updateStoreName(storeId: String, storeName: String): ResponseEntity<StoreResponse> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        existingStore.name = storeName

        val updatedStore = storeRepository.save(existingStore)

        return ResponseEntity.ok(StoreMapper.entityToResponse(updatedStore))
    }

    override fun updateStoreBrand(storeId: String, brandId: String): ResponseEntity<StoreResponse> {
        val storeUuid = UUID.fromString(storeId)
        val brandUuid = UUID.fromString(brandId)

        val existingStore = storeRepository.findByStoreId(storeUuid)
            ?: return ResponseEntity.notFound().build()

        existingStore.brandId = brandUuid

        val updatedStore = storeRepository.save(existingStore)

        // ブランド名を取得
        val brandNameMap = loadBrandNameMap(listOf(updatedStore))

        return ResponseEntity.ok(toStoreResponse(updatedStore, brandNameMap))
    }

    override fun updateStoreGoogleAccount(storeId: String, googleAccountId: String): ResponseEntity<StoreResponse> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        existingStore.googleAccountId = googleAccountId

        val updatedStore = storeRepository.save(existingStore)

        return ResponseEntity.ok(StoreMapper.entityToResponse(updatedStore))
    }

    override fun updateStoreGoogleLocation(storeId: String, googleLocationId: String): ResponseEntity<StoreResponse> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        existingStore.googleLocationId = googleLocationId

        val updatedStore = storeRepository.save(existingStore)

        return ResponseEntity.ok(StoreMapper.entityToResponse(updatedStore))
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

        return ResponseEntity.ok(StoreMapper.entityToResponse(updatedStore))
    }

    override fun updateStorePrefecture(storeId: String, prefectureName: String): ResponseEntity<StoreResponse> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        val prefecture = Prefecture.fromValue(prefectureName)
        existingStore.prefecture = prefecture

        val updatedStore = storeRepository.save(existingStore)

        // ブランド名を取得
        val brandNameMap = loadBrandNameMap(listOf(updatedStore))

        return ResponseEntity.ok(toStoreResponse(updatedStore, brandNameMap))
    }

    override fun deleteStore(storeId: String): ResponseEntity<Void> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        storeRepository.delete(existingStore)
        return ResponseEntity.noContent().build()
    }

    override fun syncGoogleStores(userId: String, googleAccountId: String, locations: List<GoogleLocationWithPrefecture>): ResponseEntity<StoreListResponse> {
        val userUuid = UUID.fromString(userId)
        val allStores = storeRepository.findByUserId(userUuid) ?: emptyList()

        val existingForAccount = allStores.filter { it.googleAccountId == googleAccountId && it.googleLocationId != null }
        val existingById = existingForAccount.associateBy { it.googleLocationId!! }

        val incomingById = locations.associateBy { it.name }
        val incomingIds = incomingById.keys
        val existingIds = existingById.keys

        val toAddIds = incomingIds - existingIds
        val toDeleteIds = existingIds - incomingIds

        val toAddEntities = toAddIds.mapNotNull { id ->
            val payload = incomingById[id] ?: return@mapNotNull null
            StoreEntity(
                userId = userUuid,
                brandId = null,
                name = payload.title,
                googleAccountId = googleAccountId,
                googleLocationId = payload.name,
                prefecture = resolvePrefecture(payload.prefecture)
            )
        }

        if (toAddEntities.isNotEmpty()) {
            storeRepository.saveAll(toAddEntities)
        }

        if (toDeleteIds.isNotEmpty()) {
            val deleteEntities = existingForAccount.filter { it.googleLocationId in toDeleteIds }
            if (deleteEntities.isNotEmpty()) {
                storeRepository.deleteAll(deleteEntities)
            }
        }

        return findStoresByUserId(userId)
    }

    private fun toStoreResponse(store: StoreEntity, brandNameMap: Map<UUID, String>): StoreResponse {
        val brandName = store.brandId?.let { brandNameMap[it] } ?: ""
        val response = StoreMapper.entityToResponse(store, brandName)
        return if (response.brandId == null) {
            response.copy(brandId = "", brandName = "")
        } else {
            response
        }
    }

    private fun loadBrandNameMap(stores: Collection<StoreEntity>): Map<UUID, String> {
        val brandIds = stores.mapNotNull { it.brandId }.distinct()
        if (brandIds.isEmpty()) {
            return emptyMap()
        }

        return brandRepository.findAllById(brandIds).associate { it.brandId to it.name }
    }

    private fun resolvePrefecture(prefectureValue: String?): Prefecture? {
        val normalized = prefectureValue?.trim()
        if (normalized.isNullOrBlank()) {
            return null
        }

        return Prefecture.entries.firstOrNull {
            it.japaneseName == normalized || it.name.equals(normalized, ignoreCase = true)
        }
    }
}
