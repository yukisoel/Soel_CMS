package com.soel.backend.backend.model.api

data class Brand(
    val brandId: String,
    val userId: String,
    val name: String,
    val createdAt: String
)

interface BrandApiResponse
interface BrandListApiResponse

data class BrandResponse(
    val brandId: String,
    val userId: String,
    val name: String,
    val createdAt: String
) : BrandApiResponse

data class BrandListResponse(
    val brands: List<BrandResponse>
) : BrandListApiResponse

data class BrandErrorResponse(
    override val error: String = "BrandError",
    override val message: String = "An error occurred while processing the brand request."
) : ErrorResponse(error, message), BrandApiResponse, BrandListApiResponse
