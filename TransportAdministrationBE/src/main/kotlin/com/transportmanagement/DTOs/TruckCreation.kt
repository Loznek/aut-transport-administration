package com.transportmanagement.DTOs

import com.transportmanagement.model.entity.Truck
import kotlinx.serialization.Serializable


@Serializable
data class TruckCreation(
    val truck: Truck,
    val startSiteId: Int
)