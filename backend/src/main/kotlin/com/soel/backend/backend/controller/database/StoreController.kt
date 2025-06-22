package com.soel.backend.backend.controller.database

import com.soel.backend.backend.controller.AuthHelper
import com.soel.backend.backend.model.api.StoreListResponse
import com.soel.backend.backend.model.api.StoreResponse
import com.soel.backend.backend.service.database.StoreService
import io.swagger.v3.oas.annotations.Operation
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/store")
class StoreController(
    val storeService: StoreService,
    val authHelper: AuthHelper
) {
    @Operation(
        summary = "店舗情報を取得",
        description = """
            指定された店舗IDの店舗情報を取得します。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは StoreErrorResponse)
            店舗が存在しない場合は、status 404 Not Found を返します。(Bodyは StoreErrorResponse)
            """,
        tags = ["Store GETメソッド"]
    )
    @GetMapping("")
    fun getStore(
        request: HttpServletRequest,
        @RequestParam storeId: String
    ): ResponseEntity<StoreResponse> {
        authHelper.getCognitoOidcUser(request)

        val result = storeService.findStoreByStoreId(storeId)
        return ResponseEntity(result.body, result.statusCode)
    }

    @Operation(
        summary = "ユーザーが持つ店舗一覧を取得",
        description = """
            認証されたユーザーの店舗情報を取得します。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは StoreErrorResponse)
            ユーザーが持つ店舗情報が存在しない場合は、空のリストを返します。(Bodyは StoreListResponse)
            """,
        tags = ["Store GETメソッド"]
    )
    @GetMapping("/list")
    fun getStoreListByUserId(
        request: HttpServletRequest
    ): ResponseEntity<StoreListResponse> {
        val user = authHelper.getCognitoOidcUser(request)
        val sub = user.getClaim<String>("sub")

        val result = storeService.findStoresByUserId(sub)
        return ResponseEntity(result.body, result.statusCode)
    }

    @GetMapping("/list/filter/brand")
    @Operation(
        summary = "ブランドIDでフィルタリングした店舗一覧を取得",
        description = """
            ブランドIDでフィルタリングした店舗情報を取得します。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは StoreErrorResponse)
            ブランドIDが指定されていない場合は、全店舗を返します。(Bodyは StoreListResponse)
            """,
        tags = ["Store GETメソッド"]
    )
    fun getStoreListByBrandId(
        request: HttpServletRequest,
        @RequestParam brandId: String
    ): ResponseEntity<StoreListResponse> {
        authHelper.getCognitoOidcUser(request)

        val result = storeService.findStoresByBrandId(brandId)
        return ResponseEntity(result.body, result.statusCode)
    }

    @PostMapping("/create")
    @Operation(
        summary = "新しい店舗を作成",
        description = """
            認証されたユーザーの新しい店舗を作成します。
            Request Bodyには店舗名の文字列を含めます。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは StoreErrorResponse)
            店舗の作成に成功した場合は、status 201 Created を返します。(Bodyは StoreResponse)
            """,
        tags = ["Store POSTメソッド"]
    )
    fun createStore(
        request: HttpServletRequest,
        @RequestParam storeName: String,
        @RequestParam brandId: String? = null,
        @RequestParam googleAccountId: String? = null,
        @RequestParam googleLocationId: String? = null
    ): ResponseEntity<StoreResponse> {
        val user = authHelper.getCognitoOidcUser(request)
        val sub = user.getClaim<String>("sub") ?: return ResponseEntity.badRequest().build()

        val result = storeService.createStore(storeName, sub, brandId, googleAccountId, googleLocationId)
        return ResponseEntity(result.body, result.statusCode)
    }

    @PatchMapping("/name")
    @Operation(
        summary = "店舗名を更新",
        description = """
            認証されたユーザーの店舗名を更新します。
            Request Bodyには新しい店舗名の文字列を含めます。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは StoreErrorResponse)
            店舗名の更新に成功した場合は、status 200 OK を返します。(Bodyは StoreResponse)
            """,
        tags = ["Store PATCHメソッド"]
    )
    fun updateStoreName(
        request: HttpServletRequest,
        @RequestParam storeId: String,
        @RequestParam storeName: String
    ): ResponseEntity<StoreResponse> {
        authHelper.getCognitoOidcUser(request)

        val result = storeService.updateStoreName(storeId, storeName)
        return ResponseEntity(result.body, result.statusCode)
    }

    @PatchMapping("/brand")
    @Operation(
        summary = "店舗のブランドを更新",
        description = """
            認証されたユーザーの店舗のブランドを更新します。
            Request Bodyには新しいブランドIDの文字列を含めます。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは StoreErrorResponse)
            ブランドの更新に成功した場合は、status 200 OK を返します。(Bodyは StoreResponse)
            """,
        tags = ["Store PATCHメソッド"]
    )
    fun updateStoreBrand(
        request: HttpServletRequest,
        @RequestParam storeId: String,
        @RequestParam brandId: String
    ): ResponseEntity<StoreResponse> {
        authHelper.getCognitoOidcUser(request)

        val result = storeService.updateStoreBrand(storeId, brandId)
        return ResponseEntity(result.body, result.statusCode)
    }

    @PatchMapping("/google/account")
    @Operation(
        summary = "店舗のGoogleアカウントを更新",
        description = """
            認証されたユーザーの店舗のGoogleアカウントを更新します。
            Request Bodyには新しいGoogleアカウントIDの文字列を含めます。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは StoreErrorResponse)
            Googleアカウントの更新に成功した場合は、status 200 OK を返します。(Bodyは StoreResponse)
            """,
        tags = ["Store PATCHメソッド"]
    )
    fun updateStoreGoogleAccount(
        request: HttpServletRequest,
        @RequestParam storeId: String,
        @RequestParam googleAccountId: String
    ): ResponseEntity<StoreResponse> {
        authHelper.getCognitoOidcUser(request)

        val result = storeService.updateStoreGoogleAccount(storeId, googleAccountId)
        return ResponseEntity(result.body, result.statusCode)
    }

    @PatchMapping("/google/location")
    @Operation(
        summary = "店舗のGoogleロケーションを更新",
        description = """
            認証されたユーザーの店舗のGoogleロケーションを更新します。
            Request Bodyには新しいGoogleロケーションIDの文字列を含めます。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは StoreErrorResponse)
            Googleロケーションの更新に成功した場合は、status 200 OK を返します。(Bodyは StoreResponse)
            """,
        tags = ["Store PATCHメソッド"]
    )
    fun updateStoreGoogleLocation(
        request: HttpServletRequest,
        @RequestParam storeId: String,
        @RequestParam googleLocationId: String
    ): ResponseEntity<StoreResponse> {
        authHelper.getCognitoOidcUser(request)

        val result = storeService.updateStoreGoogleLocation(storeId, googleLocationId)
        return ResponseEntity(result.body, result.statusCode)
    }

    @PatchMapping("/google")
    @Operation(
        summary = "店舗のGoogleアカウントとロケーションを更新",
        description = """
            認証されたユーザーの店舗のGoogleアカウントとロケーションを同時に更新します。
            Request Bodyには新しいGoogleアカウントIDとGoogleロケーションIDの文字列を含めます。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは StoreErrorResponse)
            Googleアカウントとロケーションの更新に成功した場合は、status 200 OK を返します。(Bodyは StoreResponse)
            """,
        tags = ["Store PATCHメソッド"]
    )
    fun updateStoreGoogle(
        request: HttpServletRequest,
        @RequestParam storeId: String,
        @RequestParam googleAccountId: String,
        @RequestParam googleLocationId: String
    ): ResponseEntity<StoreResponse> {
        authHelper.getCognitoOidcUser(request)

        val result = storeService.updateStoreGoogleAccountLocation(storeId, googleAccountId, googleLocationId)
        return ResponseEntity(result.body, result.statusCode)
    }

    @DeleteMapping("/delete")
    @Operation(
        summary = "店舗を削除",
        description = """
            認証されたユーザーの店舗を削除します。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは StoreErrorResponse)
            店舗の削除に成功した場合は、status 204 No Content を返します。
            """,
        tags = ["Store DELETEメソッド"]
    )
    fun deleteStore(
        request: HttpServletRequest,
        @RequestParam storeId: String
    ): ResponseEntity<Void> {
        authHelper.getCognitoOidcUser(request)

        val result = storeService.deleteStore(storeId)
        return ResponseEntity(result.body, result.statusCode)
    }
}