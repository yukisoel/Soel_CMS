package com.soel.backend.backend.service

import com.soel.backend.backend.model.FacebookMe
import com.soel.backend.backend.model.FacebookMeAccounts
import com.soel.backend.backend.repository.FacebookRepository
import org.springframework.stereotype.Service

@Service
class FacebookService(val facebookRepository: FacebookRepository) {

    fun getMe(accessToken: String): FacebookMe? {
        return facebookRepository.getMe(accessToken)
    }

    fun getMeAccounts(accessToken: String): FacebookMeAccounts? {
        return facebookRepository.getMeAccounts(accessToken)
    }
}