package com.transportmanagement.model.repository

import com.transportmanagement.database.mapping.DaysOffDAO
import com.transportmanagement.database.mapping.DaysOffTable
import com.transportmanagement.database.mapping.daysOffDaoToModel
import com.transportmanagement.database.mapping.suspendTransaction
import com.transportmanagement.model.entity.DaysOff
import kotlinx.datetime.toJavaLocalDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere

class DaysOffRepository {

    // Retrieves a DaysOff entry by its ID
    suspend fun daysOffById(id: Int): DaysOff? = suspendTransaction {
        DaysOffDAO.find { (DaysOffTable.id eq id) }.map(::daysOffDaoToModel).firstOrNull()
    }

    // Adds a new DaysOff entry to the database
    suspend fun addDaysOff(daysOff: DaysOff): Unit = suspendTransaction {
        DaysOffDAO.new {
            this.driverId = daysOff.driverId
            this.startTime = daysOff.startTime.toJavaLocalDateTime()
            this.endTime = daysOff.endTime.toJavaLocalDateTime()
        }
    }

    // Removes a DaysOff entry by its ID, returning true if successful
    suspend fun removeDaysOffById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = DaysOffTable.deleteWhere {
            DaysOffTable.id eq id
        }
        rowsDeleted == 1
    }

    // Updates an existing DaysOff entry based on the provided model
    suspend fun updateDaysOff(daysOff: DaysOff) {
        suspendTransaction {
            val daysOffDAO = DaysOffDAO.findById(daysOff.id) ?: return@suspendTransaction
            daysOffDAO.driverId = daysOff.driverId
            daysOffDAO.startTime = daysOff.startTime.toJavaLocalDateTime()
            daysOffDAO.endTime = daysOff.endTime.toJavaLocalDateTime()
        }
    }

    // Retrieves all DaysOff entries
    suspend fun getAllDaysOff(): List<DaysOff> = suspendTransaction {
        DaysOffDAO.all().map(::daysOffDaoToModel)
    }
}
