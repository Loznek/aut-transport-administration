package com.transportmanagement.plugins.Routing

import CargoRepository
import com.transportmanagement.model.repository.*
import io.ktor.server.application.*
import io.ktor.server.routing.*


fun Application.configureRouting() {

    val driverRepository = DriverRepository()
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
        cargoRoutes(cargoRepository, cargoStayingRepository)
        driverRoutes(driverRepository, driverStayingRepository)
        travelCalculationRoutes()
        siteRoutes(siteRepository, driverStayingRepository, cargoRepository, truckRepository)
        storeRoutes(storeRepository, cargoRepository)
        truckRoutes(truckRepository, truckStayingRepository)
        transportRoutes(transportRepository,
            transportSectionRepository,
            truckStayingRepository,
            cargoStayingRepository,
            cargoRepository,
            storeStopRepository,
            driverStayingRepository)
    }
}
