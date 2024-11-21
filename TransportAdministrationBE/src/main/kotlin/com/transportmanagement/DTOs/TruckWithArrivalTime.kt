package com.transportmanagement.DTOs

import com.transportmanagement.model.entity.Truck
import kotlinx.datetime.LocalDateTime

data class TruckWithArrivalTime(
    val truck: Truck,
    val arrivalTime: LocalDateTime
)