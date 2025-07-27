package com.soel.backend.backend.entity

import com.soel.backend.backend.domain.converter.PrefectureConverter
import com.soel.backend.backend.domain.enum.Prefecture
import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.hibernate.annotations.Generated
import org.hibernate.generator.EventType
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "stores")
data class StoreEntity(
    @Id
    @Column(name = "store_id", updatable = false, nullable = false, insertable = false)
    @Generated(event = [ EventType.INSERT ])
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
    val createdAt: Instant = Instant.now(),

    @Convert(converter = PrefectureConverter::class)
    @Column(name = "prefecture", nullable = true)
    var prefecture: Prefecture? = null
) {
    // 引数なしのコンストラクタを追加
    constructor() : this(
        userId = UUID.randomUUID(),
        brandId = null,
        name = "dummy store",
        googleAccountId = null,
        googleLocationId = null,
        googleLinkedAt = null,
        createdAt = Instant.now(),
        prefecture = null
    )
}