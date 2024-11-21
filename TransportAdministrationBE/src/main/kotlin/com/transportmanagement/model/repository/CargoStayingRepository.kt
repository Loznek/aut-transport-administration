package com.transportmanagement.model.repository

import com.transportmanagement.database.mapping.CargoStayingDAO
import com.transportmanagement.database.mapping.CargoStayingTable
import com.transportmanagement.database.mapping.cargoStayingDaoToModel
import com.transportmanagement.database.mapping.suspendTransaction
import com.transportmanagement.model.entity.CargoStaying
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.toJavaLocalDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.isNull
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.update

class CargoStayingRepository {

    // Retrieves a CargoStaying entry by its ID
    suspend fun cargoStayingById(id: Int): CargoStaying? = suspendTransaction {
        CargoStayingDAO.find { (CargoStayingTable.id eq id) }.map(::cargoStayingDaoToModel).firstOrNull()
    }

    // Adds a new CargoStaying entry to the database
    suspend fun addCargoStaying(cargoStaying: CargoStaying): Unit = suspendTransaction {
        CargoStayingDAO.new {
            this.siteId = cargoStaying.siteId
            this.cargoId = cargoStaying.cargoId
            this.arrivalTransportId = cargoStaying.arrivalTransportId
            this.arrivalTime = cargoStaying.arrivalTime.toJavaLocalDateTime()
            this.startTransportId = cargoStaying.startTransportId
            this.startTime = cargoStaying.startTime?.toJavaLocalDateTime()
        }
    }

    // Removes a CargoStaying entry by its ID, returning true if successful
    suspend fun removeCargoStayingById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = CargoStayingTable.deleteWhere {
            CargoStayingTable.id eq id
        }
        rowsDeleted == 1
    }

    // Updates an existing CargoStaying entry based on the provided model

    // Retrieves all CargoStaying entries
    suspend fun getAllCargoStayings(): List<CargoStaying> = suspendTransaction {
        CargoStayingDAO.all().map(::cargoStayingDaoToModel)
    }

    suspend fun removeActiveCargoStayingsByCargoId(cargoId: Int) {
        suspendTransaction {
            CargoStayingTable.deleteWhere {
                CargoStayingTable.cargoId eq cargoId and CargoStayingTable.startTransportId.isNull()
            }
        }
    }

        suspend fun refreshCargoStayings(cargoIds: List<Int>, startSiteId: Int, transportId: Int, startTime: LocalDateTime) {
            suspendTransaction {
                CargoStayingTable.update({
                    CargoStayingTable.cargoId inList cargoIds and (CargoStayingTable.siteId eq startSiteId)
                }) {
                    it[startTransportId] = transportId
                    it[this.startTime] = startTime.toJavaLocalDateTime()
                }
            }
        }

    suspend fun noteDeliveredCargo(storeIds: List<Int>, transportId: Int?, arrivalTime: LocalDateTime) {
        suspendTransaction {
            CargoStayingTable.update({
                CargoStayingTable.cargoId inList storeIds and (CargoStayingTable.arrivalTransportId eq transportId)
            }) {
                it[startTransportId] = transportId
                it[startTime] = arrivalTime.toJavaLocalDateTime()
            }
        }
    }

    suspend fun getCargosOfTransport(id: Int?): List<CargoStaying>{
        return suspendTransaction {
            CargoStayingDAO.find { CargoStayingTable.arrivalTransportId eq id }.map(::cargoStayingDaoToModel)
        }
    }

    suspend fun countReferredCargo(transportId: Int): Int? =
        suspendTransaction {
            CargoStayingDAO.find {
                CargoStayingTable.arrivalTransportId eq transportId and CargoStayingTable.arrivalTransportId.isNull()
            }.firstOrNull()?.cargoId
        }

    suspend fun deleteCargoStayingsByArrivalTransportId(tarnsportId: Int) {
        suspendTransaction {
            CargoStayingTable.deleteWhere {
                CargoStayingTable.arrivalTransportId eq tarnsportId
            }
        }
    }

    suspend fun restoreCargoStayingsByTransportId(transportId: Int){
        return suspendTransaction {
            // Fetch the cargo IDs for rows that will be updated
            CargoStayingTable.update({ CargoStayingTable.startTransportId eq transportId }) {
                it[startTransportId] = null
                it[startTime] = null
            }

        }
    }

    suspend fun actualizeArrivalTime(transportId: Int, predictTime: LocalDateTime) {
        suspendTransaction {
            CargoStayingTable.update({
                CargoStayingTable.arrivalTransportId eq transportId
            }) {
                it[arrivalTime] = predictTime.toJavaLocalDateTime()
            }
        }
    }
}
