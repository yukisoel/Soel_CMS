package com.soel.backend.backend

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.slf4j.LoggerFactory
import org.slf4j.Logger
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
class SecurityConfig {
    private val logger: Logger = LoggerFactory.getLogger(SecurityConfig::class.java)

    @Value("\${app.redirect.url}")
    private lateinit var redirectUrl: String


    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        println("Redirect URL: $redirectUrl")
        http
            .oauth2Login {
                it.successHandler{_, response, _ ->
                    response.sendRedirect(redirectUrl)
                }
                it.failureHandler{_, response, _ ->
                    response.sendRedirect("/error")
                }
            }
            .logout {
                it.logoutUrl("/api/logout")
                it.logoutSuccessHandler{_, response, _ ->
                    response.status = 200
                }
                it.deleteCookies("JSESSIONID")
            }
            .authorizeHttpRequests {
                it.requestMatchers("/api/**").authenticated()
                it.anyRequest().permitAll()
            }
            .cors{it.configurationSource(corsConfigurationSource())}
            .csrf { it.disable() }

            val filterChain = http.build()

            val filters = filterChain.filters
        logger.info("Security Filter Chain:")
        filters.forEachIndexed { index, filter ->
            logger.info("Filter $index: ${filter::class.java.name}")
        }

        return filterChain
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()

        configuration.allowedOrigins = listOf("http://localhost:5173")
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE")
        configuration.allowedHeaders = listOf("*")

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)

        return source
    }
}