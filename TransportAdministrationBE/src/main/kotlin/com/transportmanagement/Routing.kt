package com.transportmanagement

import CargoRepository
import com.transportmanagement.DTOs.*
import com.transportmanagement.Service.TimePredictionService
import com.transportmanagement.model.entity.*
import com.transportmanagement.model.repository.*
import io.ktor.http.*
import io.ktor.serialization.*
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime


fun Application.configureRouting() {
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.respondText(text = "500: $cause" , status = HttpStatusCode.InternalServerError)
        }
    }
    
    val driverRepository= DriverRepository()
    val cargoRepository = CargoRepository()
    val truckRepository = TruckRepository()
    val siteRepository = SiteRepository()
    val transportRepository = TransportRepository()
    val transportSectionRepository = TransportSectionRepository()
    val storeRepository = StoreRepository()
    val storeStopRepository = StoreStopPointsRepository()
    val driverStayingRepository = DriverStayingRepository()
    val truckStayingRepository = TruckStayingRepository()
    val cargoStayingRepository = CargoStayingRepository()
    
    
    routing {
        route("/calculate_travel_time") {
            post("/") {
                val transportSectionPoint = call.receive<TransportSectionPoints>()
                val travelTimes = TimePredictionService().predictTimes(transportSectionPoint)
                call.respond(travelTimes)
            }
        }
        route("/drivers") {
            get("/{id}") {
                val id = call.parameters["id"]
                call.respondText("Driver with id $id")
            }
            get("/active_drivers"){
                val drivers = driverRepository.getAllActiveDrivers()
                call.respond(drivers)
            }
            post("/") {
                try {
                    val driver = call.receive<Driver>()
                    driverRepository.addDriver(driver)
                    val staying = DriverStaying(
                        id = null, driverId = driver.id, siteId = driver.homeSiteId, startTransportSectionId = null, arrivalTransportSectionId = 0, arrivalTime = Clock.System.now().toLocalDateTime(
                        TimeZone.currentSystemDefault()), startTime = null)
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
        route("/sites") {
            get("{id}/site_entity/") {
                val id = call.parameters["id"]
                val site=siteRepository.siteById(id!!.toInt())
                call.respond(site ?: HttpStatusCode.NotFound)
            }
            get("{id}/available_drivers") {
                val siteId = call.parameters["id"]
                val driverStaysAtSite = driverStayingRepository.getActiveAvailableDriversAtSiteWithArrivalTime(siteId!!.toInt())
                call.respond(driverStaysAtSite)
            }
            get("{id}/transportable_cargo") {
                val siteId = call.parameters["id"]
                val cargo = cargoRepository.getAvailableCargoWithArrivalTime(siteId!!.toInt())
                call.respond(cargo)
            }
            get("{id}/available_trucks") {
                val siteId = call.parameters["id"]
                val trucks = truckRepository.getAvailableTrucksWithArrivalTime(siteId!!.toInt())
                call.respond(trucks)
            }
            post("/") {
                try {
                    val site = call.receive<Site>()
                    siteRepository.addSite(site)
                    call.respond(HttpStatusCode.NoContent)
                } catch (ex: IllegalStateException) {
                    call.respond(HttpStatusCode.BadRequest)
                } catch (ex: JsonConvertException) {
                    call.respond(HttpStatusCode.BadRequest)
                }
            }
            delete("/{id}") {
                val id = call.parameters["id"]
                val success = siteRepository.deactivateSiteById(id!!.toInt())
                if (success) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }


        }
        route("/transport"){
            get("/transport_entity/{id}") {
                val id = call.parameters["id"]
               val transport = transportRepository.transportById(id!!.toInt())
                call.respond(transport ?: HttpStatusCode.NotFound)

            }
            post("/") {
                val transport = call.receive<TransportCreation>()
                val transportId = transportRepository.addTransport(Transport(id =null, startSiteId = transport.startSiteId, destinationSiteId = transport.destinationSiteId, truckId = transport.truckId, startTime = transport.startTime, arrivalTime = null))
                truckStayingRepository.refreshTruckStaying(transportId, transport.truckId,transport.startTime)
                truckStayingRepository.addTruckStaying(TruckStaying(id = null, truckId = transport.truckId, siteId = transport.destinationSiteId, startTransportId = null, arrivalTransportId = transportId, arrivalTime =  TimePredictionService().predictTime(transport.startTime), startTime = null))
                cargoStayingRepository.refreshCargoStayings(transport.cargoIds, transport.startSiteId,transportId, transport.startTime)
                for(cargoId in transport.cargoIds){
                    cargoStayingRepository.addCargoStaying(CargoStaying(id = null, cargoId = cargoId, siteId = transport.destinationSiteId, startTransportId = null, arrivalTransportId = transport.startSiteId, arrivalTime = TimePredictionService().predictTime(transport.startTime), startTime = null))
                }
                call.respond(HttpStatusCode.NoContent)
            }
            delete ("/id") {
                val id = call.parameters["id"]
                val transportSections= transportSectionRepository.getTransportSectionsOfTransport(id!!.toInt())
                val transportsectionIds = transportSections.map { it.id }
                val referredDrivers = driverStayingRepository.countReferredDrivers(transportsectionIds as List<Int>)
                if (referredDrivers.isNotEmpty()) {
                    call.respond(HttpStatusCode.BadRequest)
                }
                val referredTrucks = truckStayingRepository.countReferredTrucks(id.toInt())
                if (referredTrucks != null) {
                    call.respond(HttpStatusCode.BadRequest)
                }
                val referredCargo = cargoStayingRepository.countReferredCargo(id.toInt())
                if (referredCargo != null) {
                    call.respond(HttpStatusCode.BadRequest)
                }

                cargoStayingRepository.deleteCargoStayingsByArrivalTransportId(id.toInt())
                val cargoIds = cargoStayingRepository.getCargosOfTransport(id.toInt()).map { it.cargoId }
                cargoStayingRepository.restoreCargoStayingsByTransportId(id.toInt())
                cargoRepository.restoreCargoDeliveredState(cargoIds)
                truckStayingRepository.deleteTruckStayingsByArrivalTransportId(id.toInt())
                truckStayingRepository.restoreTruckStayingsByTransportId(id.toInt())
                for(transportSection in transportSections){
                    driverStayingRepository.restoreDriverStayingsByTransportSectionId(transportSection.id)
                    driverStayingRepository.deleteDriverStayingsByArrivalTransportSectionId(transportSection.id!!)
                    storeStopRepository.removeStoreStopPointsByTransportSectionId(transportSection.id)
                    transportSectionRepository.removeTransportSectionById(transportSection.id)
                }
                transportRepository.deleteTransportById(id.toInt())
            }
        }



        route("/transport_sections"){
            get("/transport_section_entity/{id}") {
                val id = call.parameters["id"]
                transportSectionRepository.transportSectionById(id!!.toInt())
                call.respondText("Transport with id $id")
            }
            put("/") {
                val id = call.parameters["id"]
                call.respondText("Transport with id $id")
            }
            post("/") {
                val transferSectionTimeInMinutes=TimePredictionService().predictTime(Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault())).minute
                if (transferSectionTimeInMinutes > 540){
                    call.respond(HttpStatusCode.BadRequest)
                }
                val transportSectionInfo = call.receive<TransportSectionInfo>()
                val transportSection= transportSectionInfo.transportSection
                val storeIds = transportSectionInfo.storeStops.map { it.storeId }
                cargoStayingRepository.noteDeliveredCargo(storeIds, transportSectionInfo.transportSection.transportId,TimePredictionService().predictTime(transportSection.startTime)) //Start + TransferSectionTimeInMinutes*1,2 +storeIdCount * 30)
                val cargoIds= cargoStayingRepository.getCargosOfTransport(transportSectionInfo.transportSection.transportId).map { it.cargoId }
                cargoRepository.noteDeliveredCargo(cargoIds, storeIds)

                transportSection.arrivalTime= TimePredictionService().predictTime(transportSection.startTime) //Start + TransferSectionTimeInMinutes* +storeIdCount * 30
                transportSectionRepository.addTransportSection(transportSection)
                for(storeStop in transportSectionInfo.storeStops){
                    storeStopRepository.addStoreStopPoint(StoreStopPoint(id = null, storeId = storeStop.storeId, arrivalTime = TimePredictionService().predictTime(transportSection.startTime)/*correct it*/, orderInSection = storeStop.orderInSection, transportSectionId = transportSection.id!!))
                }

                driverStayingRepository.refreshDriverStaying(transportSection.driverId, transportSection.destinationSiteId, transportSection.id!!, TimePredictionService().predictTime(transportSection.startTime)) //Start + TransferSectionTimeInMinutes* +storeIdCount * 30
                driverStayingRepository.addDriverStaying(DriverStaying(id = null, driverId = transportSection.driverId, siteId = transportSection.destinationSiteId, startTransportSectionId = null, arrivalTransportSectionId = transportSection.id!!, arrivalTime = TimePredictionService().predictTime(transportSection.startTime), startTime = null))


                val transport = transportRepository.transportById(transportSection.transportId)
                transportRepository.actualizeArrivalTime(transportSection.transportId, TimePredictionService().predictTime(transportSection.startTime))
                if (transport != null) {
                    if (transport.destinationSiteId == transportSection.destinationSiteId){
                        cargoStayingRepository.actualizeArrivalTime(transportSection.transportId, TimePredictionService().predictTime(transportSection.startTime))
                        truckStayingRepository.actualizeArrivalTime(transportSection.transportId, TimePredictionService().predictTime(transportSection.startTime))
                    }
                }





            }
            delete {
                call.respondText("Transport deleted")
            }
        }
        route("/trucks"){
            get("/truck_entity/{id}") {
                val id = call.parameters["id"]
                call.respondText("Transport with id $id")
            }
            post("/") {
               val truckCreation = call.receive<TruckCreation>()
                truckRepository.addTruck(truckCreation.truck)
                val staying = TruckStaying(
                    id = null, truckId = truckCreation.truck.id, siteId = truckCreation.startSiteId, startTransportId = null, arrivalTransportId = null, arrivalTime = Clock.System.now().toLocalDateTime(
                    TimeZone.currentSystemDefault()), startTime = null)
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
        route("/store"){
            get("/store_entity/{id}") {
                val id = call.parameters["id"]
                val store = storeRepository.storeById(id!!.toInt())
                call.respond(store ?: HttpStatusCode.NotFound)
            }
            post("/") {
                val store = call.receive<Store>()
                storeRepository.addStore(store)
                call.respondText("Truck created")
            }
            put("/add_to_route"){
                call.respondText("Stop created")
            }
            put("/delete_from_route"){
                call.respondText("Stop created")
            }
            delete("/{id}") {
                val id = call.parameters["id"]
                storeRepository.deactivateStoreById(id!!.toInt())
                call.respond(HttpStatusCode.NoContent)
            }
        }
        route("/cargo"){
            get("/cargo_entity/{id}") {
                val id = call.parameters["id"]
                val cargo = cargoRepository.cargoById(id!!.toInt())
                call.respond(cargo ?: HttpStatusCode.NotFound)
            }
            post("/") {
                val cargo = call.receive<CargoCreation>()
                cargoRepository.addCargo(cargo.cargo)
                val staying = CargoStaying(
                    id = null, cargoId = cargo.cargo.id, siteId = cargo.startSiteId, startTransportId = null, arrivalTransportId = null, arrivalTime = Clock.System.now().toLocalDateTime(
                    TimeZone.currentSystemDefault()), startTime = null)
                call.response.status(HttpStatusCode.Created)
            }
            delete("/{id}")  {
                val id = call.parameters["id"]
                val success = cargoRepository.deactivateCargoById(id!!.toInt())
                cargoStayingRepository.removeActiveCargoStayingsByCargoId(id.toInt())
                if (success) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }
        }
        get("/") {
            call.respondText("Hello World!")
        }
    }
}
