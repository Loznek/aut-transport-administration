package com.transportmanagement.DTOs

import com.transportmanagement.model.entity.StoreStopPoint
import kotlinx.datetime.LocalDateTime

data class TransportSectionPoints (
    val startSiteId : Int,
    val destinationSiteId : Int,
    val startTime : LocalDateTime,
    val stopPoints : List<StoreStopPoint>
)
