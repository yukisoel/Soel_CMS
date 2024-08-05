package com.soel.backend.backend.repository

import com.soel.backend.backend.model.*
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Repository
import org.springframework.web.client.RestTemplate

@Repository
class GoogleRepository(val restTemplate: RestTemplate) {
    fun getMe(accessToken: String): GoogleMe? {
        val url = "https://people.googleapis.com/v1/people/me?personFields=names"
        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity<String>(headers)

        return restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            GoogleMe::class.java
        ).body
    }
}