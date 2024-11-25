package com.transportmanagement.DTOs

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
class DriverCreation(
    val name: String,
    val dateOfBirth: LocalDateTime,
    val homeSiteId: Int,
)
