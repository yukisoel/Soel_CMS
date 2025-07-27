package com.soel.backend.backend

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.web.filter.OncePerRequestFilter

class GoogleAuthFilter : OncePerRequestFilter() {

    private val logger: Logger = LoggerFactory.getLogger(GoogleAuthFilter::class.java)

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {
        val uri = request.requestURI

        // ────────────────
        // まずは除外パスをチェック
        // ────────────────
        if (uri.startsWith("/api/google/location/photo/") ||
            uri.startsWith("/api/google/location/photo/bulk/")) {
            // 認証チェックせずに次へ
            filterChain.doFilter(request, response)
            return
        }

        // 1) /api/** はまず Cognito ログイン済みかを必須とする
        if (uri.startsWith("/api")) {
            val session = request.getSession(false)
            val cognitoUser = session?.getAttribute("cognito_user") as? OidcUser
            if (cognitoUser == null) {
                logger.warn("Cognito authentication required for $uri")
                response.status = HttpServletResponse.SC_UNAUTHORIZED
                response.setHeader("X-Auth-Error", "cognito_required")
                return
            }

            // 2) /api/google/** はさらに Google 連携もチェック
            if (uri.startsWith("/api/google")) {
                val googleUser = session.getAttribute("google_user") as? OidcUser
                if (googleUser == null) {
                    logger.warn("Google integration required for $uri")
                    response.status = HttpServletResponse.SC_UNAUTHORIZED
                    response.setHeader("X-Auth-Error", "google_required")
                    return
                }
            }
        }

        filterChain.doFilter(request, response)
    }
}
