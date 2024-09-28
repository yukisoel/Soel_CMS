package com.soel.backend.backend.repository

import com.soel.backend.backend.model.*
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Repository
import org.springframework.web.client.RestTemplate

interface GoogleRepository {
    fun getMe(accessToken: String): GoogleMe?
    fun getAccounts(accessToken: String): GoogleAccountList?
}

@Repository
class GoogleRepositoryImpl(val restTemplate: RestTemplate):GoogleRepository {
    override fun getMe(accessToken: String): GoogleMe? {
        val url = "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses"
        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity<String>(headers)
        val response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            String::class.java
        )
        println(response.body)

        return restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            GoogleMe::class.java
        ).body
    }

    override fun getAccounts(accessToken: String): GoogleAccountList? {
        val url = "https://mybusinessaccountmanagement.googleapis.com/v1/accounts"
        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity<String>(headers)

        return restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            GoogleAccountList::class.java
        ).body
    }

    fun getAccountLocations(accessToken: String): GoogleMe? {
        val url = "https://mybusinessbusinessinformation.googleapis.com/v1/accounts/locations"
        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity<String>(headers)

        val response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            String::class.java
        )
        println(response.body)

        return restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            GoogleMe::class.java
        ).body
    }
}