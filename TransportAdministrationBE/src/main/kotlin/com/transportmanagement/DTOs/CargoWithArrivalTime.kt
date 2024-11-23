package com.transportmanagement.DTOs

import com.transportmanagement.model.entity.Cargo
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class CargoWithArrivalTime(
    val cargo: Cargo,
    val arrivalTime: LocalDateTime
)