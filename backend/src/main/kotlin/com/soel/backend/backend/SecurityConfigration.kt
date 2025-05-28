package com.soel.backend.backend

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.HttpStatusEntryPoint
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler
import org.springframework.security.web.savedrequest.HttpSessionRequestCache
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.ForwardedHeaderFilter


@Configuration
@EnableWebSecurity
class SecurityConfig {
    private val logger: Logger = LoggerFactory.getLogger(SecurityConfig::class.java)

    @Value("\${app.redirect.url}")
    private lateinit var redirectUrl: String


    @Bean
    fun securityFilterChain(http: HttpSecurity, clientRegistrationRepository: ClientRegistrationRepository): SecurityFilterChain {
        // リクエストキャッシュを生成
        val requestCache = HttpSessionRequestCache()

        // ① カスタムの Resolver を作成
        val defaultResolver = DefaultOAuth2AuthorizationRequestResolver(
            clientRegistrationRepository,
            "/oauth2/authorization"
        )
        // ② 毎回ログインページが表示されるように prompt=login を追加するようにカスタマイズ
        defaultResolver.setAuthorizationRequestCustomizer { builder ->
            builder
                .additionalParameters { params ->
                    params["prompt"] = "login"
                }
        }

        http
            .oauth2Login {
                // ③ カスタム Resolver を登録
                it.authorizationEndpoint { endpoint ->
                endpoint.authorizationRequestResolver(defaultResolver)
            }
                it.successHandler{_, response, _ ->
                    response.sendRedirect(redirectUrl)
                }
                it.failureHandler{_, response, exception ->
                    logger.error("OAuth2 Login Failure", exception)
                    response.sendRedirect("/error")
                }
            }
            .exceptionHandling { exceptions ->
                exceptions
                    // /api/** で例外発生時に 401 Unauthorizedを返す
                    .defaultAuthenticationEntryPointFor(
                        HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                        AntPathRequestMatcher("/api/**")
                    )
            }
            .logout {
                it.logoutRequestMatcher(
                    AntPathRequestMatcher("/logout", "GET")
                )
                .logoutSuccessHandler(
                    SimpleUrlLogoutSuccessHandler().apply {
                        setDefaultTargetUrl("/login")
                    }
                )
                it.deleteCookies("JSESSIONID")
            }
            .authorizeHttpRequests {
                it.requestMatchers("/api/google/location/photo/**").permitAll()
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

        configuration.allowedOrigins = listOf("http://localhost:5173", "https://cmssoel.click")
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "PATCH")
        configuration.allowedHeaders = listOf("*")

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)

        return source
    }

    @Bean
    fun forwardedHeaderFilter(): ForwardedHeaderFilter {
        return ForwardedHeaderFilter()
    }
}