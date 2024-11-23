package com.transportmanagement.model.repository

import com.transportmanagement.database.mapping.StoreStopPointsDAO
import com.transportmanagement.database.mapping.StoreStopPointsTable
import com.transportmanagement.database.mapping.storeStopPointsDaoToModel
import com.transportmanagement.database.mapping.suspendTransaction
import com.transportmanagement.model.entity.StoreStopPoint
import kotlinx.datetime.toJavaLocalDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere

class StoreStopPointsRepository {

    // Retrieves a StoreStopPoints entry by its ID
    suspend fun storeStopPointById(id: Int): StoreStopPoint? = suspendTransaction {
        StoreStopPointsDAO.find { (StoreStopPointsTable.id eq id) }.map(::storeStopPointsDaoToModel)
            .firstOrNull()
    }

    // Adds a new StoreStopPoints entry to the database
    suspend fun addStoreStopPoint(storeStopPoints: StoreStopPoint): Unit = suspendTransaction {
        StoreStopPointsDAO.new {
            this.transportSectionId = storeStopPoints.transportSectionId
            this.storeId = storeStopPoints.storeId
            this.arrivalTime = storeStopPoints.arrivalTime?.toJavaLocalDateTime()
            this.orderInSection = storeStopPoints.orderInSection
        }
    }

    // Removes a StoreStopPoints entry by its ID, returning true if successful
    suspend fun removeStoreStopPointById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = StoreStopPointsTable.deleteWhere {
            StoreStopPointsTable.id eq id
        }
        rowsDeleted == 1
    }

    // Updates an existing StoreStopPoints entry based on the provided model

    // Retrieves all StoreStopPoints entries
    suspend fun getAllStoreStopPoints(): List<StoreStopPoint> = suspendTransaction {
        StoreStopPointsDAO.all().map(::storeStopPointsDaoToModel)
    }

    suspend fun removeStoreStopPointsByTransportSectionId(transportSectionId: Int) {
        suspendTransaction {
            StoreStopPointsTable.deleteWhere { StoreStopPointsTable.transportSectionId eq transportSectionId }
        }
    }

    suspend fun getStoreStopPointsByTransportSectionId(transportSectionId: Int): List<StoreStopPoint> =
        suspendTransaction {
            StoreStopPointsDAO.find { StoreStopPointsTable.transportSectionId eq transportSectionId }
                .map(::storeStopPointsDaoToModel)

        }
}
