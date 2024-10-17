package com.soel.backend.backend.repository

import com.soel.backend.backend.model.*
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
                GoogleAccount(
                    "accounts/name1",
                    "accountName1"
                ),
                GoogleAccount(
                    "accounts/name2",
                    "accountName2"
                )
            )
        )
    }

    override fun getLocations(accessToken: String, accountId: String): GoogleLocationsResponse? {
        return GoogleLocationsResponse(
            listOf(
                GoogleLocation(
                    "locations/name1",
                    "locationName1"
                ),
                GoogleLocation(
                    "locations/name2",
                    "locationName2"
                )
            )
        )
    }
}