package com.transportmanagement.plugins.Routing

import CargoRepository
import com.transportmanagement.DTOs.ReferredObjects
import com.transportmanagement.DTOs.TransportCreation
import com.transportmanagement.DTOs.TransportSectionInfo
import com.transportmanagement.model.entity.*
import com.transportmanagement.model.repository.*
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.transportRoutes(transportRepository: TransportRepository,
                          transportSectionRepository: TransportSectionRepository,
                          truckStayingRepository: TruckStayingRepository,
                          cargoStayingRepository: CargoStayingRepository,
                          cargoRepository: CargoRepository,
                          storeStopRepository: StoreStopPointsRepository,
                          driverStayingRepository: DriverStayingRepository
) {
    route("/transport") {
        get("/{id}") {
            val id = call.parameters["id"]
            val transport = transportRepository.transportById(id!!.toInt())
            val transportSections =
                transportSectionRepository.getTransportSectionsOfTransport(id.toInt())
            val sectionInfoList = mutableListOf<TransportSectionInfo>()
            for (transportSection in transportSections) {
                val storeStops =
                    storeStopRepository.getStoreStopPointsByTransportSectionId(transportSection.id!!)
                sectionInfoList.add(TransportSectionInfo(transportSection, storeStops))
            }
            val cargoIds: List<Int> = cargoStayingRepository.getCargosOfTransport(id.toInt())
                .map { it.cargoId }
            val transportCreation = TransportCreation(
                transport!!.startSiteId,
                transport.startTime!!,
                transport.destinationSiteId,
                sectionInfoList,
                transport.truckId,
                cargoIds
            )
            call.respond(transportCreation)

        }
        get("/all-transports") {
            val transports = transportRepository.getAllTransports()
            call.respond(transports)
        }
        post() {
            val transport = call.receive<TransportCreation>()
            val arrivalTime =
                transport.transportSections.map { it.transportSection.arrivalTime }
                    .maxByOrNull { it!! }
            val transportId = transportRepository.addTransport(
                Transport(
                    id = null,
                    startSiteId = transport.startSiteId,
                    destinationSiteId = transport.destinationSiteId,
                    truckId = transport.truckId,
                    startTime = transport.startTime,
                    arrivalTime = arrivalTime
                )
            )
            truckStayingRepository.refreshTruckStaying(
                transportId,
                transport.truckId,
                transport.startTime
            )
            truckStayingRepository.addTruckStaying(
                TruckStaying(
                    id = null,
                    truckId = transport.truckId,
                    siteId = transport.destinationSiteId,
                    startTransportId = null,
                    arrivalTransportId = transportId,
                    arrivalTime = arrivalTime!!,
                    startTime = null
                )
            )
            cargoStayingRepository.refreshCargoStayings(
                transport.cargoIds,
                transportId,
                transport.startTime
            )
            for (cargoId in transport.cargoIds) {
                cargoStayingRepository.addCargoStaying(
                    CargoStaying(
                        id = null,
                        cargoId = cargoId,
                        siteId = transport.destinationSiteId,
                        startTransportId = null,
                        arrivalTransportId = transportId,
                        arrivalTime = arrivalTime,
                        startTime = null
                    )
                )
            }
            for (transportSectionInfo in transport.transportSections) {
                val transportSection = transportSectionInfo.transportSection
                transportSection.transportId = transportId
                val storeIds = transportSectionInfo.storeStops.map { it.storeId }
                val cargoIds = transport.cargoIds
                val deliveredCargoIds = cargoRepository.getDeliveredCargos(cargoIds, storeIds)
                cargoStayingRepository.noteDeliveredCargo(
                    deliveredCargoIds as List<Int>,
                    transportId,
                    arrivalTime
                )
                cargoRepository.noteDeliveredCargo(deliveredCargoIds)
                val transportSectionId =
                    transportSectionRepository.addTransportSection(transportSection)
                for (storeStop in transportSectionInfo.storeStops) {
                    storeStopRepository.addStoreStopPoint(
                        StoreStopPoint(
                            id = null,
                            storeId = storeStop.storeId,
                            arrivalTime = storeStop.arrivalTime,
                            orderInSection = storeStop.orderInSection,
                            transportSectionId = transportSectionId
                        )
                    )
                }

                driverStayingRepository.refreshDriverStaying(
                    transportSection.driverId,
                    transportSection.startSiteId,
                    transportSectionId,
                    transportSection.startTime
                ) //Start + TransferSectionTimeInMinutes* +storeIdCount * 30
                driverStayingRepository.addDriverStaying(
                    DriverStaying(
                        id = null,
                        driverId = transportSection.driverId,
                        siteId = transportSection.destinationSiteId,
                        startTransportSectionId = null,
                        arrivalTransportSectionId = transportSectionId,
                        arrivalTime = transportSection.arrivalTime!!,
                        startTime = null
                    )
                )
            }
            call.respond(HttpStatusCode.Created)
        }
        get("object-references/{id}") {
            val id = call.parameters["id"]
            val transportSections =
                transportSectionRepository.getTransportSectionsOfTransport(id!!.toInt())
            val transportSectionIds = transportSections.map { it.id }
            val referredDrivers =
                driverStayingRepository.getReferredDriver(transportSectionIds as List<Int>)
            val referredTruck = truckStayingRepository.getReferredTruck(id.toInt())
            val referredCargo = cargoStayingRepository.getReferredCargos(id.toInt())
            if (referredDrivers.isNotEmpty() || referredTruck != null || referredCargo.isNotEmpty()) {
                call.respond(
                    HttpStatusCode.Conflict,
                    ReferredObjects(referredDrivers, referredTruck, referredCargo)
                )
            } else {
                call.respond(HttpStatusCode.NoContent)
            }
        }
        put("/{id}") {
            val originalTransport =
                transportRepository.transportById(call.parameters["id"]!!.toInt())!!
            val updatedTransport = call.receive<TransportCreation>()
            val originalCargoIds =
                cargoStayingRepository.getCargosOfTransport(originalTransport.id)
                    .map { it.cargoId }
            val cargosToBeRestored =
                originalCargoIds.filter { it !in updatedTransport.cargoIds }
            val cargosToBeAdded = updatedTransport.cargoIds.filter { it !in originalCargoIds }
            if (originalTransport.truckId != updatedTransport.truckId) {
                truckStayingRepository.deleteTruckStayingsByArrivalTransportId(originalTransport.id!!)
                truckStayingRepository.restoreTruckStayingsByTransportId(originalTransport.id!!)
                truckStayingRepository.refreshTruckStaying(
                    originalTransport.id,
                    updatedTransport.truckId,
                    updatedTransport.startTime
                )
                truckStayingRepository.addTruckStaying(
                    TruckStaying(
                        id = null,
                        truckId = updatedTransport.truckId,
                        siteId = originalTransport.destinationSiteId,
                        startTransportId = null,
                        arrivalTransportId = originalTransport.id,
                        arrivalTime = originalTransport.arrivalTime!!,
                        startTime = null
                    )
                )
                transportRepository.updateTransportTruck(originalTransport.id!!, updatedTransport.truckId)
            }
            for (cargoId in cargosToBeRestored) {
                cargoStayingRepository.restoreCargoStayingByCargoIdByTransportId(
                    originalTransport.id,
                    cargoId
                )
                cargoStayingRepository.deleteCargoStayingsByCargoIdByArrivalTransportId(
                    originalTransport.id,
                    cargoId
                )
            }
            cargoRepository.restoreCargoDeliveredState(cargosToBeRestored)
            cargoStayingRepository.refreshCargoStayings(
                cargosToBeAdded,
                originalTransport.id!!,
                originalTransport.startTime!!
            )
            for (cargoId in cargosToBeAdded) {
                cargoStayingRepository.addCargoStaying(
                    CargoStaying(
                        id = null,
                        cargoId = cargoId,
                        siteId = originalTransport.destinationSiteId,
                        startTransportId = null,
                        arrivalTransportId = originalTransport.id,
                        arrivalTime = originalTransport.arrivalTime!!,
                        startTime = null
                    )
                )
            }
            val storeIds = updatedTransport.transportSections.flatMap { it.storeStops.map { it.storeId } }
            val deliveredCargoIds = cargoRepository.getDeliveredCargos(cargosToBeAdded, storeIds)
            cargoStayingRepository.noteDeliveredCargo(
                deliveredCargoIds as List<Int>,
                originalTransport.id,
                originalTransport.arrivalTime!!
            )
            cargoRepository.noteDeliveredCargo(deliveredCargoIds)
            val originalTransportSections =
                transportSectionRepository.getTransportSectionsOfTransport(originalTransport.id!!)
            val updatedTransportSections =
                updatedTransport.transportSections.map { it.transportSection }
            for (originalTransportSection in originalTransportSections) {
                for (updatedTransportSection in updatedTransportSections) {
                    if (originalTransportSection.id == updatedTransportSection.id && originalTransportSection.driverId != updatedTransportSection.driverId) {
                        driverStayingRepository.restoreDriverStayingsByTransportSectionId(
                            originalTransportSection.id
                        )
                        driverStayingRepository.deleteDriverStayingsByArrivalTransportSectionId(
                            originalTransportSection.id!!
                        )
                        driverStayingRepository.refreshDriverStaying(
                            updatedTransportSection.driverId,
                            updatedTransportSection.startSiteId,
                            updatedTransportSection.id!!,
                            updatedTransportSection.startTime
                        )
                        driverStayingRepository.addDriverStaying(
                            DriverStaying(
                                id = null,
                                driverId = updatedTransportSection.driverId,
                                siteId = updatedTransportSection.destinationSiteId,
                                startTransportSectionId = null,
                                arrivalTransportSectionId = updatedTransportSection.id,
                                arrivalTime = updatedTransportSection.arrivalTime!!,
                                startTime = null
                            )
                        )
                        transportRepository.updateTransportDriver(updatedTransportSection.id, updatedTransportSection.driverId)
                    }
                }
            }
            call.respond(HttpStatusCode.NoContent)


        }

        delete("/{id}") {
            val id = call.parameters["id"]
            val transportSections =
                transportSectionRepository.getTransportSectionsOfTransport(id!!.toInt())
            val transportSectionIds = transportSections.map { it.id }
            val referredDrivers =
                driverStayingRepository.getReferredDriver(transportSectionIds as List<Int>)
            val referredTruck = truckStayingRepository.getReferredTruck(id.toInt())
            val referredCargo = cargoStayingRepository.getReferredCargos(id.toInt())
            if (referredDrivers.isNotEmpty() || referredTruck != null || referredCargo.isNotEmpty()) {
                call.respond(
                    HttpStatusCode.Conflict,
                    ReferredObjects(referredDrivers, referredTruck, referredCargo)
                )
            } else {
                val cargoIds =
                    cargoStayingRepository.getCargosOfTransport(id.toInt()).map { it.cargoId }
                cargoRepository.restoreCargoDeliveredState(cargoIds)
                cargoStayingRepository.deleteCargoStayingsByArrivalTransportId(id.toInt())
                cargoStayingRepository.restoreCargoStayingsByTransportId(id.toInt())

                truckStayingRepository.deleteTruckStayingsByArrivalTransportId(id.toInt())
                truckStayingRepository.restoreTruckStayingsByTransportId(id.toInt())
                for (transportSection in transportSections) {
                    driverStayingRepository.restoreDriverStayingsByTransportSectionId(
                        transportSection.id
                    )
                    driverStayingRepository.deleteDriverStayingsByArrivalTransportSectionId(
                        transportSection.id!!
                    )
                    storeStopRepository.removeStoreStopPointsByTransportSectionId(
                        transportSection.id
                    )
                    transportSectionRepository.removeTransportSectionById(transportSection.id)
                }
                transportRepository.deleteTransportById(id.toInt())
            }
            call.respond(HttpStatusCode.NoContent)
        }
    }

    route("/transport-sections") {
        get("/transport-sections/{id}") {
            val id = call.parameters["id"]
            val transportSection = transportSectionRepository.transportSectionById(id!!.toInt())
            call.respond(transportSection ?: HttpStatusCode.NotFound)
        }
    }
}