package com.soel.backend.backend.controller

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.GetMapping

@RestController
@RequestMapping("/api/graph")
class GraphApiController {

  @GetMapping("/me")
  fun getMe(): MeResponse {
    //ここにinstagramのme APIを叩く処理を書く
    return MeResponse("Hello, World!")
  }
}

data class MeResponse(val message: String)