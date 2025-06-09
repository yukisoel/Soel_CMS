package com.soel.backend.backend.controller.cognito

import com.soel.backend.backend.entity.UserEntity
import com.soel.backend.backend.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.Instant
import java.util.UUID

@RestController
@RequestMapping("/api/cognito/user")
class UserController(val userService: UserService) {
    @PostMapping("/upsert")
    fun upsertUser(
        @AuthenticationPrincipal oidcUser: OidcUser,
    ): ResponseEntity<UserEntity> {
        val sub = oidcUser.getClaim<String>("sub")
        val email = oidcUser.getClaim<String>("email")
        if (sub == null || email == null) {
            return ResponseEntity.badRequest().build()
        }
        val user = userService.upsertUser(sub, email)
        return ResponseEntity.ok(user)
    }
}