package com.soel.backend.backend.controller

import com.soel.backend.backend.api.exception.UnauthorizedException
import jakarta.servlet.http.HttpServletRequest
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.stereotype.Component

@Component
class AuthHelper {
    private val logger: Logger = LoggerFactory.getLogger(AuthHelper::class.java)

    fun getCognitoOidcUser(request: HttpServletRequest): OidcUser {
        val user = request.session.getAttribute("cognito_user") as? OidcUser
            ?: throw UnauthorizedException("Cognito認証ができませんでした。ログインしてください。", request.requestURI)
        val sub = user.getClaim<String>("sub")
        val email = user.getClaim<String>("email")
        if (sub.isNullOrBlank() || email.isNullOrBlank()) {
            throw UnauthorizedException("ユーザー情報が不完全です。再度ログインしてください。", request.requestURI)
        }
        return user
    }

    fun getGoogleOidcUser(request: HttpServletRequest): OidcUser {
        val user = request.session.getAttribute("google_user") as? OidcUser
            ?: throw UnauthorizedException("Google認証ができませんでした。ログインしてください。", request.requestURI)
        val sub = user.getClaim<String>("sub")
        if (sub.isNullOrBlank()) {
            throw UnauthorizedException("Googleユーザー情報が不完全です。再度ログインしてください。", request.requestURI)
        }
        return user
    }

    fun getGoogleAccessToken(request: HttpServletRequest): String {
        val accessToken = request.session.getAttribute("google_access_token") as? String
            ?: throw UnauthorizedException("Google認証ができませんでした。ログインしてください。", request.requestURI)

        return accessToken
    }
}