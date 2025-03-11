package com.soel.backend.backend.repository

import com.soel.backend.backend.entity.MenuLog
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MenuLogRepository : JpaRepository<MenuLog, Long>