import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .headers {
                it.frameOptions{
                    it.disable()
                }
            }
            .oauth2Login {
                it.loginPage("/login")
                it.successHandler{_, response, _ ->
                    response.sendRedirect("/")
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
            .csrf {
                it.disable()
            }
            .authorizeHttpRequests {
                it.requestMatchers("/api/**").authenticated()
                it.anyRequest().permitAll()
            }

        return http.build()
    }
}