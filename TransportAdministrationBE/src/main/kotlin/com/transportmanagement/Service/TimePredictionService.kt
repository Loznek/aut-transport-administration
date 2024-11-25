package com.transportmanagement.Service

import com.transportmanagement.DTOs.TransportSectionPoints
import com.transportmanagement.model.repository.SiteRepository
import com.transportmanagement.model.repository.StoreRepository
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.runBlocking
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import kotlinx.serialization.json.*
import java.util.stream.Collectors

class TimePredictionService(val siteRepository: SiteRepository, val storeRepository: StoreRepository) {

    fun predictTime(date: LocalDateTime): LocalDateTime {
        return date.toJavaLocalDateTime().plusHours(3).toKotlinLocalDateTime()
    }

    suspend fun predictTimes(transportSectionPoint: TransportSectionPoints): List<Double> {

        val startSite = siteRepository.siteById(transportSectionPoint.startSiteId)
        val endSite = siteRepository.siteById(transportSectionPoint.destinationSiteId)

        val storeCoordinates = ArrayList<Pair<Double, Double>>()
            storeCoordinates.add(Pair(startSite!!.lon, startSite.lat))

        for (stops in transportSectionPoint.stopPoints) {
            val stopStore = storeRepository.storeById(stops.storeId)
            if (stopStore != null) {
                storeCoordinates.add(Pair(stopStore.lon, stopStore.lat))
            }
        }
        storeCoordinates.add(Pair(endSite!!.lon, endSite.lat))
        val coordinates =
            storeCoordinates.stream().map { p -> "${p.first},${p.second}" }.collect(Collectors.joining(";"))

        val responseBody: String
        runBlocking {
            val client = HttpClient(CIO)
            val response = client.get {
                url("http://router.project-osrm.org/route/v1/driving/$coordinates")
                parameter("overview", "full")
            }
            responseBody = response.bodyAsText()
        }
        val json = Json.parseToJsonElement(responseBody) as JsonObject
        val route =
            json.jsonObject["routes"]?.jsonArray?.get(0)?.jsonObject ?: throw Exception("no route found")
        val legs = route["legs"]?.jsonArray ?: emptyList()

        val result = ArrayList<Double>()

        for (leg in legs) {
            var duration = leg.jsonObject["duration"]?.jsonPrimitive?.doubleOrNull
            if (duration != null) {
                duration /= 0.8
                result.add(duration)
            }
        }

        return result
    }

}