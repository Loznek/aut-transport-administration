package com.transportmanagement.model.repository

import com.transportmanagement.database.mapping.TruckStayingDAO
import com.transportmanagement.database.mapping.TruckStayingTable
import com.transportmanagement.database.mapping.suspendTransaction
import com.transportmanagement.database.mapping.truckStayingDaoToModel
import com.transportmanagement.model.entity.TruckStaying
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.toJavaLocalDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.isNull
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.update

class TruckStayingRepository {

    // Retrieves a TruckStaying entry by its ID
    suspend fun truckStayingById(id: Int): TruckStaying? = suspendTransaction {
        TruckStayingDAO.find { (TruckStayingTable.id eq id) }.map(::truckStayingDaoToModel).firstOrNull()
    }

    // Adds a new TruckStaying entry to the database
    suspend fun addTruckStaying(truckStaying: TruckStaying): Unit = suspendTransaction {
        TruckStayingDAO.new {
            this.siteId = truckStaying.siteId
            this.truckId = truckStaying.truckId
            this.arrivalTransportId = truckStaying.arrivalTransportId
            this.arrivalTime = truckStaying.arrivalTime.toJavaLocalDateTime()
            this.startTransportId = truckStaying.startTransportId
            this.startTime = truckStaying.startTime?.toJavaLocalDateTime()
        }
    }

    // Removes a TruckStaying entry by its ID, returning true if successful
    suspend fun removeTruckStayingById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = TruckStayingTable.deleteWhere {
            TruckStayingTable.id eq id
        }
        rowsDeleted == 1
    }

    // Updates an existing TruckStaying entry based on the provided model

    // Retrieves all TruckStaying entries
    suspend fun getAllTruckStayings(): List<TruckStaying> = suspendTransaction {
        TruckStayingDAO.all().map(::truckStayingDaoToModel)
    }

    suspend fun removeActiveTruckStayingsByTruckId(truckId: Int) {
        suspendTransaction {
            TruckStayingTable.deleteWhere {
                TruckStayingTable.truckId eq truckId and TruckStayingTable.startTransportId.isNull()
            }
        }
    }

    suspend fun refreshTruckStaying(transportId: Int, truckId: Int, startTime: LocalDateTime) {
        suspendTransaction {
            TruckStayingTable.update({
                TruckStayingTable.truckId eq truckId and TruckStayingTable.startTransportId.isNull()
            }) {
                it[this.startTransportId] = transportId
                it[this.startTime] = startTime.toJavaLocalDateTime()
            }
        }
    }

    suspend fun countReferredTrucks(transferId: Int): Int? =
        suspendTransaction {
            TruckStayingDAO.find {
                TruckStayingTable.arrivalTransportId eq transferId and TruckStayingTable.arrivalTransportId.isNull()
            }.firstOrNull()?.truckId
        }

    suspend fun deleteTruckStayingsByArrivalTransportId(transportId: Int) {
        suspendTransaction {
            TruckStayingTable.deleteWhere {
                TruckStayingTable.arrivalTransportId eq transportId
            }
        }
    }

    suspend fun restoreTruckStayingsByTransportId(transportId: Int) {
        suspendTransaction {
            TruckStayingTable.update({
                TruckStayingTable.startTransportId eq transportId
            }) {
                it[startTransportId] = null
                it[startTime] = null
            }
        }
    }

    suspend fun actualizeArrivalTime(transportId: Int, predictTime: LocalDateTime) {
        suspendTransaction {
            TruckStayingTable.update({
                TruckStayingTable.arrivalTransportId eq transportId
            }) {
                it[arrivalTime] = predictTime.toJavaLocalDateTime()
            }
        }
    }


}
