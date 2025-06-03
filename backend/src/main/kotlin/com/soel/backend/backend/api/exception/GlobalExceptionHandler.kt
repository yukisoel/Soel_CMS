package com.soel.backend.backend.api.exception

import com.soel.backend.backend.api.dto.ErrorResponse
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnauthorizedException::class)
    fun handleUnauthorized(e: UnauthorizedException): ErrorResponse {
        return ErrorResponse(
            status  = HttpStatus.UNAUTHORIZED.value(),
            error   = HttpStatus.UNAUTHORIZED.reasonPhrase,
            message = e.message ?: "Unauthorized",
            path    = e.path
        )
    }
}