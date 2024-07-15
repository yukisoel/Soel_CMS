package com.soel.backend.backend.service

import com.soel.backend.backend.model.FacebookUser
import com.soel.backend.backend.repository.FacebookRepository
import org.springframework.stereotype.Service

@Service
class FacebookService(val facebookRepository: FacebookRepository) {

    fun getMe(accessToken: String): FacebookUser? {
        return facebookRepository.getMe(accessToken)
    }
}