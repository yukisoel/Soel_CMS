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
    fun getLocations(accessToken: String, accountId: String): ResponseEntity<List<GoogleLocation>>?
    fun getLocation(accessToken: String, locationId: String): ResponseEntity<GoogleLocation>?
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

    override fun getLocation(accessToken: String, locationId: String): ResponseEntity<GoogleLocation>?  {
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
}