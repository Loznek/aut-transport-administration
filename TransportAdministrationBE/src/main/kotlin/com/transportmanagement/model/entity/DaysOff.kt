package com.transportmanagement.model.entity

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class DaysOff(
    val id: Int,
    val driverId: Int,
    val startTime: LocalDateTime,
    val endTime: LocalDateTime
)