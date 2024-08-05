package com.soel.backend.backend.controller

import com.soel.backend.backend.model.*
import com.soel.backend.backend.service.GoogleService
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.GetMapping

@RestController
@RequestMapping("/api/google")
class GoogleController(val googleService: GoogleService) {

  @GetMapping("/me")
  fun getMe(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient): GoogleMe? {
    return googleService.getMe(googleClient.accessToken.tokenValue)
  }
}

