package com.transportmanagement.plugins.Routing

import com.transportmanagement.DTOs.TruckCreation
import com.transportmanagement.model.entity.Truck
import com.transportmanagement.model.entity.TruckStaying
import com.transportmanagement.model.repository.TruckRepository
import com.transportmanagement.model.repository.TruckStayingRepository
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime

fun Route.truckRoutes(truckRepository: TruckRepository, truckStayingRepository: TruckStayingRepository) {


    route("/trucks") {
        get("/{id}") {
            val id = call.parameters["id"]
            val truck = truckRepository.truckById(id!!.toInt())
            call.respond(truck ?: HttpStatusCode.NotFound)
        }
        get("/active-trucks") {
            val trucks = truckRepository.getAllActiveTrucks()
            call.respond(trucks)
        }
        get("/all-trucks") {
            val trucks = truckRepository.getAllTrucks()
            call.respond(trucks)
        }
        post() {
            val truckCreation = call.receive<TruckCreation>()
            val newTruckId= truckRepository.addTruck(Truck(id=null, type = truckCreation.type, licensePlate = truckCreation.licensePlate, active=true, volumeCapacity = truckCreation.volumeCapacity, weightCapacity = truckCreation.weightCapacity) )
            val staying = TruckStaying(
                id = null,
                truckId = newTruckId,
                siteId = truckCreation.startSiteId,
                startTransportId = null,
                arrivalTransportId = null,
                arrivalTime = Clock.System.now().toLocalDateTime(
                    TimeZone.currentSystemDefault()
                ),
                startTime = null
            )
            truckStayingRepository.addTruckStaying(staying)
            call.respond(HttpStatusCode.NoContent)
        }
        delete("/{id}") {
            val id = call.parameters["id"]
            truckRepository.deactivateTruckById(id!!.toInt())
            truckStayingRepository.removeActiveTruckStayingsByTruckId(id.toInt())
            call.respond(HttpStatusCode.NoContent)
        }
    }
}

