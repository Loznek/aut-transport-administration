package com.transportmanagement.model.repository

import com.transportmanagement.DTOs.TruckWithArrivalTime
import com.transportmanagement.database.mapping.*
import com.transportmanagement.model.entity.Truck
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.deleteWhere

class TruckRepository {

    // Retrieves a Truck entry by its ID
    suspend fun truckById(id: Int): Truck? = suspendTransaction {
        TruckDAO.find { (TruckTable.id eq id) }.map(::truckDaoToModel).firstOrNull()
    }

    // Adds a new Truck entry to the database
    suspend fun addTruck(truck: Truck): Unit = suspendTransaction {
        TruckDAO.new {
            this.licensePlate = truck.licensePlate
            this.type = truck.type
            this.volumeCapacity = truck.volumeCapacity
            this.weightCapacity = truck.weightCapacity
            this.active = true
        }
    }

    // Removes a Truck entry by its ID, returning true if successful
    suspend fun removeTruckById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = TruckTable.deleteWhere {
            TruckTable.id eq id
        }
        rowsDeleted == 1
    }

    // Updates an existing Truck entry based on the provided model
    suspend fun updateTruck(truck: Truck) {
        suspendTransaction {
            val truckDAO = TruckDAO.findById(truck.id) ?: return@suspendTransaction
            truckDAO.licensePlate = truck.licensePlate
            truckDAO.type = truck.type
            truckDAO.volumeCapacity = truck.volumeCapacity
            truckDAO.weightCapacity = truck.weightCapacity
        }
    }

    // Retrieves all Truck entries
    suspend fun getAllTrucks(): List<Truck> = suspendTransaction {
        TruckDAO.all().map(::truckDaoToModel)
    }

    suspend fun getAvailableTrucksWithArrivalTime(siteId: Int): List<TruckWithArrivalTime> = suspendTransaction {
        TruckStayingDAO.find {
            TruckStayingTable.siteId eq siteId and (TruckStayingTable.startTransportId.isNull())
        }.mapNotNull { staying ->
            val truck = staying.truckId.let { TruckDAO.findById(it) }?.let(::truckDaoToModel)
            truck?.let {
                TruckWithArrivalTime(
                    truck = it,
                    arrivalTime = staying.arrivalTime.toKotlinLocalDateTime()
                )
            }
        }
    }

    suspend fun deactivateTruckById(truckId: Int): Boolean {
        return suspendTransaction {
            val truck = TruckDAO.findById(truckId) ?: return@suspendTransaction false
            truck.active = false
            true
        }
    }
}
