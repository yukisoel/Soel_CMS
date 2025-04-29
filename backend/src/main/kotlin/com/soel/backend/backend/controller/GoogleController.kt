package com.soel.backend.backend.controller

import com.soel.backend.backend.model.*
import com.soel.backend.backend.service.GoogleService
import com.soel.backend.backend.usecase.GoogleUseCase
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody

@RestController
@RequestMapping("/api/google")
class GoogleController(val googleService: GoogleService, val googleUseCase: GoogleUseCase) {

    @Operation(summary = "Google:ログインユーザー情報の取得", description = "Google:ログインユーザー情報の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/me")
    fun getMe(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient): GoogleMe? {
        return googleService.getMe(googleClient.accessToken.tokenValue)
    }

    @Operation(summary = "Google:アカウント一覧の取得", description = "Google:アカウント一覧の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/accounts")
    fun getAccounts(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient): ResponseEntity<List<GoogleAccount>>? {
        return googleService.getAccounts(googleClient.accessToken.tokenValue)
    }

    @Operation(summary = "Google:アカウント情報の取得", description = "Google:アカウント情報の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/account")
    fun getAccount(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient, @RequestParam("accountId") accountId: String): ResponseEntity<GoogleAccount>? {
        return googleService.getAccount(googleClient.accessToken.tokenValue, accountId)
    }

    @Operation(summary = "Google:カテゴリ一覧の取得", description = "Google:カテゴリ一覧の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/categories")
    fun getCategories(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient): ResponseEntity<List<GoogleLocationCategory>>? {
        return googleService.getCategories(googleClient.accessToken.tokenValue)
    }

    @Operation(summary = "Google:店舗一覧の取得", description = "Google:店舗一覧の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/locations")
    fun getLocations(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient, @RequestParam("accountId") accountId: String): ResponseEntity<List<GoogleLocation>>? {
        return googleService.getLocations(googleClient.accessToken.tokenValue, accountId)
    }

    @Operation(summary = "Google:店舗情報の取得", description = "Google:店舗情報の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/location")
    fun getLocation(@RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient, @RequestParam("locationId") locationId: String): ResponseEntity<GoogleLocation>? {
        return googleService.getLocation(googleClient.accessToken.tokenValue, locationId)
    }

    @Operation(summary = "Google:店舗プロフィールの取得", description = "Google:店舗プロフィールの取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/location/profile")
    fun getLocationProfile(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        return googleService.getLocationProfile(googleClient.accessToken.tokenValue, locationId)
    }

