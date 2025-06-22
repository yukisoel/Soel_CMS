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
    @Column(name = "store_id", updatable = false, nullable = false)
    val storeId: UUID? = null,

    @Column(name = "user_id", nullable = false)
    val userId: UUID,

    @Column(name = "brand_id", nullable = true)
    var brandId: UUID? = null,

    @Column(name = "name", nullable = false)
    var name: String,

    @Column(name = "google_account_id", nullable = true)
    var googleAccountId: String? = null,

    @Column(name = "google_location_id", nullable = true)
    var googleLocationId: String? = null,

    @Column(name = "google_linked_at", nullable = true)
    val googleLinkedAt: Instant? = null,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now()
) {
    // 引数なしのコンストラクタを追加
    constructor() : this(
        userId = UUID.randomUUID(),
        brandId = null,
        name = "dummy store",
        googleAccountId = null,
        googleLocationId = null,
        googleLinkedAt = null,
        createdAt = Instant.now()
    )
}