package com.transportmanagement.model.entity

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class TransportSection(
    val id: Int?,
    val startSiteId: Int,
    val destinationSiteId: Int,
    val startTime: LocalDateTime,
    var arrivalTime: LocalDateTime?,
    val driverId: Int,
    val transportId: Int
)