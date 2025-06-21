package com.soel.backend.backend.service

import com.soel.backend.backend.entity.BrandEntity
import com.soel.backend.backend.mapper.BrandMapper
import com.soel.backend.backend.model.api.BrandListApiResponse
import com.soel.backend.backend.model.api.BrandListResponse
import com.soel.backend.backend.repository.database.BrandRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.util.*

interface BrandService {
    fun findBrandAllByUserId(userId: String): ResponseEntity<BrandListApiResponse>
    fun insertBrand(userId: String, brandName: String): BrandEntity
    fun updateBrandName(brandId: String, brandName: String): BrandEntity
}

@Service
class BrandServiceImpl(
    private val brandRepository: BrandRepository
): BrandService {
    override fun findBrandAllByUserId(userId: String): ResponseEntity<BrandListApiResponse> {
        val uuid = UUID.fromString(userId)
        val brands = brandRepository.findByUserId(uuid) ?: emptyList()
        return ResponseEntity.ok(
            BrandListResponse(brands.map { entity ->
                BrandMapper.entityToResponse(entity)
            })
        )
    }

    override fun insertBrand(userId: String, brandName: String): BrandEntity {
        val uuid = UUID.fromString(userId)
        return brandRepository.save(
            BrandEntity(
                userId = uuid,
                name = brandName,
            )
        )
    }

    override fun updateBrandName(brandId: String, brandName: String): BrandEntity {
        val uuid = UUID.fromString(brandId)
        val existingBrand = brandRepository.findByBrandId(uuid)
            ?: throw IllegalArgumentException("Brand does not exist.")

        return brandRepository.save(existingBrand)
    }
}