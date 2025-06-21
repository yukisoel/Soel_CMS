package com.soel.backend.backend.usecase

import com.fasterxml.jackson.databind.node.BooleanNode
import com.soel.backend.backend.model.*
import com.soel.backend.backend.service.google.GoogleService
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
    fun updateLocationStoreFrontAddress(
        accessToken: String,
        locationId: String,
        storeFrontAddressRequest: GoogleLocationStoreFrontAddressRequest
    ): ResponseEntity<GoogleLocationProfileModel>?
    fun updateLocationBusinessHours(
        accessToken: String,
        locationId: String,
        businessHoursRequest: GoogleLocationBusinessHoursRequest
    ): ResponseEntity<GoogleLocationProfileModel>?

    fun updateLocationAttributeSnsLink(
        accessToken: String,
        locationId: String,
        snsLinkRequest: GoogleLocationAttributeSnsLinkRequest
    ): ResponseEntity<GoogleLocationAttributesModel>?

    fun updateLocationAttributeMenuLink(
        accessToken: String,
        locationId: String,
        menuLink: String
    ): ResponseEntity<GoogleLocationAttributesModel>?

    fun updateLocationBusinessOwnerInfo(
        accessToken: String,
        locationId: String,
        isOwnedByWomen: Boolean?
    ): ResponseEntity<GoogleLocationAttributesModel>?

    fun updateLocationServices(
        accessToken: String,
       locationId: String,
       services: List<GoogleLocationAttributeService>
    ): ResponseEntity<GoogleLocationAttributesModel>?

    fun updateLocationServiceOptions(
        accessToken: String,
        locationId: String,
        serviceOptions: List<GoogleLocationAttributeServiceOption>
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
        val currentProfileResponse = googleService.getLocationProfile(accessToken, locationId)
        val currentProfile = currentProfileResponse?.body ?: return null
        if (currentProfile.categories?.additionalCategories == null) {
            return ResponseEntity(null, null, 500)
        }
        val updateMask = "categories"
        val locationProfile = ProfileBuilder.builder().categories(primaryCategory, currentProfile.categories.additionalCategories).build()
        return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
    }

    override fun updateLocationProfileAdditionalCategories(accessToken: String, locationId: String, additionalCategories: List<GoogleLocationCategory>): ResponseEntity<GoogleLocationProfileModel>? {
        val currentProfileResponse = googleService.getLocationProfile(accessToken, locationId)
        val currentProfile = currentProfileResponse?.body ?: return null
        if (currentProfile.categories?.primaryCategory == null) {
            return ResponseEntity(null, null, 500)
        }
        val updateMask = "categories"
        val locationProfile = ProfileBuilder.builder().categories(currentProfile.categories.primaryCategory, additionalCategories).build()
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
        val currentProfileResponse = googleService.getLocationProfile(accessToken, locationId)
        val currentProfile = currentProfileResponse?.body ?: return null
        val phoneNumberInt = phoneNumber.filter { it.isDigit() }.toLong()
        if (phoneNumberInt.toString().length != 10) {
            return ResponseEntity.status(441).body(null)
        }
        val updateMask = "phoneNumbers"
        val locationProfile = ProfileBuilder.builder().phoneNumbers(phoneNumber, currentProfile.phoneNumbers?.additionalPhones).build()
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

    override fun updateLocationStoreFrontAddress(
        accessToken: String,
        locationId: String,
        storeFrontAddressRequest: GoogleLocationStoreFrontAddressRequest
    ): ResponseEntity<GoogleLocationProfileModel>? {
        val updateMask = "storefrontAddress"
        val updateStoreFrontAddress = GoogleLocationPostalAddress(
            postalCode = storeFrontAddressRequest.postalCode,
            administrativeArea = storeFrontAddressRequest.administrativeArea.japaneseName,
            addressLines = storeFrontAddressRequest.addressLines,
            regionCode = "JP",
        )
        val locationProfile = ProfileBuilder.builder().storeFrontAddress(updateStoreFrontAddress).build()
        return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
    }

    override fun updateLocationBusinessHours(accessToken: String, locationId: String, businessHoursRequest: GoogleLocationBusinessHoursRequest): ResponseEntity<GoogleLocationProfileModel>? {
        if(businessHoursRequest.hoursTypeId.code == BusinessHoursType.REGULAR.code) {
            val updateMask = "regularHours"
            val locationProfile = ProfileBuilder.builder().regularHours(businessHoursRequest.periods).build()
            return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
        } else{
            val currentProfileResponse = googleService.getLocationProfile(accessToken, locationId)
            val currentProfile = currentProfileResponse?.body ?: return null

            val existingMoreHoursList: List<GoogleLocationMoreHours> =
                currentProfile.moreHours ?: emptyList()
            val newMoreHours = GoogleLocationMoreHours(
                hoursTypeId = businessHoursRequest.hoursTypeId.code,
                periods = businessHoursRequest.periods
            )

            val mergedMoreHoursList = existingMoreHoursList.toMutableList().apply {
                val idx = existingMoreHoursList.indexOfFirst { it.hoursTypeId == newMoreHours.hoursTypeId }
                if (idx != -1) {
                    this[idx] = newMoreHours
                } else {
                    this.add(newMoreHours)
                }
            }

            val updateMask = "moreHours"
            val locationProfile = ProfileBuilder.builder().moreHours(mergedMoreHoursList).build()
            return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
        }
    }

    override fun updateLocationAttributeSnsLink(accessToken: String, locationId: String, snsLinkRequest: GoogleLocationAttributeSnsLinkRequest): ResponseEntity<GoogleLocationAttributesModel>? {
        val attributeMask = snsLinkRequest.snsType.attributeName
        val attributes = AttributesBuilder.builder().snsLink(attributeMask, snsLinkRequest.snsUrl).build()
        return googleService.updateLocationAttributes(accessToken, locationId, attributeMask, attributes)
    }

    override fun updateLocationAttributeMenuLink(accessToken: String, locationId: String, menuLink: String): ResponseEntity<GoogleLocationAttributesModel>? {
        val attributeMask = "attributes/url_menu"
        val attributes = AttributesBuilder.builder().menuLink(attributeMask, menuLink).build()
        return googleService.updateLocationAttributes(accessToken, locationId, attributeMask, attributes)
    }

    override fun updateLocationBusinessOwnerInfo(accessToken: String, locationId: String, isOwnedByWomen: Boolean?): ResponseEntity<GoogleLocationAttributesModel>? {
        val attributeMask = "attributes/is_owned_by_women"
        val attributes = AttributesBuilder.builder()
            .apply {
            isOwnedByWomen?.let { boolAttribute(attributeMask, it) }
            }
            .build()

        return googleService.updateLocationAttributes(accessToken, locationId, attributeMask, attributes)
    }

    override fun updateLocationServices(accessToken: String, locationId: String, services: List<GoogleLocationAttributeService>): ResponseEntity<GoogleLocationAttributesModel>? {
        val attributeMask = services.joinToString(separator = ",") { it.type.attributeName }

        val attributes = GoogleLocationAttributesModel(
            attributes = services
                .map { service ->
                    service.value?.let { value ->
                        GoogleLocationAttribute(
                            name = service.type.attributeName,
                            valueType = GoogleLocationAttributeValueType.BOOL,
                            values = listOf(BooleanNode.valueOf(value))
                        )
                    }
                }
        )

        return googleService.updateLocationAttributes(
            accessToken = accessToken,
            locationId = locationId,
            attributeMask = attributeMask,
            attributes = attributes
        )
    }

    override fun updateLocationServiceOptions(accessToken: String, locationId: String, serviceOptions: List<GoogleLocationAttributeServiceOption>): ResponseEntity<GoogleLocationAttributesModel>? {
        val attributeMask = serviceOptions.joinToString(separator = ",") { it.type.attributeName }

        val attributes = GoogleLocationAttributesModel(
            attributes = serviceOptions
                .map { serviceOption ->
                    serviceOption.value?.let { value ->
                        GoogleLocationAttribute(
                            name = serviceOption.type.attributeName,
                            valueType = GoogleLocationAttributeValueType.BOOL,
                            values = listOf(BooleanNode.valueOf(value))
                        )
                    }
                }
        )

        return googleService.updateLocationAttributes(
            accessToken = accessToken,
            locationId = locationId,
            attributeMask = attributeMask,
            attributes = attributes
        )
    }
}