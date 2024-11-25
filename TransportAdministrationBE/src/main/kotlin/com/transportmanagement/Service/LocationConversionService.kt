package com.transportmanagement.Service

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.*

class LocationConversionService {
    fun convertAddressToCoordinates(address: String): Pair<Double, Double> {
        val addressAsParam = address.replace(" ","+")

        val responseBody: String
        runBlocking {
            val client = HttpClient(CIO)
            val response = client.get {
                url("https://nominatim.openstreetmap.org/search")
                parameter("q", addressAsParam)
                parameter("format", "json")
            }
            responseBody = response.bodyAsText()
        }
        val array = Json.parseToJsonElement(responseBody) as JsonArray
        val json = array[0] as JsonObject

        val lat = json["lat"]?.jsonPrimitive?.contentOrNull?.toDouble()!!
        val lon = json["lon"]?.jsonPrimitive?.contentOrNull?.toDouble()!!

        return Pair(lon, lat)
    }
}