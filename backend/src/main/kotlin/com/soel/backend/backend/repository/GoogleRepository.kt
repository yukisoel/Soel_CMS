package com.soel.backend.backend.repository

import com.soel.backend.backend.model.*
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Primary
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.stereotype.Repository
import org.springframework.web.client.RestTemplate
import org.springframework.web.util.UriComponentsBuilder

interface GoogleRepository {
    fun getMe(accessToken: String): GoogleMe?
    fun getAccounts(accessToken: String): GoogleAccountsResponse?
    fun getAccount(accessToken: String, accountId: String): GoogleAccount?
    fun getLocations(accessToken: String, accountId: String, nextPageToken: String?): GoogleLocationsResponse?
    fun getLocation(accessToken: String, locationId: String): GoogleLocation?
    fun getLocationProfile(accessToken: String, locationId: String): GoogleLocationProfileModel?
    fun getLocationPhotos(
        accessToken: String,
        accountId: String,
        locationId: String,
        nextPageToken: String?
    ): GoogleLocationPhotosResponse?
    fun postLocationPhoto(accessToken: String, accountId: String, locationId: String, filename: String)
    fun updateLocationProfile(
        accessToken: String,
        locationId: String,
        updateMask: String,
        locationProfile: GoogleLocationProfileModel
    ): GoogleLocationProfileModel?
}

@Primary
@Repository
class GoogleRepositoryImpl(val restTemplate: RestTemplate) : GoogleRepository {
    @Value("\${app.base-url}")
    lateinit var baseUrl: String

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
            GoogleAccountsResponse::class.java
        ).body
    }

    override fun getAccount(accessToken: String, accountId: String): GoogleAccount? {
        val baseUrl = "https://mybusinessaccountmanagement.googleapis.com/v1/accounts/$accountId"

        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity<String>(headers)

        return restTemplate.exchange(
            baseUrl,
            HttpMethod.GET,
            entity,
            GoogleAccount::class.java
        ).body
    }

    override fun getLocations(
        accessToken: String,
        accountId: String,
        nextPageToken: String?
    ): GoogleLocationsResponse? {
        val requestUrl = "https://mybusinessaccountmanagement.googleapis.com/v1/accounts/$accountId/locations"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .queryParam("readMask", "name,title")
            .queryParam("pageToken", nextPageToken)
            .queryParam("pageSize", 100)
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity<String>(headers)

        return restTemplate.exchange(
            uri,
            HttpMethod.GET,
            entity,
            GoogleLocationsResponse::class.java
        ).body
    }

    override fun getLocation(accessToken: String, locationId: String): GoogleLocation? {
        val requestUrl = "https://mybusinessaccountmanagement.googleapis.com/v1/locations/$locationId"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .queryParam("readMask", "name,title")
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity<String>(headers)

        return restTemplate.exchange(
            uri,
            HttpMethod.GET,
            entity,
            GoogleLocation::class.java
        ).body
    }

    override fun getLocationProfile(accessToken: String, locationId: String): GoogleLocationProfileModel? {
        val requestUrl = "https://mybusinessaccountmanagement.googleapis.com/v1/locations/$locationId"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .queryParam(
                "readMask",
                "name,title,phoneNumbers,categories,storefrontAddress,websiteUri,regularHours,profile,openInfo,serviceArea"
            )
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity<String>(headers)

        return restTemplate.exchange(
            uri,
            HttpMethod.GET,
            entity,
            GoogleLocationProfileModel::class.java
        ).body
    }

    override fun getLocationPhotos(
        accessToken: String,
        accountId: String,
        locationId: String,
        nextPageToken: String?
    ): GoogleLocationPhotosResponse? {
        val requestUrl = "https://mybusiness.googleapis.com/v4/accounts/$accountId/locations/$locationId/media"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .queryParam("pageToken", nextPageToken)
            .queryParam("pageSize", 100)
            .build()
            .toUri()
        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity<String>(headers)

        return restTemplate.exchange(
            uri,
            HttpMethod.GET,
            entity,
            GoogleLocationPhotosResponse::class.java
        ).body
    }

    override fun postLocationPhoto(
        accessToken: String,
        accountId: String,
        locationId: String,
        filename:String,
    ) {
        val requestUrl = "https://mybusiness.googleapis.com/v4/accounts/$accountId/locations/$locationId/media"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .build()
            .toUri()


        val sourceUrl = "$baseUrl/api/google/location/photo/$filename"

        println("sourceUrl: $sourceUrl")

        val headers = HttpHeaders()


        headers.apply {
            contentType = MediaType.APPLICATION_JSON
            setBearerAuth(accessToken)
        }

        val mediaRequest = GoogleLocationPhotoModel(
            mediaFormat = "PHOTO",
            locationAssociation = GoogleLocationAssociation(category = "ADDITIONAL"),
            sourceUrl = sourceUrl
        )

        val uploadEntity = HttpEntity(mediaRequest, headers)

        println("postLocationPhoto")
        val result = restTemplate.postForObject(
            uri,
            uploadEntity,
            GoogleLocationPhotoModel::class.java
        )
    }

    override fun updateLocationProfile(
        accessToken: String,
        locationId: String,
        updateMask: String,
        locationProfile: GoogleLocationProfileModel
    ): GoogleLocationProfileModel? {
        val requestUrl = "https://mybusinessaccountmanagement.googleapis.com/v1/locations/$locationId"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .queryParam("updateMask", updateMask)
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity(locationProfile, headers)

        return restTemplate.patchForObject(
            uri,
            entity,
            GoogleLocationProfileModel::class.java
        )
    }
}
