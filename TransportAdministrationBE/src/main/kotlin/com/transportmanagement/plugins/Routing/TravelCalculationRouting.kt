package com.transportmanagement.plugins.Routing

import com.transportmanagement.DTOs.TransportSectionPoints
import com.transportmanagement.Service.TimePredictionService
import com.transportmanagement.model.repository.SiteRepository
import com.transportmanagement.model.repository.StoreRepository
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime

fun Route.travelCalculationRoutes(siteRepository: SiteRepository, storeRepository: StoreRepository) {
    route("/calculate-travel-time") {
        post() {
            val trans = call.receive<TransportSectionPoints>()
            val timeList = TimePredictionService(
                siteRepository,
                storeRepository
            ).predictTimes(TransportSectionPoints(
                trans.startSiteId,
                trans.destinationSiteId,
                trans.startTime,
                trans.stopPoints
            ))

            call.respond( trans.startTime.toJavaLocalDateTime().plusSeconds(timeList.sum().toLong()).toKotlinLocalDateTime())
        }
    }
}