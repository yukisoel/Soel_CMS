package com.soel.backend.backend.service

import com.soel.backend.backend.SecurityConfig
import com.soel.backend.backend.model.*
import com.soel.backend.backend.repository.GoogleRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

interface GoogleService {
    fun getMe(accessToken: String): GoogleMe?
    fun getAccounts(accessToken: String): ResponseEntity<List<GoogleAccount>>?
    fun getAccount(accessToken: String, accountId: String): ResponseEntity<GoogleAccount>?
    fun getLocations(accessToken: String, accountId: String): ResponseEntity<List<GoogleLocation>>?
    fun getLocation(accessToken: String, locationId: String): ResponseEntity<GoogleLocation>?
    fun getLocationProfile(accessToken: String, locationId: String): ResponseEntity<GoogleLocationProfileModel>?
    fun getLocationPhotos(accessToken: String, accountId: String, locationId: String): ResponseEntity<List<GoogleLocationPhotoModel>>?
}

@Service
class GoogleServicImpl(val googleRepository: GoogleRepository) : GoogleService {
    private val logger: Logger = LoggerFactory.getLogger(SecurityConfig::class.java)

    override fun getMe(accessToken: String): GoogleMe? {
        return googleRepository.getMe(accessToken)
    }

    override fun getAccounts(accessToken: String): ResponseEntity<List<GoogleAccount>>? {
        try {
            val googleAccountsResponse = googleRepository.getAccounts(accessToken)
            val googleAccounts = googleAccountsResponse?.accounts?.map { account ->
                GoogleAccount(
                    account.name.removePrefix("accounts/"),
                    account.accountName
                )
            }
            return ResponseEntity.ok(googleAccounts)
        } catch (e: Exception) {
            logger.error("Error getting accounts", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getAccount(accessToken: String, accountId: String): ResponseEntity<GoogleAccount>? {
        try {
            val googleAccount = googleRepository.getAccount(accessToken, accountId)
            return ResponseEntity.ok(
                GoogleAccount(
                    googleAccount!!.name.removePrefix("accounts/"),
                    googleAccount.accountName
                )
            )
        } catch (e: Exception) {
            logger.error("Error getting account", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocations(accessToken: String, accountId: String): ResponseEntity<List<GoogleLocation>>? {
        try {
            val googleLocationsResponse = googleRepository.getLocations(accessToken, accountId)
            val googleLocations = googleLocationsResponse?.locations?.map { location ->
                GoogleLocation(
                    location.name.removePrefix("locations/"),
                    location.title
                )
            }
            return ResponseEntity.ok(googleLocations)
        } catch (e: Exception) {
            logger.error("Error getting locations", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocation(accessToken: String, locationId: String): ResponseEntity<GoogleLocation>? {
        try {
            val googleLocation = googleRepository.getLocation(accessToken, locationId)
            return ResponseEntity.ok(
                GoogleLocation(
                    googleLocation!!.name.removePrefix("locations/"),
                    googleLocation.title
                )
            )
        } catch (e: Exception) {
            logger.error("Error getting location", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocationProfile(
        accessToken: String,
        locationId: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        try {
            val googleLocationProfile = googleRepository.getLocationProfile(accessToken, locationId)
            println("googleLocationProfile")
            println(googleLocationProfile)
            return ResponseEntity.ok(
                GoogleLocationProfileModel(
                    googleLocationProfile!!.name?.removePrefix("locations/"),
                    googleLocationProfile.title,
                    googleLocationProfile.phoneNumbers,
                    googleLocationProfile.categories,
//                    googleLocationProfile.storefrontAddress,
                    googleLocationProfile.websiteUri,
//                    googleLocationProfile.regularHours,
                    googleLocationProfile.profile,
                    googleLocationProfile.openInfo,
                )
            )
        } catch (e: Exception) {
            logger.error("Error getting location profile", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocationPhotos(
        accessToken: String,
        accountId: String,
        locationId: String
    ): ResponseEntity<List<GoogleLocationPhotoModel>>? {
        try {
            val googleLocationPhotosResponse = googleRepository.getLocationPhotos(accessToken, accountId, locationId)

            val googleLocationPhotoModels = googleLocationPhotosResponse?.mediaItems?.map { photoModel ->
                GoogleLocationPhotoModel(
                    photoModel.name,
                    photoModel.googleUrl,
                    photoModel.thumbnailUrl,
                    photoModel.createTime,
                    photoModel.locationAssociation,
                )
            }
            return ResponseEntity.ok(googleLocationPhotoModels)
        }
        catch (e: Exception) {
            logger.error("Error getting location photos", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }
}