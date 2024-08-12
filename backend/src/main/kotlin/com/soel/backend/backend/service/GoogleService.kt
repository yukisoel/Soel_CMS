package com.soel.backend.backend.service

import com.soel.backend.backend.model.*
import com.soel.backend.backend.repository.GoogleRepository
import org.springframework.stereotype.Service

@Service
class GoogleService(val googleRepository: GoogleRepository) {
    fun getMe(accessToken: String): GoogleMe? {
        return googleRepository.getMe(accessToken)
    }

    fun getAccounts(accessToken: String): GoogleMe? {
        return googleRepository.getAccounts(accessToken)
    }

    fun getAccountsLocations(accessToken: String): GoogleMe? {
        return googleRepository.getAccountsLocations(accessToken)
    }
}