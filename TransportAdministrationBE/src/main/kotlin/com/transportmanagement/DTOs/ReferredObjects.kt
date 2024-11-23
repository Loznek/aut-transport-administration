package com.transportmanagement.DTOs

import com.transportmanagement.model.entity.CargoStaying
import com.transportmanagement.model.entity.DriverStaying
import com.transportmanagement.model.entity.TruckStaying
import kotlinx.serialization.Serializable

@Serializable
data class ReferredObjects (
    val referredDrivers: List<DriverStaying>,
    val referredTruck: TruckStaying?,
    val referredCargo: List<CargoStaying>
    //Elég ilyen mélységben, vagy legyen inkább mindegyikhez visszaadva a pontos példány?
    //Pl: konkrét Truck és a Transport ill. konkrét Cargok és a TransportSectionök, hogy egyből megjeleníthetőek legyenek
)