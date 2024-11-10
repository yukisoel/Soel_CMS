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

    override fun getAccount(accessToken: String, accountId: String): GoogleAccount? {
        return GoogleAccount(
            "accounts/name1",
            "accountName1"
        )
    }

    override fun getLocations(accessToken: String, accountId: String, nextPageToken: String?): GoogleLocationsResponse? {
        return GoogleLocationsResponse(
            null,
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

    override fun getLocation(accessToken: String, locationId: String): GoogleLocation? {
        return GoogleLocation(
            "locations/name1",
            "locationName1"
        )
    }

    override fun getLocationProfile(accessToken: String, locationId: String): GoogleLocationProfileModel? {
        return GoogleLocationProfileModel(
            "locations/name1",
            "locationName1",
            GoogleLocationPhoneNumbers("primaryPhone1"),
            GoogleLocationCategories(
                GoogleLocationCategory("name1", "displayName1"),
                listOf(
                    GoogleLocationCategory("name2", "displayName2")
                )
            ),
//            GoogleLocationPostalAddress("postalCode1", "administrativeArea1", listOf("addressLine1")),
            "websiteUri1",
//            GoogleLocationVusinessHours(
//                listOf(
//                    GoogleLocationTimePeriod(
//                        "Monday",
//                        GoogleLocationTimeOfDay(1, 1, 1, 1),
//                        "Tuesday",
//                        GoogleLocationTimeOfDay(1, 1, 1, 1),
//                    )
//                )
//            ),
            GoogleLocationProfile("description1"),
            GoogleLocationOpenInfo("OPEN", true, GoogleLocationOpeningDate("2021", "5","1")),
        )
    }

    override fun getLocationPhotos(
        accessToken: String,
        accountId: String,
        locationId: String,
        nextPageToken: String?
    ): GoogleLocationPhotosResponse? {
        return GoogleLocationPhotosResponse(
            null,
            listOf(
                GoogleLocationPhotoModel(
                    "photoReference1",
                    "photoUri1"
                ),
                GoogleLocationPhotoModel(
                    "photoReference2",
                    "photoUri2"
                )
            )
        )
    }
}