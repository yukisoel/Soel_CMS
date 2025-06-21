package com.soel.backend.backend.controller.cognito

import com.soel.backend.backend.model.api.CognitoAccountErrorResponse
import com.soel.backend.backend.model.api.CognitoAccountResponse
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/cognito")
class CognitoController {
    @Operation(
        summary = "Cognito: ユーザー情報を取得",
        description = """
            Cognitoを使用して、ユーザーの情報を取得します。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは CognitoAccountErrorResponse)
            既に登録されている場合は、status 200 OK を返します。(Bodyは CognitoAccountResponse)
            """,
        tags = ["Cognito: ユーザー情報取得"]
    )
    @GetMapping("/me")
    fun getMe(
        @AuthenticationPrincipal oidcUser: OidcUser?,
    ): ResponseEntity<Any> {

        // 未認証またはOIDC情報が取れなかった場合の共通レスポンス
        val unauthorized = ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body<Any>(
                CognitoAccountErrorResponse(
                    error   = "UNAUTHORIZED",
                    message = "認証情報が存在しないか、有効ではありません"
                )
            )

        // そもそも認証されていない
        if (oidcUser == null) {
            return unauthorized
        }

        // Claim から sub/email を取得
        val sub   = oidcUser.getClaim<String>("sub")
        val email = oidcUser.getClaim<String>("email")

        // 必須情報がない
        if (sub.isNullOrBlank() || email.isNullOrBlank()) {
            return unauthorized
        }

        // 正常レスポンス
        return ResponseEntity.ok(
            CognitoAccountResponse(
                userId = sub,
                email  = email
            )
        )
    }
}