package com.soel.backend.backend.repository

import com.soel.backend.backend.model.FacebookUser
import org.springframework.stereotype.Repository
import org.springframework.web.client.RestTemplate

@Repository
class FacebookRepository(val restTemplate: RestTemplate) {
    fun getMe(accessToken: String, endpoint: String): FacebookUser? {
        return restTemplate.getForObject(
            "https://graph.facebook.com$endpoint?fields=id,name,email&access_token=$accessToken",
            FacebookUser::class.java
        )
    }
}