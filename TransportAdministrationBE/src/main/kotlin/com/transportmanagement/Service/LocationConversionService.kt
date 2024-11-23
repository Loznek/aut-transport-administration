package com.transportmanagement.Service

class LocationConversionService {
    suspend fun convertAddressToCoordinates(address: String): Pair<Double, Double> {
        //valami okos Api hívás
        return Pair(47.4979, 19.0402)
    }
}