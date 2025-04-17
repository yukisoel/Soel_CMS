package com.soel.backend.backend.repository

import com.soel.backend.backend.model.GooglePlacesAutoCompleteRequest
import com.soel.backend.backend.model.GooglePlacesAutoComplete
import org.springframework.context.annotation.Primary
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.stereotype.Repository
import org.springframework.web.client.RestTemplate
import org.springframework.web.util.UriComponentsBuilder

interface GooglePlacesRepository{
    fun postPlacesAutoComplete(
        accessToken: String,
        input: String
    ): GooglePlacesAutoComplete?
}

@Primary
@Repository
class GooglePlacesRepositoryImpl(val restTemplate: RestTemplate) : GooglePlacesRepository {
    override fun postPlacesAutoComplete(accessToken: String, input: String): GooglePlacesAutoComplete? {
        val requestUrl = "https://places.googleapis.com/v1/places:autocomplete"
        val uri = UriComponentsBuilder.fromHttpUrl(requestUrl)
            .build()
            .toUri()

        val headers = HttpHeaders()

        headers.apply {
            contentType = MediaType.APPLICATION_JSON
            setBearerAuth(accessToken)
        }

        val request = GooglePlacesAutoCompleteRequest(
            input = input
        )

        val entity = HttpEntity(request, headers)

        return restTemplate.postForObject(
            uri,
            entity,
            GooglePlacesAutoComplete::class.java
        )
    }
}