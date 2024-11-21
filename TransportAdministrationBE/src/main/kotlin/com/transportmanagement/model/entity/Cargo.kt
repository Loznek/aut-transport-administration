package com.transportmanagement.model.entity

import kotlinx.serialization.Serializable

@Serializable
data class Cargo(
    val id: Int,
    val name: String,
    val volume: Double,
    val weight: Double,
    val active: Boolean,
    val destinationStoreId: Int,
    val delivered: Boolean
)