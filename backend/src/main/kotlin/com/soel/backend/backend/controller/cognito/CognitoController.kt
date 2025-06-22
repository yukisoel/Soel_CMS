package com.soel.backend.backend.controller.cognito

import com.soel.backend.backend.model.api.CognitoAccountErrorResponse
import io.swagger.v3.oas.annotations.Operation
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
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
        request: HttpServletRequest
    ): ResponseEntity<Any> {

        // セッションに保存されたcognitoユーザー情報を優先的に利用
        val user = request.session.getAttribute("cognito_user") as? OidcUser

        // 未認証またはユーザー情報が存在しない場合の共通レスポンス
        val unauthorized = ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body<Any>(
                CognitoAccountErrorResponse(
                    error   = "UNAUTHORIZED",
                    message = "認証情報が存在しないか、有効ではありません"
                )
            )

        if (user == null) {
            return unauthorized
        }

        // Claim から sub/email を取得
        val sub   = user.getClaim<String>("sub")
        val email = user.getClaim<String>("email")

        if (sub.isNullOrBlank() || email.isNullOrBlank()) {
            return unauthorized
        }

        // 両方の情報を含めたレスポンスを生成
        return ResponseEntity.ok(
            mapOf(
                "userId" to sub,
                "email" to email,
            )
        )
    }
}
