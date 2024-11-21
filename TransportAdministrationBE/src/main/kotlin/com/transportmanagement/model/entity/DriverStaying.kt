package com.transportmanagement.model.entity

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class DriverStaying(
    val id: Int?,
    val siteId: Int,
    val driverId: Int,
    val arrivalTransportSectionId: Int,
    val arrivalTime: LocalDateTime,
    val startTransportSectionId: Int?,
    val startTime: LocalDateTime?
)