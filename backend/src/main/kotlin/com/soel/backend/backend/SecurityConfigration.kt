import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
class SecurityConfig {

 @Bean
 fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
  http
   .cors { cors -> cors.configurationSource(corsConfigurationSource()) }
   .csrf { csrf -> csrf.disable()}
   .authorizeHttpRequests { authorize ->
    authorize
     .requestMatchers("/api/**").permitAll()
     .anyRequest().permitAll() }
   .oauth2Login{ oauth2Login ->
    oauth2Login
     .defaultSuccessUrl("http://localhost:5173")
     .failureUrl("http://localhost:5173")
   }
  return http.build()
 }

 @Bean
 fun corsConfigurationSource(): UrlBasedCorsConfigurationSource {
  val configuration = CorsConfiguration()
  configuration.allowedOrigins = listOf("http://localhost:5173")
  configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
  configuration.allowedHeaders = listOf("*")
  configuration.allowCredentials = true

  val source = UrlBasedCorsConfigurationSource()
  source.registerCorsConfiguration("/**", configuration)
  return source
 }
}
