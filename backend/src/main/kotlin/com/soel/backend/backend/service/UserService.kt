package com.soel.backend.backend.service

import com.soel.backend.backend.entity.UserEntity
import com.soel.backend.backend.mapper.UserMapper
import com.soel.backend.backend.model.api.UserApiResponse
import com.soel.backend.backend.model.api.UserSuccessResponse
import com.soel.backend.backend.repository.database.UserRepository
import jakarta.transaction.Transactional
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.util.*

interface UserService {
    fun getMe(sub: String, email: String): ResponseEntity<UserSuccessResponse>
}

@Service
class UserServiceImpl(
    val userRepository: UserRepository
): UserService {
    @Transactional
    override fun getMe(sub: String, email: String): ResponseEntity<UserSuccessResponse> {
        val uuid = UUID.fromString(sub)
        val existing = userRepository.findByUserId(uuid)
        if (existing != null) {
            return ResponseEntity.ok(UserMapper.entityToResponse(existing))
        }
        val newUser = userRepository.save(UserEntity(userId = uuid, email = email))
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(UserMapper.entityToResponse(newUser))
    }
}
