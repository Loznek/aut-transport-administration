package com.transportmanagement.DTOs

import com.transportmanagement.model.entity.Driver
import kotlinx.datetime.LocalDateTime

data class DriverWithArrivalTime(
    val driver: Driver,
    val arrivalTime: LocalDateTime
)