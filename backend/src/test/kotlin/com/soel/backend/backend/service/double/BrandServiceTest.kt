package com.soel.backend.backend.service.double

import com.soel.backend.backend.entity.BrandEntity
import com.soel.backend.backend.model.api.BrandListResponse
import com.soel.backend.backend.model.api.BrandResponse
import com.soel.backend.backend.repository.database.BrandRepository
import com.soel.backend.backend.repository.database.StoreRepository
import com.soel.backend.backend.service.database.BrandServiceImpl
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever
import org.assertj.core.api.Assertions.assertThat
import java.util.UUID

class BrandServiceTest {

    @Nested
    inner class findBrandAllByUserId {

        private val brandId = "123e4567-e89b-12d3-a456-426614174001" // Example UUID for brand
        private val userId = "123e4567-e89b-12d3-a456-426614174000" // Example UUID

        // モック変数をここで宣言
        private lateinit var brandRepository: BrandRepository
        private lateinit var storeRepository: StoreRepository

        @BeforeEach
        fun setup() {
            brandRepository = mock()
            storeRepository = mock()
        }

//        @Test
//        fun ブランドが見つからない場合は空のリストを返す() {
//            // Given
//            val service = BrandServiceImpl(brandRepository, storeRepository)
//            whenever(brandRepository.findByUserId(UUID.fromString(userId))).thenReturn(emptyList())
//
//            // When
//            val result = service.findBrandAllByUserId(userId)
//
//            // Then
//            assertThat(result.body).isEqualTo(BrandListResponse(brands= emptyList()))
//        }
//
//        @Test
//        fun ブランドが存在する場合はリストにブランドが含まれる() {
//            // Given
//            val sampleBrand = BrandEntity(
//                brandId = UUID.fromString(brandId),
//                userId = UUID.fromString(userId),
//                name = "Sample Brand"
//            )
//            val service = BrandServiceImpl(brandRepository, storeRepository)
//            whenever(brandRepository.findByUserId(UUID.fromString(userId))).thenReturn(listOf(sampleBrand))
//
//            // When
//            val result = service.findBrandAllByUserId(userId)
//
//            // Then
//            assertThat(result.body).isEqualTo(
//                BrandListResponse(
//                    brands = listOf(
//                        BrandResponse(
//                            brandId = sampleBrand.brandId.toString(),
//                            userId = sampleBrand.userId.toString(),
//                            name = sampleBrand.name,
//                            createdAt = sampleBrand.createdAt.toString()
//                        )
//                    )
//                )
//            )
//        }
    }
}
