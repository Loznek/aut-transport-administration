package com.transportmanagement.model.repository

import com.transportmanagement.database.mapping.TransportDAO
import com.transportmanagement.database.mapping.TransportTable
import com.transportmanagement.database.mapping.suspendTransaction
import com.transportmanagement.database.mapping.transportDaoToModel
import com.transportmanagement.model.entity.Transport
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.toJavaLocalDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.update

class TransportRepository {

    // Retrieves a Transport entry by its ID
    suspend fun transportById(id: Int): Transport? = suspendTransaction {
        TransportDAO.find { (TransportTable.id eq id) }.map(::transportDaoToModel).firstOrNull()
    }

    // Adds a new Transport entry to the database
    suspend fun addTransport(transport: Transport): Int = suspendTransaction {
        val newTransport = TransportDAO.new {
            this.startSiteId = transport.startSiteId
            this.startTime = transport.startTime?.toJavaLocalDateTime()
            this.arrivalTime = transport.arrivalTime?.toJavaLocalDateTime()
            this.destinationSiteId = transport.destinationSiteId
            this.truckId = transport.truckId
        }
        newTransport.id.value
    }

    // Removes a Transport entry by its ID, returning true if successful
    suspend fun removeTransportById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = TransportTable.deleteWhere {
            TransportTable.id eq id
        }
        rowsDeleted == 1
    }

    // Updates an existing Transport entry based on the provided model
    suspend fun updateTransport(transport: Transport) {
        suspendTransaction {
            val transportDAO = transport.id?.let { TransportDAO.findById(it) } ?: return@suspendTransaction
            transportDAO.startSiteId = transport.startSiteId
            transportDAO.startTime = transport.startTime?.toJavaLocalDateTime()
            transportDAO.arrivalTime = transport.arrivalTime?.toJavaLocalDateTime()
            transportDAO.destinationSiteId = transport.destinationSiteId
            transportDAO.truckId = transport.truckId
        }
    }

    // Retrieves all Transport entries
    suspend fun getAllTransports(): List<Transport> = suspendTransaction {
        TransportDAO.all().map(::transportDaoToModel)
    }

    suspend fun deleteTransportById(transportId: Int) {
        suspendTransaction {
            TransportTable.deleteWhere { TransportTable.id eq transportId }
        }
    }

    suspend fun actualizeArrivalTime(transportId: Int, predictTime: LocalDateTime) {
        suspendTransaction {
            TransportTable.update({
                TransportTable.id eq transportId
            }) {
                it[arrivalTime] = predictTime.toJavaLocalDateTime()
            }
        }
    }

    suspend fun updateTransportTruck(transportId: Int, truckId: Int) {
        suspendTransaction {
            TransportTable.update({
                TransportTable.id eq transportId
            }) {
                it[this.truckId] = truckId
            }
        }

    }

    suspend fun updateTransportDriver(transportId: Int, truckId: Int) {
        suspendTransaction {
            TransportTable.update({
                TransportTable.id eq transportId
            }) {
                it[this.truckId] = truckId
            }
        }
    }
}
