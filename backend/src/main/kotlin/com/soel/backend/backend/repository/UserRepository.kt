package com.soel.backend.backend.repository

import com.soel.backend.backend.entity.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository : JpaRepository<UserEntity, UUID> {
    fun findByUserId(userId: UUID): UserEntity?
}