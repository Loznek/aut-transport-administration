package com.transportmanagement.DTOs

import kotlinx.serialization.Serializable

@Serializable
data class LocationCreation (
    val name: String,
    val address: String
)