package com.soel.backend.backend.service.database

import com.soel.backend.backend.domain.enum.Prefecture
import com.soel.backend.backend.entity.StoreEntity
import com.soel.backend.backend.mapper.StoreMapper
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
//    fun findStoresAndGroupByPrefecture(userId: String): ResponseEntity<PrefectureListWithBrandListWithStoreListResponse>
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
}

@Service
class StoreServiceImpl(
    private val storeRepository: StoreRepository,
    private val brandRepository: BrandRepository
): StoreService {
    override fun findStoresByUserId(userId: String): ResponseEntity<StoreListResponse> {
        val uuid = UUID.fromString(userId)
        val stores = storeRepository.findByUserId(uuid) ?: emptyList()
        return ResponseEntity.ok(
            StoreListResponse(stores.map { entity ->
                StoreMapper.entityToResponse(entity)
            })
        )
    }

    override fun findStoresByUserIdAndBrandIdIsNull(userId: String): ResponseEntity<StoreListResponse> {
        val uuid = UUID.fromString(userId)
        val stores = storeRepository.findByUserIdAndBrandIdIsNull(uuid) ?: emptyList()
        return ResponseEntity.ok(
            StoreListResponse(stores.map { entity ->
                StoreMapper.entityToResponse(entity)
            })
        )
    }

//    override fun findStoresAndGroupByPrefecture(userId: String): ResponseEntity<PrefectureListWithBrandListWithStoreListResponse> {
//        val uuid = UUID.fromString(userId)
//        val stores = storeRepository.findByUserId(uuid) ?: emptyList()
//        val brands = brandRepository.findByUserId(uuid) ?: emptyList()
//
//        val groupedByPrefecture = stores.groupBy { it.prefecture }
//        val ggg = groupedByPrefecture.map { (prefecture, stores) ->
//            val groupedByBrand = stores.groupBy { it.brandId }
//            val brandsWithStores = groupedByBrand.map { (brandId, brandStores) ->
//                val brandEntity = brands.find { it.brandId == brandId }
//                val brand = BrandMapper.entityToResponse(brandEntity)
//
//                StoreMapper.entityToResponse(entity)
//            }
//
//            PrefectureListWithBrandListWithStoreListResponse(
//                prefectureName = prefectureName,
//                prefectureJapaneseName = prefectureJapaneseName,
//                brands = brandsWithStores
//            )
//        }
//
//        return ResponseEntity.ok(PrefectureListWithBrandListWithStoreListResponse(groupedStores))
//    }

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

        return ResponseEntity.ok(StoreMapper.entityToResponse(updatedStore))
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

        return ResponseEntity.ok(StoreMapper.entityToResponse(updatedStore))
    }

    override fun deleteStore(storeId: String): ResponseEntity<Void> {
        val uuid = UUID.fromString(storeId)
        val existingStore = storeRepository.findByStoreId(uuid)
            ?: return ResponseEntity.notFound().build()

        storeRepository.delete(existingStore)
        return ResponseEntity.noContent().build()
    }
}