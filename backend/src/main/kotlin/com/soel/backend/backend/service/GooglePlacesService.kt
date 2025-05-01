package com.soel.backend.backend.service

import com.soel.backend.backend.SecurityConfig
import com.soel.backend.backend.model.GooglePlacesAutoComplete
import com.soel.backend.backend.model.GooglePlacesAutoCompletePlaceSet
import com.soel.backend.backend.model.GooglePlacesAutoCompleteResponse
import com.soel.backend.backend.repository.GooglePlacesRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

interface GooglePlacesService {
    fun postPlacesAutoComplete(accessToken: String, input: String): ResponseEntity<GooglePlacesAutoCompleteResponse>?
}

@Service
class GooglePlacesServiceImpl(
    private val googlePlacesRepository: GooglePlacesRepository
) : GooglePlacesService {
    private val logger : Logger = LoggerFactory.getLogger(SecurityConfig::class.java)
    override fun postPlacesAutoComplete(accessToken: String,input: String): ResponseEntity<GooglePlacesAutoCompleteResponse>? {
        try {
            val result = googlePlacesRepository.postPlacesAutoComplete(accessToken, input)
            if (result !== null && result.suggestions !== null) {
                val placeSetList = result.suggestions.map {
                    GooglePlacesAutoCompletePlaceSet(
                        placeId = it.placePrediction?.placeId,
                        text = it.placePrediction?.structuredFormat?.mainText?.text
                    )
                }
                return ResponseEntity.ok(GooglePlacesAutoCompleteResponse(placeSetList))
            } else {
                return ResponseEntity.ok(GooglePlacesAutoCompleteResponse(placeSetList = listOf()))
            }
        } catch (e: Exception) {
            logger.error("Error occurred while calling Google Places API: ${e.message}", e)
            return ResponseEntity.badRequest().body(null)
        }
    }
}