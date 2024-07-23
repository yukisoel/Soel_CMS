package com.soel.backend.backend.repository

import com.soel.backend.backend.model.FacebookMe
import com.soel.backend.backend.model.FacebookMeAccounts
import com.soel.backend.backend.model.FacebookAdAccounts
import com.soel.backend.backend.model.FacebookCampaingnDetails
import com.soel.backend.backend.model.FacebookCampaingns
import org.springframework.stereotype.Repository
import org.springframework.web.client.RestTemplate

@Repository
class FacebookRepository(val restTemplate: RestTemplate) {
    fun getMe(accessToken: String): FacebookMe? {
        return restTemplate.getForObject(
            "https://graph.facebook.com/v20.0/me?fields=id,name,email&access_token=$accessToken",
            FacebookMe::class.java
        )
    }
    fun getMeAccounts(accessToken: String): FacebookMeAccounts? {
        return restTemplate.getForObject(
            "https://graph.facebook.com/v20.0/me/accounts?access_token=$accessToken",
            FacebookMeAccounts::class.java
        )
    }
    fun getAdAccounts(accessToken: String): FacebookAdAccounts? {
        return restTemplate.getForObject(
            "https://graph.facebook.com/v20.0/me/adaccounts?fields=id,name,amount_spent&access_token=$accessToken",
            FacebookAdAccounts::class.java
        )
    }


    fun getCampaingns(accessToken: String, id:String): FacebookCampaingns? {
        return restTemplate.getForObject(
            "https://graph.facebook.com/v20.0/$id/campaigns?fields=id,name&access_token=$accessToken",
            FacebookCampaingns::class.java
        )
    }

    fun getCampaingnDetails(accessToken: String, id:String): FacebookCampaingnDetails? {
        return restTemplate.getForObject(
            "https://graph.facebook.com/v20.0/$id/insights?fields=campaign_name,impressions,spend,reach,cpm&access_token=$accessToken",
            FacebookCampaingnDetails::class.java
        )
    }
}