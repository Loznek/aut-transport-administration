package com.transportmanagement.plugins.Routing

import CargoRepository
import com.transportmanagement.DTOs.CargoCreation
import com.transportmanagement.model.entity.Cargo
import com.transportmanagement.model.entity.CargoStaying
import com.transportmanagement.model.repository.CargoStayingRepository
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime

fun Route.cargoRoutes(cargoRepository: CargoRepository, cargoStayingRepository: CargoStayingRepository) {
    route("/cargos") {
        get("/{id}") {
            val id = call.parameters["id"]
            val cargo = cargoRepository.cargoById(id!!.toInt())
            call.respond(cargo ?: HttpStatusCode.NotFound)
        }
        get("/active-cargos") {
            val cargos = cargoRepository.getAllActiveCargos()
            call.respond(cargos)
        }
        get("/all-cargos") {
            val cargos = cargoRepository.getAllCargos()
            call.respond(cargos)
        }
        get("/not-delivered-cargos") {
            val cargos = cargoRepository.getNotDeliveredCargos()
            call.respond(cargos)
        }
        post() {
            val cargo = call.receive<CargoCreation>()
           val newCargoId= cargoRepository.addCargo(Cargo(id=null, name = cargo.cargoName, volume = cargo.cargoVolume, weight = cargo.cargoWeight, active = true, destinationStoreId = cargo.destinationStoreId, delivered = false))
            val staying = CargoStaying(
                id = null,
                cargoId = newCargoId,
                siteId = cargo.startSiteId,
                startTransportId = null,
                arrivalTransportId = null,
                arrivalTime = Clock.System.now().toLocalDateTime(
                    TimeZone.currentSystemDefault()
                ),
                startTime = null
            )
            cargoStayingRepository.addCargoStaying(staying)
            call.response.status(HttpStatusCode.Created)
        }
        delete("/{id}") {
            val id = call.parameters["id"]
            cargoRepository.deactivateCargoById(id!!.toInt())
            cargoStayingRepository.removeActiveCargoStayingsByCargoId(id.toInt())
            call.respond(HttpStatusCode.NoContent)
        }
    }
}