package com.soel.backend.backend.repository.database

import com.soel.backend.backend.entity.StoreEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface StoreRepository: JpaRepository<StoreEntity, UUID> {
    fun findByUserId(userId: UUID): List<StoreEntity>?
    fun findByStoreId(storeId: UUID): StoreEntity?
}