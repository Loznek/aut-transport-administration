package com.transportmanagement.model.entity

import kotlinx.serialization.Serializable

@Serializable
data class Transport(
    val id: Int,
    val startSiteId: Int,
    val destinationSiteId: Int,
    val truckId: Int
)