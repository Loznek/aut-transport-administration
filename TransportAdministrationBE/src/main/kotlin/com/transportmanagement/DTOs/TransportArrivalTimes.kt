package com.transportmanagement.DTOs

import java.time.LocalDateTime

data class TransportArrivalTimes (
    val destinationArrivalTime: LocalDateTime,
    val stopPointArrivalTimes: List<LocalDateTime>
)