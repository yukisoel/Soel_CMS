package com.soel.backend.backend.entity

import jakarta.persistence.*
import java.time.Instant
import java.util.*

@Entity
@Table(name = "brands")
data class BrandEntity(
    @Id
    @Column(name = "brand_id", updatable = false, nullable = false)
    val brandId: UUID = UUID.randomUUID(),

    @Column(name = "user_id", nullable = false)
    val userId: UUID,

    @Column(name = "name", nullable = false)
    val name: String,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),
){
    // 引数なしのコンストラクタを追加
    constructor() : this(UUID.randomUUID(), UUID.randomUUID(), "dummy brand", Instant.now())
}
