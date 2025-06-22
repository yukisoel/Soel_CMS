package com.soel.backend.backend.controller.database

import com.soel.backend.backend.service.UserService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import com.soel.backend.backend.model.api.UserApiResponse
import com.soel.backend.backend.model.api.UserErrorResponse

@RestController
@RequestMapping("/api/user")
class UserController(val userService: UserService) {
    @Operation(
        summary = "Cognito: ユーザー情報を取得",
        description = """
            Cognitoを使用して、ユーザーの情報を取得します。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは UserErrorResponse)
            ログインユーザーの情報がまだ登録されていない場合は、ユーザー情報を登録し、status 201 Created を返します。(Bodyは UserSuccessResponse)
            既に登録されている場合は、status 200 OK を返します。(Bodyは UserSuccessResponse)
            """,
        tags = ["Cognito: ユーザー情報取得"]
    )
    @GetMapping("/me")
    fun getMe(
        @AuthenticationPrincipal oidcUser: OidcUser?,
    ): ResponseEntity<UserApiResponse> {
        // 未認証またはOIDC情報が取れなかった場合の共通レスポンス
        val unauthorized = ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body<UserApiResponse>(
                UserErrorResponse(
                    error = "UNAUTHORIZED",
                    message = "認証情報が存在しないか、有効ではありません"
                )
            )
        // そもそも認証されていない
        if (oidcUser == null) {
            return unauthorized
        }

        val sub = oidcUser.getClaim<String>("sub") ?: return ResponseEntity.badRequest().build()
        val email = oidcUser.getClaim<String>("email") ?: return ResponseEntity.badRequest().build()

        val result = userService.getMe(sub, email)
        return ResponseEntity(result.body, result.statusCode)
    }
}