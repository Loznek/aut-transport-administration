package com.transportmanagement.model.entity

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class TruckStaying(
    val id: Int,
    val siteId: Int,
    val truckId: Int,
    val arrivalTransportId: Int,
    val arrivalTime: LocalDateTime,
    val startTransportId: Int,
    val startTime: LocalDateTime
)

