package com.soel.backend.backend.controller

import com.soel.backend.backend.api.exception.UnauthorizedException
import jakarta.servlet.http.HttpServletRequest
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.stereotype.Component

@Component
class AuthHelper(val authorizedClientService: OAuth2AuthorizedClientService) {
    fun getCognitoAuthenticatedUser(request: HttpServletRequest): OidcUser {
        val user = request.session.getAttribute("cognito_user") as? OidcUser
            ?: throw UnauthorizedException("認証ができませんでした。ログインしてください。", request.requestURI)
        val sub = user.getClaim<String>("sub")
        val email = user.getClaim<String>("email")
        if (sub.isNullOrBlank() || email.isNullOrBlank()) {
            throw UnauthorizedException("ユーザー情報が不完全です。再度ログインしてください。", request.requestURI)
        }
        return user
    }
}