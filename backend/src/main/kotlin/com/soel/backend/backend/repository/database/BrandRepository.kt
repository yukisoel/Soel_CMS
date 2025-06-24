package com.soel.backend.backend.repository.database

import com.soel.backend.backend.entity.BrandEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface BrandRepository : JpaRepository<BrandEntity, UUID> {
    fun findByUserId(userId: UUID): List<BrandEntity>?
    fun findByBrandId(brandId: UUID): BrandEntity?
}