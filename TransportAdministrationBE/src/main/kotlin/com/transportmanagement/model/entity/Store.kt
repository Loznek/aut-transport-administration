package com.transportmanagement.model.entity

import kotlinx.serialization.Serializable

@Serializable
data class Store(
    val id: Int,
    val postalCode: Int,
    val streetName: String,
    val houseNumber: String,
    val active: Boolean
)