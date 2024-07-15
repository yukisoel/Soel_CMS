package com.soel.backend.backend.controller

import com.soel.backend.backend.model.FacebookMe
import com.soel.backend.backend.model.FacebookMeAccounts
import com.soel.backend.backend.service.FacebookService
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.GetMapping

@RestController
@RequestMapping("/api/facebook")
class FacebookController(val facebookService: FacebookService) {

  @GetMapping("/me")
  fun getMe(@RegisteredOAuth2AuthorizedClient("facebook") facebookClient: OAuth2AuthorizedClient): FacebookMe? {
    return facebookService.getMe(facebookClient.accessToken.tokenValue)
  }

  @GetMapping("/me/accounts")
  fun getMeAccounts(@RegisteredOAuth2AuthorizedClient("facebook") facebookClient: OAuth2AuthorizedClient): FacebookMeAccounts? {
    return facebookService.getMeAccounts(facebookClient.accessToken.tokenValue)
  }
  
}

