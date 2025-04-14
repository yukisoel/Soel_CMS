package com.soel.backend.backend.utils.google

import com.soel.backend.backend.model.*

class ProfileBuilder{
    private var title: String? = null
    private var categories: GoogleLocationCategories? = null
    private var profile: GoogleLocationProfile? = null
    private var openInfo: GoogleLocationOpenInfo? = null
    private var phoneNumbers: GoogleLocationPhoneNumbers? = null
    private var websiteUri: String? = null

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

    fun build(): GoogleLocationProfileModel {
        return GoogleLocationProfileModel(
            title = title,
            categories = categories,
            profile = profile,
            openInfo = openInfo,
            phoneNumbers = phoneNumbers,
            websiteUri = websiteUri
        )
    }

    companion object {
        fun builder() = ProfileBuilder()
    }
}