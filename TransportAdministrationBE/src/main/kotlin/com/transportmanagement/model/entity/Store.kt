package com.transportmanagement.model.entity

import kotlinx.serialization.Serializable

@Serializable
data class Store(
    val id: Int?,
    val name: String,
    val address: String,
    val lat: Double,
    val lon: Double,
    val active: Boolean
)