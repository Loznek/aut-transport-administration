package com.transportmanagement.model.entity

import kotlinx.serialization.Serializable

@Serializable
data class StoreStopPoint(
    val id: Int,
    val transportSectionId: Int,
    val storeId: Int,
    val orderInSection: Int
)
