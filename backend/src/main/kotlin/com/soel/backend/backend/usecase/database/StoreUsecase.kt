package com.soel.backend.backend.usecase.database

import com.soel.backend.backend.model.GoogleLocationWithPrefecture
import com.soel.backend.backend.model.api.StoreListResponse
import com.soel.backend.backend.service.database.StoreService
import com.soel.backend.backend.service.google.GoogleService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

interface StoreUsecase {
    fun syncGoogleStores(accessToken: String, userId: String, accountId: String): ResponseEntity<StoreListResponse>
}

@Service
class StoreUsecaseImpl(
    private val googleService: GoogleService,
    private val storeService: StoreService
) : StoreUsecase {

    private val logger: Logger = LoggerFactory.getLogger(StoreUsecaseImpl::class.java)

    override fun syncGoogleStores(accessToken: String, userId: String, accountId: String): ResponseEntity<StoreListResponse> {
        val locationsResponse = googleService.getLocations(accessToken, accountId)
        if (locationsResponse?.statusCode?.is2xxSuccessful != true) {
            val status = locationsResponse?.statusCode ?: HttpStatus.BAD_GATEWAY
            logger.warn("Failed to fetch Google locations for accountId={} status={} ", accountId, status)
            return ResponseEntity.status(status).body(null)
        }

        val locations = locationsResponse.body ?: emptyList()
        val locationsWithPrefecture = locations.map { location ->
            val prefectureValue = googleService.getLocationProfile(accessToken, location.name)
                ?.takeIf { it.statusCode.is2xxSuccessful }
                ?.body
                ?.storefrontAddress
                ?.administrativeArea
                ?.trim()
                ?.takeIf { it.isNotEmpty() }

            GoogleLocationWithPrefecture(
                name = location.name,
                title = location.title,
                prefecture = prefectureValue
            )
        }

        return storeService.syncGoogleStores(userId, accountId, locationsWithPrefecture)
    }
}
