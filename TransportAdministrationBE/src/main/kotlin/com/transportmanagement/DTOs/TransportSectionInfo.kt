package com.transportmanagement.DTOs

import com.transportmanagement.model.entity.StoreStopPoint
import com.transportmanagement.model.entity.TransportSection

class TransportSectionInfo (
    val transportSection: TransportSection,
    val driverId: Int,
    val storeStops: List<StoreStopPoint>
)