package com.soel.backend.backend.service

import com.soel.backend.backend.entity.UserEntity
import com.soel.backend.backend.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import java.util.*

interface UserService {
    fun upsertUser(sub: String, email: String): UserEntity
}

@Service
class UserServiceImpl(
    val userRepository: UserRepository
): UserService {

    @Transactional
    override fun upsertUser(sub: String, email: String): UserEntity {
        val uuid = UUID.fromString(sub)
        val existing = userRepository.findByUserId(uuid)
        return existing ?: userRepository.save(UserEntity(userId = uuid, email = email))
    }
}