package com.transportmanagement.DTOs

import kotlinx.serialization.Serializable

@Serializable
data
class CargoToTransport (
    val cargoId: Int,
    val transportId: Int
)