    @Operation(summary = "Google:店舗の属性情報を全て取得", description = "Google:店舗の属性情報を全て取得します", tags = ["Google:GETメソッド"])
    @GetMapping("/location/attributes")
    fun getLocationAttributes(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<GoogleLocationAttributesModel>? {
        return googleService.getLocationAttributes(googleClient.accessToken.tokenValue, locationId)
    }

    @Operation(summary = "Google:店舗の写真を全て取得", description = "Google:店舗の写真を全て取得します", tags = ["Google:GETメソッド"])
    @GetMapping("/location/photos")
    fun getLocationPhotos(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<List<GoogleLocationPhotoModel>>? {
        return googleService.getLocationPhotos(googleClient.accessToken.tokenValue, accountId, locationId)
    }

    @Operation(summary = "Google:店舗の最新情報を全て取得", description = "Google:店舗の最新情報を全て取得します", tags = ["Google:GETメソッド"])
    @GetMapping("/location/local_posts")
    fun getLocationLocalPosts(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<List<GoogleLocationLocalPostModel>>? {
        return googleService.getLocationLocalPosts(googleClient.accessToken.tokenValue, accountId, locationId)
    }

    @Operation(summary = "Google:店舗のメニューを全て取得", description = "Google:店舗のメニューを全て取得します", tags = ["Google:GETメソッド"])
    @GetMapping("/location/food_menus")
    fun getLocationFoodMenus(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<GoogleLocationFoodMenusModel>? {
        return googleService.getLocationFoodMenus(googleClient.accessToken.tokenValue, accountId, locationId)
    }

    @Operation(
        summary = "Google:店舗のQ&Aを全て取得",
        description = """
           Google:店舗のQ&Aを全て取得します。
           ビジネスプロフィールが無効だったり制限がかかっている場合はエラーが返ってきます。 
        """,
        tags = ["Google:GETメソッド"]
    )
    @GetMapping("/location/questions")
    fun getLocationQuestions(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<List<GoogleLocationQuestion>>? {
        return googleService.getLocationQuestions(googleClient.accessToken.tokenValue, locationId)
    }

    @Operation(
        summary = "Google:店舗のQ&Aの特定の質問に対する回答を全て取得",
        description = """
           Google:店舗のQ&Aの特定の質問に対する回答を全て取得します。
           ビジネスプロフィールが無効だったり制限がかかっている場合はエラーが返ってきます。 
        """,
        tags = ["Google:GETメソッド"]
    )
    @GetMapping("/location/answers")
    fun getLocationAnswers(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestParam("questionId") questionId: String
    ): ResponseEntity<List<GoogleLocationAnswer>>? {
        return googleService.getLocationAnswers(googleClient.accessToken.tokenValue, locationId, questionId)
    }

    @Operation(summary = "Google:Google API専用", description = "GoogleAPIに写真をアップロードするときに使用されます", tags = ["Google:特殊API"])
    @GetMapping("/location/photo/{filename}")
    fun getLocationPhotoLocal(@PathVariable filename: String): ResponseEntity<StreamingResponseBody>? {
        return googleService.getLocationPhotoLocal(filename)
    }

    @Operation(summary = "Google:写真を追加", description = "Google:店舗の写真を追加します", tags = ["Google:POSTメソッド"])
    @PostMapping("/location/photos")
    fun postLocationPhotos(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String,
        @RequestParam("files") files: List<MultipartFile>
    ) {
        return googleService.postLocationPhotos(googleClient.accessToken.tokenValue, accountId, locationId, files)
    }

    @Operation(summary = "Google:最新情報を追加", description = "Google:店舗の最新情報を追加します", tags = ["Google:POSTメソッド"])
    @PostMapping("/location/local_posts")
    fun postLocationLocalPosts(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String,
        @RequestParam("files") files: List<MultipartFile>,
        @RequestBody localPost: GoogleLocationLocalPostModel
    ) {
        return googleService.postLocationLocalPosts(googleClient.accessToken.tokenValue, accountId, locationId, localPost, files)
    }

    @Operation(
        summary = "Google:店舗のQ&Aを追加",
        description = """
              Google:店舗のQ&Aを追加します。
              Request Bodyとして textのみ入ったJsonにしてください。
              例 : {"text": "質問内容"}
     """,
        tags = ["Google:POSTメソッド"]
    )
    @PostMapping("/location/question")
    fun postLocationQuestion(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody question: GoogleLocationQuestion
    ) {
        println("postLocationQuestion called")
        if (question.text == null) {
            throw IllegalArgumentException("text is required")
        }
        return googleService.postLocationQuestion(googleClient.accessToken.tokenValue, locationId, question.text)
    }

    @Operation(
        summary = "Google:店舗のQ&Aに回答",
        description = """
              Google:店舗のQ&Aに現在のユーザー回答します。すでに回答している場合は回答内容を更新します。
              Request Bodyとして textのみ入ったJsonにしてください。
              例 : {"text": "回答内容"}
        """,
        tags = ["Google:POSTメソッド"]
    )
    @PostMapping("/location/answer")
    fun postLocationAnswer(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestParam("questionId") questionId: String,
        @RequestBody answer: GoogleLocationAnswer
    ) {
        println("postLocationAnswer called")
        if (answer.text == null) {
            throw IllegalArgumentException("text is required")
        }
        return googleService.postLocationAnswer(googleClient.accessToken.tokenValue, locationId, questionId, answer.text)
    }

    @Operation(summary = "Google:店舗プロフィールの更新", description = "Google:店舗プロフィールを更新します", tags = ["Google:PATCHメソッド"])
    @PatchMapping("/location/profile")
    fun updateLocationProfile(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestParam("updateMask") updateMask: String,
        @RequestBody locationProfile: GoogleLocationProfileModel
    ): ResponseEntity<GoogleLocationProfileModel>? {
        return googleService.updateLocationProfile(googleClient.accessToken.tokenValue, locationId, updateMask, locationProfile)
    }

    @Operation(summary = "Google:店舗のプロフィールの更新:ビジネス名", description = "Google:店舗のビジネス名を更新します", tags = ["Google:PATCHメソッド"])
    @PatchMapping("/location/profile/title")
    fun updateLocationProfileTitle(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody title: String,
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (title.isBlank()) {
            return ResponseEntity.status(440).body(null)
        }
        return googleUseCase.updateProfileTitle(googleClient.accessToken.tokenValue, locationId, title)
    }

    @Operation(summary = "Google:店舗のプロフィールの更新:メインカテゴリ", description = "Google:店舗のメインカテゴリを更新します", tags = ["Google:PATCHメソッド"])
    @PatchMapping("/location/prifle/primary_category")
    fun updateLocationProfilePrimaryCategory(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody category: GoogleLocationCategory
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (category.name.isNullOrBlank()) {
            return ResponseEntity.status(440).body(null)
        }
        return googleUseCase.updateLocationProfilePrimaryCategory(googleClient.accessToken.tokenValue, locationId, category)
    }

    @Operation(
        summary = "Google:店舗のプロフィールの更新:追加カテゴリ",
        description = """
              Google:店舗の追加カテゴリを更新します。
              Request Bodyとして nameのみ入った配列Jsonにしてください。
              例 : 
              [
                {"name": "カテゴリ名"},
                {"name": "カテゴリ名"}
              ]
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/profile/additional_categories")
    fun updateLocationProfileAdditionalCategories(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody categoryList: List<GoogleLocationCategory>
    ): ResponseEntity<GoogleLocationProfileModel>? {
        categoryList.forEach { category ->
            if (category.name.isNullOrBlank()) {
                return ResponseEntity.status(440).body(null)
            }
        }
        return googleUseCase.updateLocationProfileAdditionalCategories(googleClient.accessToken.tokenValue, locationId, categoryList)
    }

    @Operation(
        summary = "Google:店舗のプロフィールの更新:説明",
        description = """
              Google:店舗の説明を更新します。
              Request Bodyとして descriptionのStringにしてください。
              例 : これは店舗です。
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/profile/description")
    fun updateLocationProfileDescription(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody description: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (description.isBlank()) {
            return ResponseEntity.status(440).body(null)
        }
        return googleUseCase.updateLocationProfileDescription(googleClient.accessToken.tokenValue, locationId, description)
    }

    @Operation(
        summary = "Google:店舗のプロフィールの更新:オープン日",
        description = """
              Google:店舗のオープン日を更新します。
              Request Bodyとして dateのみ入ったJsonにしてください。
              例 : {"year": 2023, "month": 10, "day": 1}
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/profile/opening_date")
    fun updateLocationProfileOpeningDate(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody openingDate: GoogleLocationDate
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (openingDate.year == null || openingDate.month == null || openingDate.day == null) {
            return ResponseEntity.status(440).body(null)
        }
        return googleUseCase.updateLocationProfileOpeningDate(googleClient.accessToken.tokenValue, locationId, openingDate)
    }

    @Operation(
        summary = "Google:店舗のプロフィールの更新:電話番号",
        description = """
              Google:店舗の電話番号を更新します。
              Request Bodyとして phoneNumberのStringにしてください。
              数字に変換した時に10桁である必要があります。
              ハイフンとスペースは無視されます。
              例1 : 09012345678
              例2 : 9012345678
              例3 : 090-1234-5678
              例4 : 090 1234 5678
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/profile/phone_number")
    fun updateLocationProfilePhoneNumber(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody phoneNumber: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (phoneNumber.isBlank()) {
            return ResponseEntity.status(440).body(null)
        }
        return googleUseCase.updateLocationProfilePhoneNumber(googleClient.accessToken.tokenValue, locationId, phoneNumber)
    }

    @Operation(
        summary = "Google:店舗のプロフィールの更新:ウェブサイトURL",
        description = """
              Google:店舗のウェブサイトURLを更新します。
              Request Bodyとして websiteUriのStringにしてください。
              例 : https://example.com
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/profile/website_uri")
    fun updateLocationProfileWebsiteUri(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody websiteUri: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (websiteUri.isBlank()) {
            return ResponseEntity.status(440).body(null)
        }
        return googleUseCase.updateLocationProfileWebsiteUri(googleClient.accessToken.tokenValue, locationId, websiteUri)
    }

    @Operation(
        summary = "Google:店舗のプロフィールの更新:サービスエリア",
        description = """
              Google:店舗のサービスエリアを更新します。
              Request Bodyとして placeIdsのString配列にしてください。
              例 : ["ChIJLx1v3J2XGGAR5g4q0G7f8lE", "ChIJLx1v3J2XGGAR5g4q0G7f8lE"]
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/profile/service_area")
    fun updateLocationServiceArea(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody placeIds: List<String>
    ): ResponseEntity<GoogleLocationProfileModel>? {
        return googleUseCase.updateLocationProfileServiceArea(googleClient.accessToken.tokenValue, locationId, placeIds)
    }

    @Operation(
        summary = "Google:店舗のプロフィールの更新:店舗の住所",
        description = """
              Google:店舗のの住所を更新します。
              Request Bodyとして GoogleLocationStoreFrontAddressRequestのJsonにしてください。
              例 : {
                      "postalCode": "1234567",
                      "administrativeArea": "東京都",
                      "addressLines": [
                      "渋谷区1-50",
                      "戸島ビル303"
                      ]
                    }
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/profile/store_front_address")
    fun updateLocationStoreFrontAddress(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody storeFrontAddressRequest: GoogleLocationStoreFrontAddressRequest
    ): ResponseEntity<GoogleLocationProfileModel>? {
        return googleUseCase.updateLocationStoreFrontAddress(googleClient.accessToken.tokenValue, locationId, storeFrontAddressRequest)
    }

    @Operation(summary = "Google:店舗のメニューの更新", description = "Google:店舗のメニューを更新します", tags = ["Google:PATCHメソッド"])
    @PatchMapping("/location/food_menus")
    fun updateLocationFoodMenus(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String,
        @RequestBody foodMenus: GoogleLocationFoodMenusModel
    ): ResponseEntity<GoogleLocationFoodMenusModel>? {
        return googleService.updateLocationFoodMenus(googleClient.accessToken.tokenValue, accountId, locationId, foodMenus)
    }

    @Operation(
        summary = "Google:店舗のQ&Aの更新",
        description = """
              Google:店舗のQ&Aを更新します。
              Request Bodyとして textのみ入ったJsonにしてください。
              例 : {"text": "質問内容"}
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/question")
    fun updateLocationQuestion(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestParam("questionId") questionId: String,
        @RequestBody question: GoogleLocationQuestion
    ): ResponseEntity<GoogleLocationQuestion>? {
        println("updateLocationQuestion called")
        if (question.text == null) {
            throw IllegalArgumentException("text is required")
        }
        return googleService.updateLocationQuestion(googleClient.accessToken.tokenValue, locationId, questionId, question.text)
    }

    @Operation(
        summary = "Google:店舗の属性の更新",
        description = """
              Google:店舗の属性を更新します。
              Request:
                  Params: attributeMaskに更新する属性のカンマ区切りのリストを渡してください。
                  例: attributes/url_twitter,attributes/url_tiktok
                  Body: nameを除くattributesのJsonを渡してください。attributeMaskに含んでいない属性は無視されます。
                  例 : {
                      "attributes": [
                        {
                          "uriValues": [
                            {
                              "uri": "https://x.com/elonmuskkkkkk"
                            }
                          ], 
                          "valueType": "URL", 
                          "name": "attributes/url_twitter"
                        }, 
                        {
                          "uriValues": [
                            {
                              "uri": "https://www.tiktok.com/@takafumi_horiekkkkk"
                            }
                          ], 
                          "valueType": "URL", 
                          "name": "attributes/url_tiktok"
                        }
                      ]
                    }
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/attributes")
    fun updateLocationAttributes(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestParam("attributeMask") attributeMask: String,
        @RequestBody attributes: GoogleLocationAttributesModel
    ): ResponseEntity<GoogleLocationAttributesModel>? {
        return googleService.updateLocationAttributes(googleClient.accessToken.tokenValue, locationId, attributeMask, attributes)
    }

    @Operation(
        summary = "Google:店舗のSNSリンクの更新",
        description = """
              Google:店舗のSNSリンクを更新します。
              Request Bodyとして snsTypeとsnsUrlのStringにしてください。
              例 : {"snsType": "TWITTER", "snsUrl": "https://x.com/elonmusk"}
              snsTypeはenumで以下から選択してください。(全部大文字で指定してください)
                TWITTER, TIKTOK, INSTAGRAM, YOUTUBE, INSTAGRAM, FACEBOOK, LINKEDIN, PINTEREST
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/attributes/sns_link")
    fun updateLocationAttributeSnsLink(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody snsLinkRequest: GoogleLocationAttributeSnsLinkRequest
    ): ResponseEntity<GoogleLocationAttributesModel>? {
        return googleUseCase.updateLocationAttributeSnsLink(googleClient.accessToken.tokenValue, locationId, snsLinkRequest)
    }

    @Operation(
        summary = "Google:店舗のメニューリンクの更新",
        description = """
              Google:店舗のメニューリンクを更新します。
              Request Bodyとして menuLinkのStringにしてください。
              例 : https://example.com/
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/attributes/menu_link")
    fun updateLocationAttributeMenuLink(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestBody menuLink: String,
    ): ResponseEntity<GoogleLocationAttributesModel>? {
        return googleUseCase.updateLocationAttributeMenuLink(googleClient.accessToken.tokenValue, locationId, menuLink)
    }

    @Operation(
        summary = "Google:店舗の質問の削除",
        description = """
              Google:店舗の質問を削除します。
        """, tags = ["Google:DELETEメソッド"]
    )
    @DeleteMapping("/location/question")
    fun deleteLocationQuestion(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestParam("questionId") questionId: String
    ) {
        println("deleteLocationQuestion called")
        return googleService.deleteLocationQuestion(googleClient.accessToken.tokenValue, locationId, questionId)
    }

    @Operation(
        summary = "Google:店舗の回答の削除",
        description = """
              Google:現在のユーザーが作成した回答を削除します。
        """, tags = ["Google:DELETEメソッド"]
    )
    @DeleteMapping("/location/answer")
    fun deleteLocationAnswer(
        @RegisteredOAuth2AuthorizedClient("google") googleClient: OAuth2AuthorizedClient,
        @RequestParam("locationId") locationId: String,
        @RequestParam("questionId") questionId: String
    ) {
        println("deleteLocationAnswer called")
        return googleService.deleteLocationAnswer(googleClient.accessToken.tokenValue, locationId, questionId)
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
