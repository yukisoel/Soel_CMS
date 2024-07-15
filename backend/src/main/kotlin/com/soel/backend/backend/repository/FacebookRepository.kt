package com.soel.backend.backend.repository

import com.soel.backend.backend.model.FacebookMe
import com.soel.backend.backend.model.FacebookMeAccounts
import org.springframework.stereotype.Repository
import org.springframework.web.client.RestTemplate

@Repository
class FacebookRepository(val restTemplate: RestTemplate) {
    fun getMe(accessToken: String): FacebookMe? {
        return restTemplate.getForObject(
            "https://graph.facebook.com/me?fields=id,name,email&access_token=$accessToken",
            FacebookMe::class.java
        )
    }
    fun getMeAccounts(accessToken: String): FacebookMeAccounts? {
        return restTemplate.getForObject(
            "https://graph.facebook.com/me/accounts?access_token=$accessToken",
            FacebookMeAccounts::class.java
        )
    }
}