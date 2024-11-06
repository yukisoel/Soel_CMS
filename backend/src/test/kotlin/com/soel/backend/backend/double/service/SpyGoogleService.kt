package com.soel.backend.backend.double.service

import com.soel.backend.backend.model.*
import com.soel.backend.backend.service.GoogleService
import org.springframework.http.ResponseEntity

class SpyGoogleService:GoogleService {
    var getAccounts_isCalled = false
    var getAccounts_arg_accessToken:String? = null
    var getAccounts_returnValue:ResponseEntity<List<GoogleAccount>>? = null

    override fun getMe(accessToken: String): GoogleMe? {
        return null
    }

    override fun getAccounts(accessToken: String): ResponseEntity<List<GoogleAccount>>? {
        this.getAccounts_isCalled = true
        this.getAccounts_arg_accessToken = accessToken
        return this.getAccounts_returnValue
    }

    override fun getLocations(accessToken: String, accountId: String): ResponseEntity<List<GoogleLocation>>? {
        TODO("Not yet implemented")
    }

    override fun getLocation(accessToken: String, locationId: String): ResponseEntity<GoogleLocation>? {
        TODO("Not yet implemented")
    }

    override fun getLocationProfile(
        accessToken: String,
        locationId: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        TODO("Not yet implemented")
    }

    override fun getLocationPhotos(
        accessToken: String,
        accountId: String,
        locationId: String
    ): ResponseEntity<List<GoogleLocationPhotoModel>>? {
        TODO("Not yet implemented")
    }

}