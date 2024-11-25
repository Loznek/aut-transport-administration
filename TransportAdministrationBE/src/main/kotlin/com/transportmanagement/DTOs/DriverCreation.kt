package com.transportmanagement.DTOs

import kotlinx.datetime.LocalDateTime

class DriverCreation(
    val name: String,
    val dateOfBirth: LocalDateTime,
    val homeSiteId: Int,
)
