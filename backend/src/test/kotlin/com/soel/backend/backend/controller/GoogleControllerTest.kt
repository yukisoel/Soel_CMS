//package com.soel.backend.backend.controller
//
//import com.soel.backend.backend.double.service.SpyGoogleService
//import com.soel.backend.backend.service.GoogleService
//import io.mockk.mockk
//import org.junit.jupiter.api.Nested
//import org.junit.jupiter.api.Test
//import org.springframework.security.oauth2.client.OAuth2AuthorizedClient
//import org.springframework.security.oauth2.client.registration.ClientRegistration
//import org.springframework.security.oauth2.client.web.reactive.function.client.ServerOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient
//import org.springframework.security.oauth2.core.OAuth2AccessToken
//import org.springframework.test.web.servlet.MockMvc
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
//import org.springframework.test.web.servlet.setup.MockMvcBuilders
//import kotlin.test.assertEquals
//
//class GoogleControllerTest {
//    private val dummyAccessToken = OAuth2AccessToken(
//        OAuth2AccessToken.TokenType.BEARER,
//        "dummy",
//        null,
//        null
//    )
//    private val dummyOauth2Client:OAuth2AuthorizedClient = OAuth2AuthorizedClient(
//        mockk<ClientRegistration>(),
//        "dummy",
//        dummyAccessToken
//    )
//
//    private lateinit var mockMvc: MockMvc
//
//    private fun setupMockMvc(mockService:GoogleService) {
//        mockMvc = MockMvcBuilders.standaloneSetup(GoogleController(mockService)).build()
//    }
//
//    @Nested
//    inner class accounts {
//        @Nested
//        inner class GET {
//            @Test
//            fun `GoogleServiceのgetAccountsを呼んでいる`() {
//                val spyGoogleService = SpyGoogleService()
//                setupMockMvc(spyGoogleService)
//                val dummyAccessToken = "dummy"
//
//                mockMvc.perform(get("/api/google/accounts")
//                    .with()
//                )
//
//                assertEquals(true, spyGoogleService.getAccounts_isCalled)
//            }
//        }
//
//    }
//}