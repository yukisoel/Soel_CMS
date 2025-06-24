package com.soel.backend.backend.controller.cognito

import com.soel.backend.backend.controller.AuthHelper
import io.swagger.v3.oas.annotations.Operation
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/cognito")
class CognitoController(val authHelper: AuthHelper) {
    @Operation(
        summary = "Cognito: ユーザー情報を取得",
        description = """
            Cognitoを使用して、ユーザーの情報を取得します。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは CognitoAccountErrorResponse)
            既に登録されている場合は、status 200 OK を返します。(Bodyは CognitoAccountResponse)
            """,
        tags = ["Cognito: GETメソッド"]
    )
    @GetMapping("/me")
    fun getMe(
        request: HttpServletRequest
    ): ResponseEntity<Any> {
        val user = authHelper.getCognitoOidcUser(request)
        val sub   = user.getClaim<String>("sub")
        val email = user.getClaim<String>("email")

        return ResponseEntity.ok(
            mapOf(
                "userId" to sub,
                "email" to email,
            )
        )
    }
}
