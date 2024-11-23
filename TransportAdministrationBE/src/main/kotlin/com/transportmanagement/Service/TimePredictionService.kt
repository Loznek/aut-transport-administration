package com.transportmanagement.Service

import com.transportmanagement.DTOs.TransportArrivalTimes
import com.transportmanagement.DTOs.TransportSectionPoints
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime

class TimePredictionService {
    fun predictTime(date: LocalDateTime): LocalDateTime {
        return date.toJavaLocalDateTime().plusHours(3).toKotlinLocalDateTime()
    }

    suspend fun predictTimes(transportSectionPoint: TransportSectionPoints): TransportArrivalTimes {
        //valami okos Api hívás
        val arrivalTime = predictTime(transportSectionPoint.startTime)
        val timeList = mutableListOf<LocalDateTime>()
        return TransportArrivalTimes(arrivalTime, timeList) }

    }