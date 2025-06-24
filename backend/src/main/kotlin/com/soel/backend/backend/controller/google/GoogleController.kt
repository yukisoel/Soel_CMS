package com.soel.backend.backend.controller.google

import com.soel.backend.backend.controller.AuthHelper
import com.soel.backend.backend.model.*
import com.soel.backend.backend.service.google.GoogleService
import com.soel.backend.backend.usecase.GoogleUseCase
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.StringToClassMapItem
import io.swagger.v3.oas.annotations.media.*
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody
import java.io.IOException
import javax.imageio.ImageIO
import io.swagger.v3.oas.annotations.parameters.RequestBody

@RestController
@RequestMapping("/api/google")
class GoogleController(val authHelper: AuthHelper,  val googleService: GoogleService, val googleUseCase: GoogleUseCase) {

    @Operation(summary = "Google:ログインユーザー情報の取得", description = "Google:ログインユーザー情報の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/me")
    fun getMe(
        request: HttpServletRequest
    ): ResponseEntity<GoogleMe> {
        val accessToken = authHelper.getGoogleAccessToken(request)
        val googleMe = googleService.getMe(accessToken)
        return if (googleMe == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(googleMe)
        }
    }

    @Operation(summary = "Google:アカウント一覧の取得", description = "Google:アカウント一覧の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/accounts")
    fun getAccounts(request: HttpServletRequest): ResponseEntity<List<GoogleAccount>>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getAccounts(accessToken)
    }

    @Operation(summary = "Google:アカウント情報の取得", description = "Google:アカウント情報の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/account")
    fun getAccount(request: HttpServletRequest, @RequestParam("accountId") accountId: String): ResponseEntity<GoogleAccount>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getAccount(accessToken, accountId)
    }

    @Operation(summary = "Google:カテゴリ一覧の取得", description = "Google:カテゴリ一覧の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/categories")
    fun getCategories(request: HttpServletRequest): ResponseEntity<List<GoogleLocationCategory>>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getCategories(accessToken)
    }

    @Operation(summary = "Google:店舗一覧の取得", description = "Google:店舗一覧の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/locations")
    fun getLocations(request: HttpServletRequest, @RequestParam("accountId") accountId: String): ResponseEntity<List<GoogleLocation>>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getLocations(accessToken, accountId)
    }

    @Operation(summary = "Google:店舗情報の取得", description = "Google:店舗情報の取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/location")
    fun getLocation(request: HttpServletRequest, @RequestParam("locationId") locationId: String): ResponseEntity<GoogleLocation>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getLocation(accessToken, locationId)
    }

    @Operation(summary = "Google:店舗プロフィールの取得", description = "Google:店舗プロフィールの取得を行います", tags = ["Google:GETメソッド"])
    @GetMapping("/location/profile")
    fun getLocationProfile(
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getLocationProfile(accessToken, locationId)
    }

    @Operation(summary = "Google:店舗の属性情報を全て取得", description = "Google:店舗の属性情報を全て取得します", tags = ["Google:GETメソッド"])
    @GetMapping("/location/attributes")
    fun getLocationAttributes(
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<GoogleLocationAttributesModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getLocationAttributes(accessToken, locationId)
    }

    @Operation(summary = "Google:店舗の写真を全て取得", description = "Google:店舗の写真を全て取得します", tags = ["Google:GETメソッド"])
    @GetMapping("/location/photos")
    fun getLocationPhotos(
        request: HttpServletRequest,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<List<GoogleLocationPhotoModel>>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getLocationPhotos(accessToken, accountId, locationId)
    }

    @Operation(summary = "Google:店舗の最新情報を全て取得", description = "Google:店舗の最新情報を全て取得します", tags = ["Google:GETメソッド"])
    @GetMapping("/location/local_posts")
    fun getLocationLocalPosts(
        request: HttpServletRequest,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<List<GoogleLocationLocalPostModel>>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getLocationLocalPosts(accessToken, accountId, locationId)
    }

    @Operation(summary = "Google:店舗のメニューを全て取得", description = "Google:店舗のメニューを全て取得します", tags = ["Google:GETメソッド"])
    @GetMapping("/location/food_menus")
    fun getLocationFoodMenus(
        request: HttpServletRequest,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<GoogleLocationFoodMenusModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getLocationFoodMenus(accessToken, accountId, locationId)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<List<GoogleLocationQuestion>>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getLocationQuestions(accessToken, locationId)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestParam("questionId") questionId: String
    ): ResponseEntity<List<GoogleLocationAnswer>>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getLocationAnswers(accessToken, locationId, questionId)
    }

    @Operation(
        summary = "Google:店舗のクチコミを全て取得",
        description = "Google:店舗のクチコミを全て取得します",
        tags = ["Google:GETメソッド"])
    @GetMapping("/location/reviews")
    fun getLocationReviews(
        request: HttpServletRequest,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String
    ): ResponseEntity<List<GoogleLocationReviewCustom>>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getLocationReviews(accessToken,accountId, locationId)
    }

    @Operation(
        summary = "Google:店舗のクチコミを取得",
        description = "Google:店舗のクチコミを取得します",
        tags = ["Google:GETメソッド"]
    )
    @GetMapping("/location/review")
    fun getLocationReview(
        request: HttpServletRequest,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String,
        @RequestParam("reviewId") reviewId: String
    ): ResponseEntity<GoogleLocationReviewCustom>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.getLocationReview(accessToken, accountId, locationId, reviewId)
    }

    @Operation(summary = "Google:Google API専用", description = "GoogleAPIに写真をアップロードするときに使用されます", tags = ["Google:特殊API"])
    @GetMapping("/location/photo/{filename}")
    fun getLocationPhotoLocal(@PathVariable filename: String): ResponseEntity<StreamingResponseBody>? {
        return googleService.getLocationPhotoLocal(filename)
    }

    @Operation(summary = "Google:写真を追加", description = "Google:店舗の写真を追加します", tags = ["Google:POSTメソッド"])
    @PostMapping("/location/photos", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun postLocationPhotos(
        request: HttpServletRequest,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String,
        @RequestPart("files") files: Array<MultipartFile>
    ): ResponseEntity<Any>  {
        files.forEach { file ->
            val name = file.originalFilename ?: "unknown"
            // 1) 画像ファイルか
            val contentType = file.contentType
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("ファイル '$name' は画像形式ではありません。")
            }

            // 2) サイズが 10KB 超か
            if (file.size <= 10 * 1024) {
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("ファイル '$name' のサイズが10KB未満です（${file.size} バイト）")
            }

            // 3) 画像の縦横サイズを取得して 250px 超か
            val image = try {
                ImageIO.read(file.inputStream)
            } catch (e: IOException) {
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("ファイル '$name' の読み込みに失敗しました")
            }
            if (image == null) {
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("ファイル '$name' は有効な画像ではありません。")
            }
            if (image.width <= 250 || image.height <= 250) {
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("ファイル '$name' の画像サイズが小さすぎます（${image.width}x${image.height}px） <(250px x 250px)")
            }
        }
        val accessToken = authHelper.getGoogleAccessToken(request)
        googleService.postLocationPhotos(accessToken, accountId, locationId, files)
        return ResponseEntity.ok().build()
    }

    @Operation(
        requestBody = RequestBody(
            content = [
                Content(
                    mediaType = MediaType.MULTIPART_FORM_DATA_VALUE,
                    schema = Schema(
                        type = "object",
                        properties = [
                            StringToClassMapItem(
                                key = "files",
                                value = Array<MultipartFile>::class
                            ),
                            StringToClassMapItem(
                                key = "localPost",
                                value = GoogleLocationLocalPostModel::class
                            ),
                        ]
                    ),
                    encoding = [
                        Encoding(
                            name = "localPost",
                            contentType = MediaType.APPLICATION_JSON_VALUE
                        )
                    ]
                )
            ]
        ),
        summary = "Google:最新情報を追加",
        description = """
            Google:店舗の最新情報を追加します.
            Request Bodyとして GoogleLocationLocalPostModelのJsonにしてください。
            例 : {
                "summary": "最新情報の概要",
                "callToAction": {
                    "actionType": "LEARN_MORE",
                    "url": "https://example.com"
                },
                "media": [
                    {
                        "mediaFormat": "PHOTO",
                        "sourceUrl": "https://example.com/photo.jpg"
                    }
                ]
            }
        """,
        tags = ["Google:POSTメソッド"])
    @PostMapping(
        "/location/local_post",
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    fun postLocationLocalPosts(
        request: HttpServletRequest,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String,
        @RequestPart("files") files: Array<MultipartFile>,
        @RequestPart("localPost") localPost: GoogleLocationLocalPostModel
    ) {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.postLocationLocalPost(accessToken, accountId, locationId, localPost, files)
    }

    @Operation(
        requestBody = RequestBody(
            content = [
                Content(
                    mediaType = MediaType.MULTIPART_FORM_DATA_VALUE,
                    schema = Schema(
                        type = "object",
                        properties = [
                            StringToClassMapItem(
                                key = "files",
                                value = Array<MultipartFile>::class
                            ),
                            StringToClassMapItem(
                                key = "localPost",
                                value = GoogleLocationLocalPostModel::class
                            ),
                        ]
                    ),
                    encoding = [
                        Encoding(
                            name = "localPost",
                            contentType = MediaType.APPLICATION_JSON_VALUE
                        )
                    ]
                )
            ]
        ),
        summary = "Google:最新情報を追加",
        description = """
            Google:店舗の最新情報を追加します.
            Request Bodyとして GoogleLocationLocalPostModelのJsonにしてください。
            例 : {
                "summary": "最新情報の概要",
                "callToAction": {
                    "actionType": "LEARN_MORE",
                    "url": "https://example.com"
                },
                "media": [
                    {
                        "mediaFormat": "PHOTO",
                        "sourceUrl": "https://example.com/photo.jpg"
                    }
                ]
            }
        """,
        tags = ["Google:POSTメソッド"])
    @PostMapping(
        "/location/local_post/bulk",
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    fun postBulkLocationLocalPost(
        request: HttpServletRequest,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationIdList") locationIdList: Array<String>,
        @RequestPart("files") files: Array<MultipartFile>,
        @RequestPart("localPost") localPost: GoogleLocationLocalPostModel
    ) {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.postBulkLocationLocalPost(accessToken, accountId, locationIdList, localPost, files)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody question: GoogleLocationQuestion
    ) {
        println("postLocationQuestion called")
        if (question.text == null) {
            throw IllegalArgumentException("text is required")
        }
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.postLocationQuestion(accessToken, locationId, question.text)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestParam("questionId") questionId: String,
        @RequestBody answer: GoogleLocationAnswer
    ) {
        println("postLocationAnswer called")
        if (answer.text == null) {
            throw IllegalArgumentException("text is required")
        }
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.postLocationAnswer(accessToken, locationId, questionId, answer.text)
    }

    @Operation(summary = "Google:店舗プロフィールの更新", description = "Google:店舗プロフィールを更新します", tags = ["Google:PATCHメソッド"])
    @PatchMapping("/location/profile")
    fun updateLocationProfile(
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestParam("updateMask") updateMask: String,
        @RequestBody locationProfile: GoogleLocationProfileModel
    ): ResponseEntity<GoogleLocationProfileModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
    }

    @Operation(summary = "Google:店舗のプロフィールの更新:ビジネス名", description = "Google:店舗のビジネス名を更新します", tags = ["Google:PATCHメソッド"])
    @PatchMapping("/location/profile/title")
    fun updateLocationProfileTitle(
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody title: String,
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (title.isBlank()) {
            return ResponseEntity.status(440).body(null)
        }
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateProfileTitle(accessToken, locationId, title)
    }

    @Operation(summary = "Google:店舗のプロフィールの更新:メインカテゴリ", description = "Google:店舗のメインカテゴリを更新します", tags = ["Google:PATCHメソッド"])
    @PatchMapping("/location/profile/primary_category")
    fun updateLocationProfilePrimaryCategory(
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody category: GoogleLocationCategory
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (category.name.isNullOrBlank()) {
            return ResponseEntity.status(440).body(null)
        }
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationProfilePrimaryCategory(accessToken, locationId, category)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody categoryList: List<GoogleLocationCategory>
    ): ResponseEntity<GoogleLocationProfileModel>? {
        categoryList.forEach { category ->
            if (category.name.isNullOrBlank()) {
                return ResponseEntity.status(440).body(null)
            }
        }
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationProfileAdditionalCategories(accessToken, locationId, categoryList)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody description: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (description.isBlank()) {
            return ResponseEntity.status(440).body(null)
        }
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationProfileDescription(accessToken, locationId, description)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody openingDate: GoogleLocationDate
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (openingDate.year == null || openingDate.month == null || openingDate.day == null) {
            return ResponseEntity.status(440).body(null)
        }
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationProfileOpeningDate(accessToken, locationId, openingDate)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody phoneNumber: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (phoneNumber.isBlank()) {
            return ResponseEntity.status(440).body(null)
        }
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationProfilePhoneNumber(accessToken, locationId, phoneNumber)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody websiteUri: String
    ): ResponseEntity<GoogleLocationProfileModel>? {
        if (websiteUri.isBlank()) {
            return ResponseEntity.status(440).body(null)
        }
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationProfileWebsiteUri(accessToken, locationId, websiteUri)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody placeIds: List<String>
    ): ResponseEntity<GoogleLocationProfileModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationProfileServiceArea(accessToken, locationId, placeIds)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody storeFrontAddressRequest: GoogleLocationStoreFrontAddressRequest
    ): ResponseEntity<GoogleLocationProfileModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationStoreFrontAddress(accessToken, locationId, storeFrontAddressRequest)
    }

    @Operation(
        summary = "Google:店舗のプロフィールの更新:営業時間",
        description = """
              Google:店舗の営業時間を更新します。
              Request Bodyとして GoogleLocationBusinessHoursRequestのJsonにしてください。
              通常営業時間を変更したいときはhoursTypeIdを通常営業またはREGULARにしてください。
              例 : {
                      "hoursTypeId": "REGULAR",
                      "periods": [
                        {
                          "openDay": "MONDAY",
                          "openTime": {
                            "hours": 10,
                            "minutes": 0
                          },
                          "closeDay": "MONDAY",
                          "closeTime": {
                            "hours": 20,
                            "minutes": 0
                          },
                          "openDay": "TUESDAY",
                          "openTime": {
                            "hours": 10,
                            "minutes": 0
                          },
                          "closeDay": "TUESDAY",
                          "closeTime": {
                            "hours": 20,
                            "minutes": 0
                          },
                        }
                      ]
                    }
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/profile/business_hours")
    fun updateLocationBusinessHours(
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody businessHoursRequest: GoogleLocationBusinessHoursRequest
    ): ResponseEntity<GoogleLocationProfileModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationBusinessHours(accessToken, locationId, businessHoursRequest)
    }

    @Operation(summary = "Google:店舗のメニューの更新", description = "Google:店舗のメニューを更新します", tags = ["Google:PATCHメソッド"])
    @PatchMapping("/location/food_menus")
    fun updateLocationFoodMenus(
        request: HttpServletRequest,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String,
        @RequestBody foodMenus: GoogleLocationFoodMenusModel
    ): ResponseEntity<GoogleLocationFoodMenusModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.updateLocationFoodMenus(accessToken, accountId, locationId, foodMenus)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestParam("questionId") questionId: String,
        @RequestBody question: GoogleLocationQuestion
    ): ResponseEntity<GoogleLocationQuestion>? {
        println("updateLocationQuestion called")
        if (question.text == null) {
            throw IllegalArgumentException("text is required")
        }
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.updateLocationQuestion(accessToken, locationId, questionId, question.text)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestParam("attributeMask") attributeMask: String,
        @RequestBody attributes: GoogleLocationAttributesModel
    ): ResponseEntity<GoogleLocationAttributesModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.updateLocationAttributes(accessToken, locationId, attributeMask, attributes)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody snsLinkRequest: GoogleLocationAttributeSnsLinkRequest
    ): ResponseEntity<GoogleLocationAttributesModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationAttributeSnsLink(accessToken, locationId, snsLinkRequest)
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
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody menuLink: String,
    ): ResponseEntity<GoogleLocationAttributesModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationAttributeMenuLink(accessToken, locationId, menuLink)
    }

    @Operation(
        summary = "Google:店舗のビジネスオーナー情報の更新",
        description = """
              Google:店舗のビジネスオーナー情報を更新します。
              Request BodyはBooleanにしてください。
              Bodyがnullの場合はビジネスオーナー情報を削除します。
              例 : true
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/attributes/business_owner_info")
    fun updateLocationBusinessOwnerInfo(
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody isOwnedByWomen: Boolean?,
    ): ResponseEntity<GoogleLocationAttributesModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationBusinessOwnerInfo(accessToken, locationId, isOwnedByWomen)
    }

    @Operation(
        summary = "Google:店舗のサービスの更新",
        description = """
              Google:店舗のサービスを更新します。
              Request BodyはGoogleLocationAttributeServiceの配列のJsonにしてください。
              typeはenumです。パターンとして以下の入力が可能です。
              例: SERVICE_ALCOHOL, service_alcohol, attributes/serves_alcohol, アルコール飲料あり
              valueはbooleanです。
              valueがnullの場合はサービスを削除します。
              例 :
              [
                {
                  "type": "アルコール飲料あり",
                  "value": true
                },
                {
                  "type": "SERVES_ORGANIC",
                  // valueがnullの場合はSERVES_ORGANICが削除されます。
                }
              ]
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/attributes/services")
    fun updateLocationServices(
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody services: List<GoogleLocationAttributeService>
    ): ResponseEntity<GoogleLocationAttributesModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationServices(accessToken, locationId, services)
    }

    @Operation(
        summary = "Google:店舗のサービスオプションの更新",
        description = """
              Google:店舗のサービスオプションを更新します。
              Request BodyはGoogleLocationAttributeServiceOptionの配列のJsonにしてください。
              typeはenumです。パターンとして以下の入力が可能です。
              例: HAS_SEATING_OUTDOORS, has_seating_outdoors, attributes/has_seating_outdoors, テラス席あり
              valueはbooleanです。
              valueがnullの場合はサービスを削除します。
              例 :
              [
                {
                  "type": "テラス席あり",
                  "value": true
                },
                {
                  "type": "HAS_CURBSIDE_PICKUP",
                  // valueがnullの場合はSERVES_ORGANICが削除されます。
                }
              ]
        """, tags = ["Google:PATCHメソッド"]
    )
    @PatchMapping("/location/attributes/serviceOptions")
    fun updateLocationServiceOptions(
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestBody serviceOptions: List<GoogleLocationAttributeServiceOption>
    ): ResponseEntity<GoogleLocationAttributesModel>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleUseCase.updateLocationServiceOptions(accessToken, locationId, serviceOptions)
    }

    @PatchMapping("/location/review/reply")
    @Operation(
        summary = "Google:店舗のクチコミに返信",
        description = """
              Google:店舗のクチコミに返信します。
              Request Bodyとして commentのstringにしてください。
              例 : "Thank you for your feedback!"
              """, tags = ["Google:PATCHメソッド"]
    )
    fun updateLocationReviewReply(
        request: HttpServletRequest,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String,
        @RequestParam("reviewId") reviewId: String,
        @RequestBody comment: String
    ): ResponseEntity<GoogleLocationReviewReply>? {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.updateLocationReviewReply(accessToken, accountId, locationId, reviewId, comment)
    }


    @Operation(
        summary = "Google:店舗の質問の削除",
        description = """
              Google:店舗の質問を削除します。
        """, tags = ["Google:DELETEメソッド"]
    )
    @DeleteMapping("/location/question")
    fun deleteLocationQuestion(
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestParam("questionId") questionId: String
    ) {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.deleteLocationQuestion(accessToken, locationId, questionId)
    }

    @Operation(
        summary = "Google:店舗の回答の削除",
        description = """
              Google:現在のユーザーが作成した回答を削除します。
        """, tags = ["Google:DELETEメソッド"]
    )
    @DeleteMapping("/location/answer")
    fun deleteLocationAnswer(
        request: HttpServletRequest,
        @RequestParam("locationId") locationId: String,
        @RequestParam("questionId") questionId: String
    ) {
        val accessToken = authHelper.getGoogleAccessToken(request)
        return googleService.deleteLocationAnswer(accessToken, locationId, questionId)
    }

    @Operation(
        summary = "Google:店舗のクチコミの返信を削除",
        description = """
              Google:店舗のクチコミの返信を削除します。
        """, tags = ["Google:DELETEメソッド"]
    )
    @DeleteMapping("/location/review/reply")
    fun deleteLocationReviewReply(
        request: HttpServletRequest,
        @RequestParam("accountId") accountId: String,
        @RequestParam("locationId") locationId: String,
        @RequestParam("reviewId") reviewId: String
    ): ResponseEntity<Void> {
        val accessToken = authHelper.getGoogleAccessToken(request)
        googleService.deleteLocationReviewReply(accessToken, accountId, locationId, reviewId)
        return ResponseEntity.ok().build()

    }
    /*
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
