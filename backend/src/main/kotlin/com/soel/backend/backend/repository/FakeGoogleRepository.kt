package com.soel.backend.backend.repository

import com.soel.backend.backend.model.GoogleAccount
import com.soel.backend.backend.model.GoogleAccountResponse
import com.soel.backend.backend.model.GoogleAccountsResponse
import com.soel.backend.backend.model.GoogleMe
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Repository
import org.springframework.web.client.RestTemplate

//@Primary
@Repository
class FakeGoogleRepository(private val restTemplate: RestTemplate) :GoogleRepository {
    override fun getMe(accessToken: String): GoogleMe? {
        val url = "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses"
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

    override fun getAccounts(accessToken: String): GoogleAccountsResponse? {
        return GoogleAccountsResponse(
            listOf(
                GoogleAccountResponse(
                    "accounts/name1",
                    "accountName1"
                ),
                GoogleAccountResponse(
                    "accounts/name2",
                    "accountName2"
                )
            )
        )
    }
}