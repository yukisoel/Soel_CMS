package com.soel.backend.backend.double.service

import com.soel.backend.backend.model.GoogleAccountList
import com.soel.backend.backend.model.GoogleMe
import com.soel.backend.backend.service.GoogleService

class SpyGoogleService:GoogleService {
    var getAccounts_isCalled = false
    var getAccounts_arg_accessToken:String? = null
    var getAccounts_returnValue:GoogleAccountList? = null

    override fun getMe(accessToken: String): GoogleMe? {
        return null
    }

    override fun getAccounts(accessToken: String): GoogleAccountList? {
        this.getAccounts_isCalled = true
        this.getAccounts_arg_accessToken = accessToken
        return this.getAccounts_returnValue
    }

}