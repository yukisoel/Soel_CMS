package com.soel.backend.backend.controller.database

import com.soel.backend.backend.model.api.BrandErrorResponse
import com.soel.backend.backend.model.api.BrandListApiResponse
import com.soel.backend.backend.service.BrandService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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
    @GetMapping("/brand-list")
    fun getBrands(
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
}