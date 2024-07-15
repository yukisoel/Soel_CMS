package com.soel.backend.backend.controller

import com.soel.backend.backend.model.FacebookUser
import com.soel.backend.backend.service.FacebookService
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@RestController
@RequestMapping("/api/facebook")
class FacebookController(val facebookService: FacebookService) {

  @GetMapping("/")
  fun getMe(@RegisteredOAuth2AuthorizedClient("facebook") facebookClient: OAuth2AuthorizedClient, @RequestParam endpoint: String): FacebookUser? {
    return facebookService.getMe(facebookClient.accessToken.tokenValue, endpoint)
  }
}

