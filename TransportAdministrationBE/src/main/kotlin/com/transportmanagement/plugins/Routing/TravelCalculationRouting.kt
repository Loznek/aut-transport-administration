package com.transportmanagement.plugins.Routing

import com.transportmanagement.DTOs.TransportSectionPoints
import com.transportmanagement.Service.TimePredictionService
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.travelCalculationRoutes() {
    route("/calculate-travel-time") {
        post() {
            val transportSectionPoint = call.receive<TransportSectionPoints>()
            val travelTimes = TimePredictionService().predictTimes(transportSectionPoint)
            call.respond(travelTimes)
        }
    }
}