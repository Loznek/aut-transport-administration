package com.transportmanagement.model.entity

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class Transport(
    val id: Int?,
    val startSiteId: Int,
    val destinationSiteId: Int,
    val arrivalTime: LocalDateTime?,
    val startTime: LocalDateTime?,
    val truckId: Int
)