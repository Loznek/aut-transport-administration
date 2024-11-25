package com.transportmanagement.DTOs

import kotlinx.serialization.Serializable

@Serializable
data class CargoCreation (

    val startSiteId: Int,
    val destinationStoreId: Int,
    val cargoName: String,
    val cargoWeight: Double,
    val cargoVolume: Double,

)