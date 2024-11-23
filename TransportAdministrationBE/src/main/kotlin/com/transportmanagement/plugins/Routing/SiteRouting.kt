package com.transportmanagement.plugins.Routing

import CargoRepository
import com.transportmanagement.DTOs.LocationCreation
import com.transportmanagement.Service.LocationConversionService
import com.transportmanagement.model.entity.Site
import com.transportmanagement.model.repository.DriverStayingRepository
import com.transportmanagement.model.repository.SiteRepository
import com.transportmanagement.model.repository.TruckRepository
import io.ktor.http.*
import io.ktor.serialization.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.siteRoutes(
    siteRepository: SiteRepository,
    driverStayingRepository: DriverStayingRepository,
    cargoRepository: CargoRepository,
    truckRepository: TruckRepository
) {
    route("/sites") {
        get("/{id}") {
            val id = call.parameters["id"]
            val site = siteRepository.siteById(id!!.toInt())
            call.respond(site ?: HttpStatusCode.NotFound)
        }
        get("/available-drivers/{id}") {
            val siteId = call.parameters["id"]
            val driverStaysAtSite =
                driverStayingRepository.getActiveAvailableDriversAtSiteWithArrivalTime(siteId!!.toInt())
            call.respond(driverStaysAtSite)
        }
        get("transportable-cargo/{id}") {
            val siteId = call.parameters["id"]
            val cargo = cargoRepository.getAvailableCargoWithArrivalTime(siteId!!.toInt())
            call.respond(cargo)
        }
        get("/available-trucks/{id}") {
            val siteId = call.parameters["id"]
            val trucks = truckRepository.getAvailableTrucksWithArrivalTime(siteId!!.toInt())
            call.respond(trucks)
        }
        get("/active-sites") {
            val sites = siteRepository.getAllActiveSites()
            call.respond(sites)
        }
        get("/all-sites") {
            val sites = siteRepository.getAllSites()
            call.respond(sites)
        }
        post() {
            try {
                val site = call.receive<LocationCreation>()
                val pair = LocationConversionService().convertAddressToCoordinates(site.address)
                siteRepository.addSite(
                    Site(
                        id = null,
                        name = site.name,
                        lon = pair.first,
                        lat = pair.second,
                        address = site.address,
                        active = true
                    )
                )
                call.respond(HttpStatusCode.NoContent)
            } catch (ex: IllegalStateException) {
                call.respond(HttpStatusCode.BadRequest)
            } catch (ex: JsonConvertException) {
                call.respond(HttpStatusCode.BadRequest)
            }
        }
        delete("/{id}") {
            val id = call.parameters["id"]
            if (driverStayingRepository.getActiveAvailableDriversAtSiteWithArrivalTime(id!!.toInt())
                    .isNotEmpty() ||
                cargoRepository.getAvailableCargoWithArrivalTime(id.toInt()).isNotEmpty() ||
                truckRepository.getAvailableTrucksWithArrivalTime(id.toInt()).isNotEmpty()
            ) {
                call.respond(HttpStatusCode.Conflict, "Site is in use")

            } else {
                val success = siteRepository.deactivateSiteById(id.toInt())
                call.respond(HttpStatusCode.NoContent)
            }


        }


    }
}