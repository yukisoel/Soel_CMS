package com.soel.backend.backend.service

import com.soel.backend.backend.entity.BrandEntity
import com.soel.backend.backend.mapper.BrandMapper
import com.soel.backend.backend.model.api.BrandListResponse
import com.soel.backend.backend.model.api.BrandResponse
import com.soel.backend.backend.repository.database.BrandRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.util.*

interface BrandService {
    fun findBrandAllByUserId(userId: String): ResponseEntity<BrandListResponse>
    fun createBrand(userId: String, brandName: String): ResponseEntity<BrandResponse>
    fun updateBrandName(brandId: String, brandName: String): ResponseEntity<BrandResponse>
    fun deleteBrand(brandId: String): ResponseEntity<Void>
}

@Service
class BrandServiceImpl(
    private val brandRepository: BrandRepository
): BrandService {
    override fun findBrandAllByUserId(userId: String): ResponseEntity<BrandListResponse> {
        val uuid = UUID.fromString(userId)
        val brands = brandRepository.findByUserId(uuid) ?: emptyList()
        return ResponseEntity.ok(
            BrandListResponse(brands.map { entity ->
                BrandMapper.entityToResponse(entity)
            })
        )
    }

    override fun createBrand(userId: String, brandName: String): ResponseEntity<BrandResponse> {
        val uuid = UUID.fromString(userId)
        val brandEntity = BrandEntity(
            userId = uuid,
            name = brandName
        )
        val savedBrand = brandRepository.save(brandEntity)
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(BrandMapper.entityToResponse(savedBrand))
    }

    override fun updateBrandName(brandId: String, brandName: String): ResponseEntity<BrandResponse> {
        val uuid = UUID.fromString(brandId)
        val existingBrand = brandRepository.findByBrandId(uuid)
            ?: throw IllegalArgumentException("Brand does not exist.")
        existingBrand.name = brandName

        return ResponseEntity.ok(
            BrandMapper.entityToResponse(brandRepository.save(existingBrand))
        )
    }

    override fun deleteBrand(brandId: String): ResponseEntity<Void> {
        val uuid = UUID.fromString(brandId)
        val existingBrand = brandRepository.findByBrandId(uuid)
            ?: throw IllegalArgumentException("Brand does not exist.")
        brandRepository.delete(existingBrand)
        return ResponseEntity.noContent().build()
    }
}