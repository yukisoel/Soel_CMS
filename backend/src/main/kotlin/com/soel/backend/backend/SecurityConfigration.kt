package com.soel.backend.backend

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.slf4j.LoggerFactory
import org.slf4j.Logger

@Configuration
@EnableWebSecurity
class SecurityConfig {
    private val logger: Logger = LoggerFactory.getLogger(SecurityConfig::class.java)

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .oauth2Login {
                it.successHandler{_, response, _ ->
                    response.sendRedirect("http://localhost:5173")
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

            val filterChain = http.build()

            val filters = filterChain.filters
        logger.info("Security Filter Chain:")
        filters.forEachIndexed { index, filter ->
            logger.info("Filter $index: ${filter::class.java.name}")
        }

        return filterChain
    }
}