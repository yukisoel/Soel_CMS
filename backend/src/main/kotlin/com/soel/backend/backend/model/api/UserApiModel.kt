package com.soel.backend.backend.model.api

data class User(
    val userId: String,
    val email: String,
    val createdAt: String
)

interface UserApiResponse

data class UserSuccessResponse(
    val userId: String,
    val email: String,
    val createdAt: String
) : UserApiResponse

data class UserErrorResponse(
    override val error: String   = "UserError",
    override val message: String = "An error occurred while processing the user request."
) : ErrorResponse(error, message), UserApiResponse
