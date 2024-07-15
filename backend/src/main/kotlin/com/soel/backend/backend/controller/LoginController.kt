// package com.soel.backend.backend.controller

// import org.springframework.web.bind.annotation.RequestMapping
// import org.springframework.web.bind.annotation.GetMapping
// import org.springframework.stereotype.Controller
// import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter
// import org.springframework.ui.Model

// @Controller
// @RequestMapping("/login")
// class LoginController {
//     @GetMapping
//     fun login(model:Model): String {
//       println("OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI")
//       println(OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI)
//       val requestUrl: String = OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI + "/facebook"
//       model.addAttribute("requestUrl", requestUrl)
//       return "login"
//     }
// }