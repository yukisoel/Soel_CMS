package com.soel.backend.backend.service

import com.soel.backend.backend.entity.BrandEntity
import com.soel.backend.backend.repository.database.BrandRepository
import org.springframework.stereotype.Service
import java.util.*

interface BrandService {
    fun findBrandAllByUserId(userId: String): List<BrandEntity>
    fun insertBrand(userId: String, brandName: String): BrandEntity
    fun updateBrandName(brandId: String, brandName: String): BrandEntity
}

@Service
class BrandServiceImpl(
    private val brandRepository: BrandRepository
): BrandService {
    override fun findBrandAllByUserId(userId: String): List<BrandEntity> {
        val uuid = UUID.fromString(userId)
        return brandRepository.findByUserId(uuid) ?: emptyList()
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