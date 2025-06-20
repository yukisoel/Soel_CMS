package com.soel.backend.backend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "stores")
data class StoreEntity(
    @Id
    @Column(name = "store_id", nullable = false)
    val storeId: UUID,

    @Column(name = "user_id", nullable = false)
    val userId: UUID,

    @Column(name = "brand_id", nullable = true)
    val brandId: UUID? = null,

    @Column(name = "name", nullable = false)
    val name: String,

    @Column(name = "google_account_id", nullable = true)
    val googleAccountId: String? = null,

    @Column(name = "google_location_id", nullable = true)
    val googleLocationId: String? = null,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now()
) {
    // 引数なしのコンストラクタを追加
    constructor() : this(
        storeId = UUID.randomUUID(),
        userId = UUID.randomUUID(),
        brandId = null,
        name = "dummy store",
        googleAccountId = null,
        googleLocationId = null,
        createdAt = Instant.now()
    )
}