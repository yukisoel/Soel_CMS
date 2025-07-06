package com.soel.backend.backend.service.facebook

import com.soel.backend.backend.model.FacebookAdAccounts
import com.soel.backend.backend.model.FacebookCampaingnDetails
import com.soel.backend.backend.model.FacebookCampaingns
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

    fun getAdAccounts(accessToken: String): FacebookAdAccounts? {
        val adAccounts = facebookRepository.getAdAccounts(accessToken)
        return adAccounts
    }

    fun getCampaingns(accessToken: String, id: String): FacebookCampaingns? {
        return facebookRepository.getCampaingns(accessToken, id)
    }

    fun getCampaingnDetails(accessToken: String, id: String): FacebookCampaingnDetails? {
        return facebookRepository.getCampaingnDetails(accessToken, id)
    }
}