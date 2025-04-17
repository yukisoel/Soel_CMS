package com.soel.backend.backend.usecase

import com.soel.backend.backend.model.*
import com.soel.backend.backend.service.GoogleService
import com.soel.backend.backend.utils.google.AttributesBuilder
import com.soel.backend.backend.utils.google.ProfileBuilder
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

interface GoogleUseCase {
    fun updateProfileTitle(accessToken: String, locationId: String, title: String): ResponseEntity<GoogleLocationProfileModel>?
    fun updateLocationProfilePrimaryCategory(
        accessToken: String,
        locationId: String,
        primaryCategory: GoogleLocationCategory
    ): ResponseEntity<GoogleLocationProfileModel>?
    fun updateLocationProfileAdditionalCategories(
        accessToken: String,
        locationId: String,
        additionalCategories: List<GoogleLocationCategory>
    ): ResponseEntity<GoogleLocationProfileModel>?
    fun updateLocationProfileDescription(
        accessToken: String,
        locationId: String,
        description: String
    ): ResponseEntity<GoogleLocationProfileModel>?
    fun updateLocationProfileOpeningDate(
        accessToken: String,
        locationId: String,
        openingDate: GoogleLocationDate
    ): ResponseEntity<GoogleLocationProfileModel>?
    fun updateLocationProfilePhoneNumber(
        accessToken: String,
        locationId: String,
        phoneNumber: String
    ): ResponseEntity<GoogleLocationProfileModel>?
    fun updateLocationProfileWebsiteUri(
        accessToken: String,
        locationId: String,
        websiteUri: String
    ): ResponseEntity<GoogleLocationProfileModel>?
    fun updateLocationProfileServiceArea(
        accessToken: String,
        locationId: String,
        placeIds: List<String>,
    ): ResponseEntity<GoogleLocationProfileModel>?

    fun updateLocationAttributeSnsLink(
        accessToken: String,
        locationId: String,
        snsLinkRequest: GoogleLocationAttributeSnsLinkRequest
    ): ResponseEntity<GoogleLocationAttributesModel>?
}

@Service
class GoogleUseCaseImpl(val googleService: GoogleService) : GoogleUseCase {
    override fun updateProfileTitle(
        accessToken: String,
        locationId: String,
        title: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        val updateMask = "title"
        val locationProfile = ProfileBuilder.builder().title(title).build()
        return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
    }

    override fun updateLocationProfilePrimaryCategory(
        accessToken: String,
        locationId: String,
        primaryCategory: GoogleLocationCategory,
    ): ResponseEntity<GoogleLocationProfileModel>? {
        val resentProfileResponse = googleService.getLocationProfile(accessToken, locationId)
        val resentProfile = resentProfileResponse?.body ?: return null
        if (resentProfile.categories?.additionalCategories == null) {
            return ResponseEntity(null, null, 500)
        }
        val updateMask = "categories"
        val locationProfile = ProfileBuilder.builder().categories(primaryCategory, resentProfile.categories.additionalCategories).build()
        return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
    }

    override fun updateLocationProfileAdditionalCategories(accessToken: String, locationId: String, additionalCategories: List<GoogleLocationCategory>): ResponseEntity<GoogleLocationProfileModel>? {
        val resentProfileResponse = googleService.getLocationProfile(accessToken, locationId)
        val resentProfile = resentProfileResponse?.body ?: return null
        if (resentProfile.categories?.primaryCategory == null) {
            return ResponseEntity(null, null, 500)
        }
        val updateMask = "categories"
        val locationProfile = ProfileBuilder.builder().categories(resentProfile.categories.primaryCategory, additionalCategories).build()
        return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
    }

    override fun updateLocationProfileDescription(
        accessToken: String,
        locationId: String,
        description: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        val updateMask = "profile.description"
        val locationProfile = ProfileBuilder.builder().profile(description).build()
        return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
    }

    override fun updateLocationProfileOpeningDate(
        accessToken: String,
        locationId: String,
        openingDate: GoogleLocationDate
    ): ResponseEntity<GoogleLocationProfileModel>? {
        val updateMask = "openInfo.opening_date"
        val locationProfile = ProfileBuilder.builder().openingDate(openingDate).build()
        return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
    }

    override fun updateLocationProfilePhoneNumber(
        accessToken: String,
        locationId: String,
        phoneNumber: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        val resentProflieResponse = googleService.getLocationProfile(accessToken, locationId)
        val resentProfile = resentProflieResponse?.body ?: return null
        val phoneNumberInt = phoneNumber.filter { it.isDigit() }.toLong()
        if (phoneNumberInt.toString().length != 10) {
            return ResponseEntity.status(441).body(null)
        }
        val updateMask = "phoneNumbers"
        val locationProfile = ProfileBuilder.builder().phoneNumbers(phoneNumber, resentProfile.phoneNumbers?.additionalPhones).build()
        return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
    }

    override fun updateLocationProfileWebsiteUri(accessToken: String, locationId: String, websiteUri: String): ResponseEntity<GoogleLocationProfileModel>? {
        val updateMask = "websiteUri"
        val locationProfile = ProfileBuilder.builder().websiteUri(websiteUri).build()
        return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
    }

    override fun updateLocationProfileServiceArea(accessToken: String, locationId: String, placeIds: List<String>): ResponseEntity<GoogleLocationProfileModel>? {
        val updateMask = "serviceArea"
        val locationProfile = ProfileBuilder.builder().serviceArea(placeIds).build()
        return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
    }

    override fun updateLocationAttributeSnsLink(accessToken: String, locationId: String, snsLinkRequest: GoogleLocationAttributeSnsLinkRequest): ResponseEntity<GoogleLocationAttributesModel>? {
        val attributeMask = snsLinkRequest.snsType.attributeName
        val attributes = AttributesBuilder.builder().snsLink(attributeMask, snsLinkRequest.snsUrl).build()
        println(attributes)
        return googleService.updateLocationAttributes(accessToken, locationId, attributeMask, attributes)
    }
}