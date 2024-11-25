package com.transportmanagement.plugins.Routing

import com.transportmanagement.DTOs.DriverCreation
import com.transportmanagement.model.entity.Driver
import com.transportmanagement.model.entity.DriverStaying
import com.transportmanagement.model.repository.DriverRepository
import com.transportmanagement.model.repository.DriverStayingRepository
import io.ktor.http.*
import io.ktor.serialization.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime

fun Route.driverRoutes(driverRepository: DriverRepository, driverStayingRepository: DriverStayingRepository) {

    route("/drivers") {
        get("/{id}") {
            val id = call.parameters["id"]
            val driver = driverRepository.driverById(id!!.toInt())
            call.respond(driver ?: HttpStatusCode.NotFound)
        }
        get("/active-drivers") {
            val drivers = driverRepository.getAllActiveDrivers()
            call.respond(drivers)
        }
        get("/all-drivers") {
            val drivers = driverRepository.getAllDrivers()
            call.respond(drivers)
        }
        post() {
            try {
                val driver = call.receive<DriverCreation>()
                val driverId= driverRepository.addDriver(Driver(id=null, name = driver.name, dateOfBirth = driver.dateOfBirth, active = true, homeSiteId = driver.homeSiteId))
                val staying = DriverStaying(
                    id = null,
                    driverId = driverId,
                    siteId = driver.homeSiteId,
                    startTransportSectionId = null,
                    arrivalTransportSectionId = null,
                    arrivalTime = Clock.System.now().toLocalDateTime(
                        TimeZone.currentSystemDefault()
                    ),
                    startTime = null
                )
                driverStayingRepository.addDriverStaying(staying)
                call.respond(HttpStatusCode.NoContent)
            } catch (ex: IllegalStateException) {
                call.respond(HttpStatusCode.BadRequest)
            } catch (ex: JsonConvertException) {
                call.respond(HttpStatusCode.BadRequest)
            }
        }
        delete("/{id}") {
            val id = call.parameters["id"]
            driverStayingRepository.removeActiveDriverStayingsByDriverId(id!!.toInt())
            val success = driverRepository.deactivateDriver(id.toInt())
            if (success) {
                call.respond(HttpStatusCode.NoContent)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }

        }
    }
}


