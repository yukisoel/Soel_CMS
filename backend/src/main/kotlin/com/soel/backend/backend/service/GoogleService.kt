package com.soel.backend.backend.service

import com.soel.backend.backend.model.*
import com.soel.backend.backend.repository.GoogleRepository
import org.springframework.stereotype.Service

interface GoogleService {
    fun getMe(accessToken: String): GoogleMe?
    fun getAccounts(accessToken: String): GoogleAccountList?

}

@Service
class GoogleServicImpl(val googleRepository: GoogleRepository):GoogleService {
    override fun getMe(accessToken: String): GoogleMe? {
        return googleRepository.getMe(accessToken)
    }

    override fun getAccounts(accessToken: String): GoogleAccountList? {
        return googleRepository.getAccounts(accessToken)
    }

//    fun getAccountsLocations(accessToken: String): GoogleMe? {
//        return googleRepository.getAccountsLocations(accessToken)
//    }
}