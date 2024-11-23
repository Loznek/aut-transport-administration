package com.transportmanagement.DTOs

import com.transportmanagement.model.entity.StoreStopPoint
import com.transportmanagement.model.entity.TransportSection

import kotlinx.serialization.Serializable

@Serializable
data class TransportSectionInfo (
    val transportSection: TransportSection,
    val storeStops: List<StoreStopPoint>
)