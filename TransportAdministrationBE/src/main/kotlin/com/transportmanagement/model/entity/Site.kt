package com.transportmanagement.model.entity
import kotlinx.serialization.Serializable


@Serializable
data class Site(
    val id: Int?,
    val name: String,
    val lat: Double,
    val lon: Double,
    val address: String,
    val active: Boolean
)