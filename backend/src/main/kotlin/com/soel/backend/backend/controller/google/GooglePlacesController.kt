package com.soel.backend.backend.controller.google

import com.soel.backend.backend.controller.AuthHelper
import com.soel.backend.backend.model.GooglePlacesAutoCompleteRequest
import com.soel.backend.backend.model.GooglePlacesAutoCompleteResponse
import com.soel.backend.backend.service.google.GooglePlacesService
import io.swagger.v3.oas.annotations.Operation
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/google/places")
class GooglePlacesController(val authHelper: AuthHelper, val googlePlacesService: GooglePlacesService) {

    @Operation(summary = "Google Places API: 場所Idと場所名の候補リストを取得", description = "Google Places APIを使用して、場所Idと場所名の候補リストを取得します。", tags = ["Google Places: POSTメソッド"])
    @PostMapping("/autocomplete")
    fun postPlacesAutoComplete(
        httpRequest: HttpServletRequest,
        @RequestBody request: GooglePlacesAutoCompleteRequest
    ): ResponseEntity<GooglePlacesAutoCompleteResponse>? {
        val accessToken = authHelper.getGoogleAccessToken(httpRequest)
        return googlePlacesService.postPlacesAutoComplete(accessToken, request.input)
    }
}