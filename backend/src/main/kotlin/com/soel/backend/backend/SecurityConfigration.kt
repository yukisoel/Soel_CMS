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
    .headers {
      it.frameOptions{
        it.disable()
      }
    }
    .oauth2Login {
      it.successHandler{_, response, _ ->
        response.sendRedirect("/api/demo/hello")
      }
      it.failureHandler{_, response, _ ->
        response.sendRedirect("http://localhost:5173")
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
      it.requestMatchers("/**").permitAll()
    }
  
  return http.build()
 }
}

@Component
public class CustomOAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // 認証成功後にリダイレクトするURLを設定
        String redirectUrl = "http://localhost:5173";
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
