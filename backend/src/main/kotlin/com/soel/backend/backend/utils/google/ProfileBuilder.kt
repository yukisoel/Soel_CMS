package com.soel.backend.backend.utils.google

import com.soel.backend.backend.model.*

class ProfileBuilder{
    private var title: String? = null
    private var categories: GoogleLocationCategories? = null
    private var profile: GoogleLocationProfile? = null
    private var openInfo: GoogleLocationOpenInfo? = null
    private var phoneNumbers: GoogleLocationPhoneNumbers? = null
    private var websiteUri: String? = null
    private var serviceArea: GoogleLocationServiceArea? = null
    private var storeFrontAddress: GoogleLocationPostalAddress? = null

    fun title(title: String) = apply {
        this.title = title
    }

    fun categories(primaryCategory: GoogleLocationCategory, additionalCategories: List<GoogleLocationCategory>) = apply {
        this.categories = GoogleLocationCategories(
            primaryCategory = primaryCategory,
            additionalCategories = additionalCategories
        )
    }

    fun profile(description: String) = apply {
        this.profile = GoogleLocationProfile(
            description = description
        )
    }

    fun openingDate(openingDate: GoogleLocationDate) = apply {
        this.openInfo = GoogleLocationOpenInfo(
            openingDate = openingDate
        )
    }

    fun phoneNumbers(primaryPhone: String, additionalPhones: List<String>?) = apply {
        this.phoneNumbers = GoogleLocationPhoneNumbers(
            primaryPhone = primaryPhone,
            additionalPhones = additionalPhones
        )
    }

    fun websiteUri(websiteUri: String) = apply {
        this.websiteUri = websiteUri
    }

    fun serviceArea(placeIds: List<String>) = apply {
        this.serviceArea = GoogleLocationServiceArea(
            places = GoogleLocationPlaceInfos(
                placeInfos = placeIds.map { placeId ->
                    GoogleLocationPlaceInfo(
                        placeId = placeId
                    )
                }
            )
        )
    }

    fun storeFrontAddress(storeFrontAddress: GoogleLocationPostalAddress) = apply {
        this.storeFrontAddress = storeFrontAddress
    }

    fun build(): GoogleLocationProfileModel {
        return GoogleLocationProfileModel(
            title = title,
            categories = categories,
            profile = profile,
            openInfo = openInfo,
            phoneNumbers = phoneNumbers,
            websiteUri = websiteUri,
            serviceArea = serviceArea,
            storefrontAddress = storeFrontAddress
        )
    }

    companion object {
        fun builder() = ProfileBuilder()
    }
}