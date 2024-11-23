package com.transportmanagement.plugins.Routing

import CargoRepository
import com.transportmanagement.DTOs.LocationCreation
import com.transportmanagement.Service.LocationConversionService
import com.transportmanagement.model.entity.Store
import com.transportmanagement.model.repository.StoreRepository
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.storeRoutes(storeRepository: StoreRepository, cargoRepository: CargoRepository) {
    route("/stores") {
        get("/{id}") {
            val id = call.parameters["id"]
            val store = storeRepository.storeById(id!!.toInt())
            call.respond(store ?: HttpStatusCode.NotFound)
        }
        get("/active-stores") {
            val stores = storeRepository.getAllActiveStores()
            call.respond(stores)
        }
        get("/all-stores") {
            val stores = storeRepository.getAllStores()
            call.respond(stores)
        }
        post() {
            val site = call.receive<LocationCreation>()
            val pair = LocationConversionService().convertAddressToCoordinates(site.address)
            storeRepository.addStore(Store(id=null, name=site.name, lon = pair.first, lat = pair.second, address = site.address, active = true))
            call.respondText("Truck created")
        }
        delete("/{id}") {
            val id = call.parameters["id"]
            if(cargoRepository.getCargosByDestinationStoreId(id!!.toInt()).isNotEmpty())
                call.respond(HttpStatusCode.NoContent, "Cannot delete store with cargo to be transferred there")
            storeRepository.deactivateStoreById(id.toInt())
            call.respond(HttpStatusCode.NoContent)
        }
    }
}