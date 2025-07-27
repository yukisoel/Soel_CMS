package com.soel.backend.backend.mapper

import com.soel.backend.backend.entity.UserEntity
import com.soel.backend.backend.model.api.User
import com.soel.backend.backend.model.api.UserSuccessResponse

object UserMapper {
    fun entityToDomain(e: UserEntity): User =
        User(
            userId = e.userId.toString(),
            email = e.email,
            createdAt = e.createdAt.toString()
        )

    fun entityToResponse(e: UserEntity): UserSuccessResponse =
        UserSuccessResponse(
            userId = e.userId.toString(),
            email = e.email,
            createdAt = e.createdAt.toString()
        )

    fun domainToResponse(u: User): UserSuccessResponse =
        UserSuccessResponse(
            userId = u.userId,
            email = u.email,
            createdAt = u.createdAt
        )
}