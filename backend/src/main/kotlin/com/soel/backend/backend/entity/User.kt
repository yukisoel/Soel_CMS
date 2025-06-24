package com.soel.backend.backend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant
import java.util.*

@Entity
@Table(name = "users")
data class UserEntity(
    @Id
    @Column(name = "user_id", nullable = false)
    val userId: UUID,

    @Column(name = "email", nullable = false, unique = true)
    val email: String,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now()
){
    // 引数なしのコンストラクタを追加
    constructor() : this(UUID.randomUUID(), "dummy@email.com", Instant.now())
}

