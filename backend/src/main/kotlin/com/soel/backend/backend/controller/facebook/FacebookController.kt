package com.soel.backend.backend.controller.facebook

import com.soel.backend.backend.service.facebook.FacebookService
//import org.springframework.security.oauth2.client.OAuth2AuthorizedClient
//import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping

@RestController
@RequestMapping("/api/facebook")
class FacebookController(val facebookService: FacebookService) {

//  @GetMapping("/me")
//  fun getMe(@RegisteredOAuth2AuthorizedClient("facebook") facebookClient: OAuth2AuthorizedClient): FacebookMe? {
//    return facebookService.getMe(facebookClient.accessToken.tokenValue)
//  }
//
//  @GetMapping("/me/accounts")
//  fun getMeAccounts(@RegisteredOAuth2AuthorizedClient("facebook") facebookClient: OAuth2AuthorizedClient): FacebookMeAccounts? {
//    return facebookService.getMeAccounts(facebookClient.accessToken.tokenValue)
//  }
//
//  @GetMapping("/me/adaccounts")
//  fun getAdAccounts(@RegisteredOAuth2AuthorizedClient("facebook") facebookClient: OAuth2AuthorizedClient): FacebookAdAccounts? {
//    return facebookService.getAdAccounts(facebookClient.accessToken.tokenValue)
//  }
//
//  @GetMapping("/campaingns")
//  fun getCampaingns(@RegisteredOAuth2AuthorizedClient("facebook") facebookClient: OAuth2AuthorizedClient, @RequestParam id: String): FacebookCampaingns? {
//    println(id)
//    return facebookService.getCampaingns(facebookClient.accessToken.tokenValue, id)
//  }
//
//  @GetMapping("/campaingn-detail")
//  fun getCampaingnDetail(@RegisteredOAuth2AuthorizedClient("facebook") facebookClient: OAuth2AuthorizedClient, @RequestParam id: String): FacebookCampaingnDetails? {
//    println(id)
//    return facebookService.getCampaingnDetails(facebookClient.accessToken.tokenValue, id)
//  }
  
}

