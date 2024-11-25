package com.transportmanagement.DTOs

import kotlinx.serialization.Serializable


@Serializable
data class TruckCreation(
    val licensePlate: String,
    val type: String,
    val volumeCapacity: Double,
    val weightCapacity: Double,
    val startSiteId: Int
)