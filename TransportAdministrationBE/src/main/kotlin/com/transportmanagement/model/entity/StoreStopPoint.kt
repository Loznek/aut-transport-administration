package com.transportmanagement.model.entity

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class StoreStopPoint(
    val id: Int?,
    val transportSectionId: Int?,
    val arrivalTime: LocalDateTime?,
    val storeId: Int,
    val orderInSection: Int
)
