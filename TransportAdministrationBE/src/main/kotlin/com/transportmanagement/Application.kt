package com.transportmanagement

import com.transportmanagement.database.configureDatabases
import com.transportmanagement.plugins.Routing.configureRouting
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    install(CORS){
        allowHeader("Authorization") // Allow specific headers
        allowHeader("Content-Type") // Allow content type header
        allowMethod(io.ktor.http.HttpMethod.Get) // Allow specific HTTP methods
        allowMethod(io.ktor.http.HttpMethod.Post)
        allowMethod(io.ktor.http.HttpMethod.Put)
        allowMethod(io.ktor.http.HttpMethod.Delete)
        allowMethod(io.ktor.http.HttpMethod.Options)
        allowCredentials = true // Allow cookies
        allowCredentials = true
        anyHost()
    }
    configureSerialization()
    configureDatabases()
    configureSecurity()
    configureRouting()
}
