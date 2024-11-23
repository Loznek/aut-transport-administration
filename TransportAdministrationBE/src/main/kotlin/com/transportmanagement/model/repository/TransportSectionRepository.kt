package com.transportmanagement.model.repository

import com.transportmanagement.database.mapping.TransportSectionDAO
import com.transportmanagement.database.mapping.TransportSectionTable
import com.transportmanagement.database.mapping.suspendTransaction
import com.transportmanagement.database.mapping.transportSectionDaoToModel
import com.transportmanagement.model.entity.TransportSection
import kotlinx.datetime.toJavaLocalDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere

class TransportSectionRepository {

    // Retrieves a TransportSection by its ID
    suspend fun transportSectionById(id: Int): TransportSection? = suspendTransaction {
        TransportSectionDAO.find { (TransportSectionTable.id eq id) }
            .map(::transportSectionDaoToModel)
            .firstOrNull()
    }

    // Adds a new TransportSection entry to the database
    suspend fun addTransportSection(transportSection: TransportSection): Int = suspendTransaction {
        val newSection = TransportSectionDAO.new {
            this.startSiteId = transportSection.startSiteId
            this.destinationSiteId = transportSection.destinationSiteId
            this.startTime = transportSection.startTime.toJavaLocalDateTime()
            this.arrivalTime = transportSection.arrivalTime?.toJavaLocalDateTime()
            this.driverId = transportSection.driverId
            this.transportId = transportSection.transportId
        }
        newSection.id.value

    }

    // Removes a TransportSection entry by its ID, returning true if successful
    suspend fun removeTransportSectionById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = TransportSectionTable.deleteWhere {
            TransportSectionTable.id eq id
        }
        rowsDeleted == 1
    }

    // Updates an existing TransportSection entry based on the provided model

    // Retrieves all TransportSections
    suspend fun getAllTransportSections(): List<TransportSection> = suspendTransaction {
        TransportSectionDAO.all().map(::transportSectionDaoToModel)
    }

    suspend fun getTransportSectionsOfTransport(transportId: Int): List<TransportSection> =
        suspendTransaction {
            TransportSectionDAO.find { TransportSectionTable.transportId eq transportId }
                .map(::transportSectionDaoToModel)
        }
}
