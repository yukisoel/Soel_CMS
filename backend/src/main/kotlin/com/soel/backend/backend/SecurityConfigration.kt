package com.soel.backend.backend

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.HttpStatusEntryPoint
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler
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

    @Autowired
    private lateinit var authorizedClientService: OAuth2AuthorizedClientService


    @Bean
    fun securityFilterChain(http: HttpSecurity, clientRegistrationRepository: ClientRegistrationRepository): SecurityFilterChain {
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
                it.successHandler { request, response, authentication ->
                    if (authentication is OAuth2AuthenticationToken) {
                        when (authentication.authorizedClientRegistrationId) {
                            "google" -> {
                                // principal 保存
                                request.session.setAttribute("google_user", authentication.principal)

                                // OAuth2AuthorizedClient をロードして Access Token を取り出す
                                val client = authorizedClientService
                                    .loadAuthorizedClient<OAuth2AuthorizedClient>(
                                        "google",
                                        authentication.name
                                    )
                                val accessToken = client?.accessToken?.tokenValue
                                val refreshToken = client?.refreshToken?.tokenValue
                                // セッションに保存
                                request.session.setAttribute("google_access_token", accessToken)
                                request.session.setAttribute("google_refresh_token", refreshToken)
                            }
                            "cognito" -> {
                                // cognitoユーザー情報をセッションに保存
                                request.session.setAttribute("cognito_user", authentication.principal)
                            }
                        }
                    }
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
                it.anyRequest().permitAll()
            }
            .cors{it.configurationSource(corsConfigurationSource())}
            .csrf { it.disable() }

        // Cognito認証とGoogle認証チェック用のフィルターをoauth2Loginフィルターの前に追加
        http.addFilterBefore(GoogleAuthFilter(), OAuth2LoginAuthenticationFilter::class.java)

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

        configuration.allowedOrigins = listOf("http://localhost:5173", "https://cmssoel.click", "https://dev.cmssoel.click")
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
