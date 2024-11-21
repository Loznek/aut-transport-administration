package com.transportmanagement.model.entity;
import kotlinx.serialization.Serializable

@Serializable
data class Truck(
    val id: Int,
    val licensePlate: String,
    val type: String,
    val volumeCapacity: Double,
    val weightCapacity: Double,
    val active: Boolean
)
