package com.soel.backend.backend.controller.database

import com.soel.backend.backend.controller.AuthHelper
import com.soel.backend.backend.service.database.UserService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import com.soel.backend.backend.model.api.UserApiResponse
import jakarta.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/api/user")
class UserController(val authHelper: AuthHelper, val userService: UserService) {
    @Operation(
        summary = "ユーザー情報を取得",
        description = """
            ユーザーの情報を取得します。
            認証されていない場合は、status 401 Unauthorized を返します。(Bodyは UserApiResponse)
            既に登録されている場合は、status 200 OK を返します。(Bodyは UserApiResponse)
            """,
        tags = ["User: GETメソッド"]
    )
    @GetMapping("/me")
    fun getMe(request: HttpServletRequest): ResponseEntity<UserApiResponse> {
        val user = authHelper.getCognitoOidcUser(request)
        val sub = user.getClaim<String>("sub")
        val email = user.getClaim<String>("email")

        val result = userService.getMe(sub, email)
        return ResponseEntity(result.body, result.statusCode)
    }
}