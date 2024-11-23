package com.soel.backend.backend.controller

import com.soel.backend.backend.model.*
import com.soel.backend.backend.service.GoogleService
import org.springframework.core.io.Resource
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody

@RestController
@RequestMapping("/api/google")
class GoogleController(val googleService: GoogleService) {

    @GetMapping("/me")
    fun getMe(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient): GoogleMe? {
        return googleService.getMe(googleClient.accessToken.tokenValue)
    }

    @GetMapping("/accounts")
    fun getAccounts(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient): ResponseEntity<List<GoogleAccount>>? {
        return googleService.getAccounts(googleClient.accessToken.tokenValue)
    }

    @GetMapping("/account")
    fun getAccount(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient, @RequestParam("accountId") accountId: String): ResponseEntity<GoogleAccount>? {
        return googleService.getAccount(googleClient.accessToken.tokenValue, accountId)
    }

    @GetMapping("/locations")
    fun getLocations(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient, @RequestParam("accountId") accountId: String): ResponseEntity<List<GoogleLocation>>? {
        return googleService.getLocations(googleClient.accessToken.tokenValue, accountId)
    }

    @GetMapping("/location")
    fun getLocation(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient, @RequestParam("locationId") locationId: String): ResponseEntity<GoogleLocation>? {
        return googleService.getLocation(googleClient.accessToken.tokenValue, locationId)
    }

    @GetMapping("/location/profile")
    fun getLocationProfile(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient, @RequestParam("locationId") locationId: String): ResponseEntity<GoogleLocationProfileModel>? {
        return googleService.getLocationProfile(googleClient.accessToken.tokenValue, locationId)
    }

    @GetMapping("/location/photos")
    fun getLocationPhotos(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,@RequestParam("accountId") accountId: String, @RequestParam("locationId") locationId: String): ResponseEntity<List<GoogleLocationPhotoModel>>? {
        println("accountId: $accountId, locationId: $locationId")
        println(googleClient.accessToken.tokenValue)
        return googleService.getLocationPhotos(googleClient.accessToken.tokenValue, accountId, locationId)
    }

    @GetMapping("/location/photo/{filename}")
    fun getLocationPhotoLocal(@PathVariable filename: String):ResponseEntity<StreamingResponseBody>? {
        return googleService.getLocationPhotoLocal(filename)
    }

    @PostMapping("/location/photos")
    fun postLocationPhotos(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient, @RequestParam("accountId") accountId: String, @RequestParam("locationId") locationId: String, @RequestParam("files") files: List<MultipartFile>) {
        println("files: $files")
        return googleService.postLocationPhotos(googleClient.accessToken.tokenValue, accountId, locationId, files)
    }
    @PatchMapping("/location/profile")
    fun updateLocationProfile(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient, @RequestParam("locationId") locationId: String, @RequestParam("updateMask") updateMask: String, @RequestBody locationProfile: GoogleLocationProfileModel): ResponseEntity<GoogleLocationProfileModel>? {
        return googleService.updateLocationProfile(googleClient.accessToken.tokenValue, locationId, updateMask, locationProfile)
    }
    /*

        口コミ取得
    https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews

    特定の口コミ取得
    https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews/{reviewId}

    口コミに返信
    PUT
    https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews/{reviewId}/reply

    {
      comment: "Thank you for visiting our business!"
    }

    口コミの返信を削除
    DELETE
    https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews/{reviewId}/reply


    写真のリスト取得
    GET
    https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/media
    写真のアップロード(バイト)
    POST
    https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/media:startUpload

    パフォーマンスあり

    メニューの編集
    FoodMenus

    google apiからは予約は編集できない

    Q&A あり

    最新情報を追加
    POST
    https://mybusiness.googleapis.com/v4/{parent=accounts/accountId/locations/{locationId}/localPosts
   */
}
