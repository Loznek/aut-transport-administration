package com.transportmanagement.model.entity

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class CargoStaying(
    val id: Int,
    val siteId: Int,
    val cargoId: Int,
    val arrivalTransportId: Int,
    val arrivalTime: LocalDateTime,
    val startTransportId: Int,
    val startTime: LocalDateTime
)