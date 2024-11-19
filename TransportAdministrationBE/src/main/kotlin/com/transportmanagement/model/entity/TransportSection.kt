package com.transportmanagement.model.entity

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class TransportSection(
    val id: Int,
    val startSiteId: Int,
    val destinationSiteId: Int,
    val startTime: LocalDateTime,
    val arrivalTime: LocalDateTime,
    val driverId: Int,
    val transportId: Int
)