package com.soel.backend.backend.controller.cognito

import com.soel.backend.backend.api.exception.UnauthorizedException
import com.soel.backend.backend.service.google.GoogleService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/cognito/google")
class CognitoGoogleController(val googleService: GoogleService) {

    fun getGoogleToken(oidc: OidcUser): String? {
        return oidc.getClaim("custom:ggle_access_token") as String?
    }

    @GetMapping("/me")
    fun getMe(
        @AuthenticationPrincipal oidc: OidcUser,
        request: HttpServletRequest
    ): ResponseEntity<Any> {
        val googleToken = getGoogleToken(oidc)
            ?: throw UnauthorizedException("Google のアクセストークンが取得できていません", request.requestURI)

        val me = googleService.getMe(googleToken)

        return ResponseEntity.status(HttpStatus.OK).body(me)
    }
}