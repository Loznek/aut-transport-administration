package com.transportmanagement.DTOs

import com.transportmanagement.model.entity.Cargo
import kotlinx.serialization.Serializable

@Serializable
data class CargoCreation (
    val cargo: Cargo,
    val startSiteId: Int,
)