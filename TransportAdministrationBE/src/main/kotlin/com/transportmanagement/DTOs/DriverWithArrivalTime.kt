package com.transportmanagement.DTOs

import com.transportmanagement.model.entity.Driver
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class DriverWithArrivalTime(
    val driver: Driver,
    val arrivalTime: LocalDateTime
)