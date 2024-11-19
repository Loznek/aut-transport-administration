package com.transportmanagement

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.respondText(text = "500: $cause" , status = HttpStatusCode.InternalServerError)
        }
    }
    routing {
        route("/drivers") {
            get("/{id}") {
                val id = call.parameters["id"]
                call.respondText("Driver with id $id")
            }
            post("/") {
                call.respondText("Driver created")
            }
            delete {
                call.respondText("Driver deleted")
            }
        }
        route("/sites") {
            get("/site_entity/{id}") {
                val id = call.parameters["id"]
                call.respondText("Site with id $id")
            }
            get("/available_drivers") {
                call.respondText("Available Drivers")
            }
            get("/transportable_cargo") {
                call.respondText("cargo to be transported")
            }
            get("/available_trucks") {
                call.respondText("Available Trucks")
            }
            post("/") {
                call.respondText("Site created")
            }
            delete {
                call.respondText("Site deleted")
            }
        }
        route("/transport"){
            get("/transport_entity/{id}") {
                val id = call.parameters["id"]
                call.respondText("Transport with id $id")
            }
            post("/") {
                call.respondText("Driver created")
            }
            delete {
                call.respondText("Transport deleted")
            }
        }
        route("/transport_sections"){
            get("/transport_section_entity/{id}") {
                val id = call.parameters["id"]
                call.respondText("Transport with id $id")
            }
            put("/") {
                val id = call.parameters["id"]
                call.respondText("Transport with id $id")
            }
            post("/") {
                call.respondText("Driver created")
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
                call.respondText("Truck created")
            }
            delete {
                call.respondText("Truck deleted")
            }
        }
        route("/store"){
            get("/store_entity/{id}") {
                val id = call.parameters["id"]
                call.respondText("Transport with id $id")
            }
            post("/") {
                call.respondText("Truck created")
            }
            delete {
                call.respondText("Truck deleted")
            }
        }
        route("/cargo"){
            get("/cargo_entity/{id}") {
                val id = call.parameters["id"]
                call.respondText("Transport with id $id")
            }
            post("/") {
                call.respondText("Truck created")
            }
            delete {
                call.respondText("Truck deleted")
            }
        }
        get("/") {
            call.respondText("Hello World!")
        }
    }
}
