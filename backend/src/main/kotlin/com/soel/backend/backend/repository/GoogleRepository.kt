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
    fun getCategories(accessToken: String, languageCode: String, regionCode: String, view: String, nextPageToken: String?): GoogleCategoriesResponse?
    fun getLocations(accessToken: String, accountId: String, nextPageToken: String?): GoogleLocationsResponse?
    fun getLocation(accessToken: String, locationId: String): GoogleLocation?
    fun getLocationProfile(accessToken: String, locationId: String): GoogleLocationProfileModel?
    fun getLocationAttributes(accessToken: String, locationId: String): GoogleLocationAttributesModel?
    fun getLocationPhotos(accessToken: String, accountId: String, locationId: String, nextPageToken: String?): GoogleLocationPhotosResponse?
    fun getLocationLocalPosts(accessToken: String, accountId: String, locationId: String, nextPageToken: String?): GoogleLocationLocalPostsResponse?
    fun getLocationFoodMenus(accessToken: String, accountId: String, locationId: String): GoogleLocationFoodMenusModel?
    fun getLocationQuestions(accessToken: String, locationId: String, nextPageToken: String?): GoogleLocationQuestionsResponse?
    fun getLocationAnswers(accessToken: String, locationId: String, questionId: String, nextPageToken: String?): GoogleLocationAnswersResponse?
    fun getLocationReviews(accessToken: String, accountId: String, locationId: String, nextPageToken: String?): GoogleApiLocationReviewsResponse?

    fun postLocationPhoto(accessToken: String, accountId: String, locationId: String, filename: String)
    fun postLocationLocalPost(accessToken: String, accountId: String, locationId: String, localPost: GoogleLocationLocalPostModel, filenameList: List<String>)
    fun postLocationQuestion(accessToken: String, locationId: String, text: String)
    fun postLocationAnswer(accessToken: String, locationId: String, questionId: String, text: String)

    fun updateLocationProfile(accessToken: String, locationId: String, updateMask: String, locationProfile: GoogleLocationProfileModel): GoogleLocationProfileModel?
    fun updateLocationFoodMenus(accessToken: String, accountId: String, locationId: String, foodMenus: GoogleLocationFoodMenusModel): GoogleLocationFoodMenusModel?
    fun updateLocationQuestion(accessToken: String, locationId: String, questionId: String, text: String): GoogleLocationQuestion?
    fun updateLocationAttributes(accessToken: String, locationId: String, attributeMask: String, attributes: GoogleLocationAttributesModel): GoogleLocationAttributesModel?

    fun deleteLocationQuestion(accessToken: String, locationId: String, questionId: String)
    fun deleteLocationAnswer(accessToken: String, locationId: String, questionId: String)
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

    override fun getCategories(accessToken: String, languageCode: String, regionCode: String, view: String, nextPageToken: String?): GoogleCategoriesResponse? {
        val requestUrl = "https://mybusinessbusinessinformation.googleapis.com/v1/categories"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .queryParam("languageCode", languageCode)
            .queryParam("regionCode", regionCode)
            .queryParam("view", view)
            .queryParam("pageToken", nextPageToken)
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
            GoogleCategoriesResponse::class.java
        ).body
    }

    override fun getLocations(accessToken: String, accountId: String, nextPageToken: String?): GoogleLocationsResponse? {
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
                "name,title,phoneNumbers,categories,storefrontAddress,websiteUri,regularHours,moreHours,profile,openInfo,serviceArea"
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

    override fun getLocationAttributes(accessToken: String, locationId: String): GoogleLocationAttributesModel? {
        val requestUrl = "https://mybusinessbusinessinformation.googleapis.com/v1/locations/$locationId/attributes"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
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
            GoogleLocationAttributesModel::class.java
        ).body
    }

    override fun getLocationPhotos(accessToken: String, accountId: String, locationId: String, nextPageToken: String?): GoogleLocationPhotosResponse? {
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

    override fun getLocationLocalPosts(accessToken: String, accountId: String, locationId: String, nextPageToken: String?): GoogleLocationLocalPostsResponse? {
        val requestUrl = "https://mybusiness.googleapis.com/v4/accounts/$accountId/locations/$locationId/localPosts"

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
            GoogleLocationLocalPostsResponse::class.java
        ).body
    }

    override fun getLocationFoodMenus(accessToken: String, accountId: String, locationId: String, ): GoogleLocationFoodMenusModel? {
        val requestUrl = "https://mybusiness.googleapis.com/v4/accounts/$accountId/locations/$locationId/foodMenus"

        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
//            .queryParam("pageToken", nextPageToken)
//            .queryParam("pageSize", 100)
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
            GoogleLocationFoodMenusModel::class.java
        ).body
    }

    override fun getLocationQuestions(accessToken: String, locationId: String, nextPageToken: String?): GoogleLocationQuestionsResponse? {
        val requestUrl = "https://mybusinessqanda.googleapis.com/v1/locations/$locationId/questions"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .queryParam("pageToken", nextPageToken)
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
            GoogleLocationQuestionsResponse::class.java
        ).body
    }

    override fun getLocationAnswers(accessToken: String, locationId: String, questionId: String, nextPageToken: String?): GoogleLocationAnswersResponse? {
        val requestUrl = "https://mybusinessqanda.googleapis.com/v1/locations/$locationId/questions/$questionId/answers"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .queryParam("pageToken", nextPageToken)
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
            GoogleLocationAnswersResponse::class.java
        ).body
    }

    override fun getLocationReviews(accessToken: String, accountId: String, locationId: String, nextPageToken: String?): GoogleApiLocationReviewsResponse? {
        val requestUrl = "https://mybusiness.googleapis.com/v4/accounts/$accountId/locations/$locationId/reviews"
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
            GoogleApiLocationReviewsResponse::class.java
        ).body
    }

    override fun postLocationPhoto(accessToken: String, accountId: String, locationId: String, filename: String, ) {
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
            locationAssociation = GoogleLocationAssociation(category = GoogleLocationAssociationCategory.ADDITIONAL),
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

    override fun postLocationLocalPost(accessToken: String, accountId: String, locationId: String, localPost: GoogleLocationLocalPostModel, filenameList: List<String>) {
        val requestUrl = "https://mybusiness.googleapis.com/v4/accounts/$accountId/locations/$locationId/localPosts"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .build()
            .toUri()

        val mediaList = mutableListOf<GoogleLocationPhotoModel>()
        for (filename in filenameList) {
            val sourceUrl = "$baseUrl/api/google/location/photo/$filename"
            println(sourceUrl)
            mediaList.add(
                GoogleLocationPhotoModel(
                    mediaFormat = "PHOTO",
                    locationAssociation = GoogleLocationAssociation(category = GoogleLocationAssociationCategory.ADDITIONAL),
                    sourceUrl = sourceUrl
                )
            )
        }

        val headers = HttpHeaders()

        headers.apply {
            contentType = MediaType.APPLICATION_JSON
            setBearerAuth(accessToken)
        }

        val request = GoogleLocationLocalPostModel(
            languageCode = "ja",
            summary = localPost.summary,
            callToAction = localPost.callToAction,
            media = mediaList,
            topicType = localPost.topicType,
        )

        val entity = HttpEntity(request, headers)

        restTemplate.postForObject(
            uri,
            entity,
            GoogleLocationLocalPostModel::class.java
        )
    }

    override fun postLocationQuestion(accessToken: String, locationId: String, text: String) {
        val requestUrl = "https://mybusinessqanda.googleapis.com/v1/locations/$locationId/questions"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            contentType = MediaType.APPLICATION_JSON
            setBearerAuth(accessToken)
        }

        val request = GoogleLocationQuestion(
            text = text
        )

        val entity = HttpEntity(request, headers)

        restTemplate.postForObject(
            uri,
            entity,
            GoogleLocationQuestion::class.java
        )
    }

    override fun postLocationAnswer(accessToken: String, locationId: String, questionId: String, text: String) {
        val requestUrl = "https://mybusinessqanda.googleapis.com/v1/locations/$locationId/questions/$questionId/answers:upsert"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            contentType = MediaType.APPLICATION_JSON
            setBearerAuth(accessToken)
        }

        val request = GoogleLocationAnswerUpsert(
            answer = GoogleLocationAnswer(
                text = text
            )
        )

        val entity = HttpEntity(request, headers)

        restTemplate.postForObject(
            uri,
            entity,
            GoogleLocationAnswer::class.java
        )
    }

    override fun updateLocationProfile(accessToken: String, locationId: String, updateMask: String, locationProfile: GoogleLocationProfileModel): GoogleLocationProfileModel? {
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

    override fun updateLocationFoodMenus(accessToken: String, accountId: String, locationId: String, foodMenus: GoogleLocationFoodMenusModel): GoogleLocationFoodMenusModel? {
        val requestUrl = "https://mybusiness.googleapis.com/v4/accounts/$accountId/locations/$locationId/foodMenus"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity(foodMenus, headers)

        return restTemplate.patchForObject(
            uri,
            entity,
            GoogleLocationFoodMenusModel::class.java
        )
    }

    override fun updateLocationQuestion(accessToken: String, locationId: String, questionId: String, text: String): GoogleLocationQuestion? {
        val requestUrl = "https://mybusinessqanda.googleapis.com/v1/locations/$locationId/questions/$questionId?updateMask=text"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity(GoogleLocationQuestion(text = text), headers)

        return restTemplate.patchForObject(
            uri,
            entity,
            GoogleLocationQuestion::class.java
        )
    }

    override fun updateLocationAttributes(accessToken: String, locationId: String, attributeMask: String, attributes: GoogleLocationAttributesModel): GoogleLocationAttributesModel? {
        val requestUrl = "https://mybusinessbusinessinformation.googleapis.com/v1/locations/$locationId/attributes"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .queryParam("attributeMask", attributeMask)
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity(attributes, headers)

        return restTemplate.patchForObject(
            uri,
            entity,
            GoogleLocationAttributesModel::class.java
        )
    }

    override fun deleteLocationQuestion(accessToken: String, locationId: String, questionId: String) {
        val requestUrl = "https://mybusinessqanda.googleapis.com/v1/locations/$locationId/questions/$questionId"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity<String>(headers)

        restTemplate.exchange(
            uri,
            HttpMethod.DELETE,
            entity,
            String::class.java
        )
    }

    override fun deleteLocationAnswer(accessToken: String, locationId: String, questionId: String) {
        val requestUrl = "https://mybusinessqanda.googleapis.com/v1/locations/$locationId/questions/$questionId/answers:delete"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            setBearerAuth(accessToken)
        }

        val entity = HttpEntity<String>(headers)

        restTemplate.exchange(
            uri,
            HttpMethod.DELETE,
            entity,
            String::class.java
        )
    }

}
