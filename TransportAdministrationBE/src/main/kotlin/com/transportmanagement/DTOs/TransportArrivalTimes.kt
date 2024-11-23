package com.transportmanagement.DTOs


import kotlinx.datetime.LocalDateTime

import kotlinx.serialization.Serializable

@Serializable
data class TransportArrivalTimes (
    val destinationArrivalTime: LocalDateTime,
    val stopPointArrivalTimes: List<LocalDateTime>
)