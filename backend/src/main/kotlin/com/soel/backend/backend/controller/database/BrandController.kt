package com.soel.backend.backend.controller.database

import com.soel.backend.backend.api.exception.UnauthorizedException
import com.soel.backend.backend.model.api.BrandListResponse
import com.soel.backend.backend.model.api.BrandResponse
import com.soel.backend.backend.service.BrandService
import io.swagger.v3.oas.annotations.Operation
import jakarta.servlet.http.HttpServletRequest
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
        request: HttpServletRequest,
        @AuthenticationPrincipal oidcUser: OidcUser?
    ): ResponseEntity<BrandListResponse> {
        // そもそも認証されていない
        if (oidcUser == null) {
            throw UnauthorizedException(
                "認証情報が存在しないか、有効ではありません",
                request.requestURI
            )
        }

        val sub = oidcUser.getClaim<String>("sub") ?: return ResponseEntity.badRequest().build()

        val result = brandService.findBrandAllByUserId(sub)
        return ResponseEntity(result.body, result.statusCode)
    }

    @Operation(
        summary = "新しいブランドを作成",
        description = """
            認証されたユーザーの新しいブランドを作成します。
            Request Bodyにはブランド名の文字列を含めます。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは BrandErrorResponse)
            ブランドの作成に成功した場合は、status 201 Created を返します。(Bodyは BrandResponse)
            """,
        tags = ["ブランド POSTメソッド"]
    )
    @PostMapping("/create")
    fun createBrand(
        request: HttpServletRequest,
        @AuthenticationPrincipal oidcUser: OidcUser?,
        @RequestParam brandName: String
    ): ResponseEntity<BrandResponse> {
        // そもそも認証されていない
        if (oidcUser == null) {
            throw UnauthorizedException(
                "認証情報が存在しないか、有効ではありません",
                request.requestURI
            )
        }

        val sub = oidcUser.getClaim<String>("sub") ?: return ResponseEntity.badRequest().build()

        val result = brandService.createBrand(brandName = brandName, userId = sub)
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
        request: HttpServletRequest,
        @AuthenticationPrincipal oidcUser: OidcUser?,
        @RequestParam brandId: String,
        @RequestBody brandName: String
    ): ResponseEntity<BrandResponse> {
        // そもそも認証されていない
        if (oidcUser == null) {
            throw UnauthorizedException(
                "認証情報が存在しないか、有効ではありません",
                request.requestURI
            )
        }

        val result = brandService.updateBrandName(brandId = brandId, brandName = brandName)
        return ResponseEntity(result.body, result.statusCode)
    }
}