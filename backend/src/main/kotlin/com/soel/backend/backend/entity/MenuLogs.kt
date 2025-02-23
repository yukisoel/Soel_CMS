package com.soel.backend.backend.entity

import io.hypersistence.utils.hibernate.type.json.JsonType
import jakarta.persistence.*
import org.hibernate.annotations.Type
import java.time.LocalDateTime

@Entity
@Table(name = "MENU_LOGS")
data class MenuLog(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long? = null,
    @Column(name = "username")
    val userName: String,
    @Column(name = "locationid")
    val locationId: String,
    @Column(name = "created_at")
    val createdAt: LocalDateTime = LocalDateTime.now(),
    @Type(JsonType::class)
    @Column(name = "menu", columnDefinition = "jsonb")
    val menu: String
){
    // 引数なしのコンストラクタを追加
    constructor() : this(null, "", "", LocalDateTime.now(), "")
}