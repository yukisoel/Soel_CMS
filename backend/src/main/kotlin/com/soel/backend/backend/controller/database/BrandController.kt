package com.soel.backend.backend.controller.database

import com.soel.backend.backend.model.api.BrandApiResponse
import com.soel.backend.backend.model.api.BrandErrorResponse
import com.soel.backend.backend.model.api.BrandListApiResponse
import com.soel.backend.backend.service.BrandService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/brand")
class BrandController(val brandService: BrandService) {
    @Operation(
        summary = "ユーザーが持つブランド一覧を取得",
        description = """
            認証されたユーザーのブランド情報を取得します。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは BrandErrorResponse)
            ユーザーが持つブランド情報が存在しない場合は、空のリストを返します。(Bodyは BrandListApiResponse)
            """,
        tags = ["ブランド GETメソッド"]
    )
    @GetMapping("/list")
    fun getBrandList(
        @AuthenticationPrincipal oidcUser: OidcUser?
    ): ResponseEntity<BrandListApiResponse> {
        val unauthorized = ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body<BrandListApiResponse>(
                BrandErrorResponse(
                    error = "UNAUTHORIZED",
                    message = "認証情報が存在しないか、有効ではありません"
                )
            )
        // そもそも認証されていない
        if (oidcUser == null) {
            return unauthorized
        }

        val sub = oidcUser.getClaim<String>("sub") ?: return ResponseEntity.badRequest().build()

        val result = brandService.findBrandAllByUserId(sub)
        return ResponseEntity(result.body, result.statusCode)
    }

    @Operation(
        summary = "ブランド名を更新",
        description = """
            認証されたユーザーのブランド名を更新します。
            Request Bodyには新しいブランド名の文字列を含めます。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは BrandErrorResponse)
            ブランド名の更新に成功した場合は、status 200 OK を返します。(Bodyは BrandListApiResponse)
            """,
        tags = ["ブランド PATCHメソッド"]
    )
    @PatchMapping("/name")
    fun updateBrandName(
        @AuthenticationPrincipal oidcUser: OidcUser?,
        @RequestParam brandId: String,
        @RequestBody brandName: String
    ): ResponseEntity<BrandApiResponse> {
        val unauthorized = ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body<BrandApiResponse>(
                BrandErrorResponse(
                    error = "UNAUTHORIZED",
                    message = "認証情報が存在しないか、有効ではありません"
                )
            )
        // そもそも認証されていない
        if (oidcUser == null) {
            return unauthorized
        }

        val sub = oidcUser.getClaim<String>("sub") ?: return ResponseEntity.badRequest().build()

        val result = brandService.updateBrandName(brandId = brandId, brandName = brandName)
        return ResponseEntity(result.body, result.statusCode)
    }
}