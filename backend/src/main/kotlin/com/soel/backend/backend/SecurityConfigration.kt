package com.soel.backend.backend

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain

// @Configuration
// @EnableWebSecurity
// class SecurityConfigration {
//   @Bean
//   fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
//     http
//     .oauth2Login{ configurer ->
//       configurer
//         .loginPage("/login")
//         .defaultSuccessUrl("/")
//     }
//     .logout { customizer ->
//       customizer.logoutSuccessUrl("/login")
//     }
//     .authorizeHttpRequests { customizer ->
//       customizer
//         .requestMatchers("/css/**", "/favicon.ico").permitAll()
//         .requestMatchers("/login").permitAll()
//         .anyRequest().authenticated()
//      }
//     return http.build()
//   }
// }