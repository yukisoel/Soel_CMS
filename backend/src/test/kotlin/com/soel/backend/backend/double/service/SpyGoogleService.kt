package com.soel.backend.backend.double.service

import com.soel.backend.backend.model.GoogleAccount
import com.soel.backend.backend.model.GoogleAccountsResponse
import com.soel.backend.backend.model.GoogleLocation
import com.soel.backend.backend.model.GoogleMe
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

}