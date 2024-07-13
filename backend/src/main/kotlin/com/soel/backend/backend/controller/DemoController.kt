package com.soel.backend.backend.controller

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.GetMapping

@RestController
@RequestMapping("/api/demo")
class DemoControlle {

  @GetMapping("/hello")
  fun hello ():HelloResponse {
    return HelloResponse("Hello, World!")
  }
}

data class HelloResponse(val message: String)