package com.soel.backend.backend.model.api

data class CognitoAccountResponse(
    val userId: String,
    val email: String,
)

data class CognitoAccountErrorResponse(
    val error: String,
    val message: String
)