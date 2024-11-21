package com.transportmanagement.model.repository

import com.transportmanagement.DTOs.DriverWithArrivalTime
import com.transportmanagement.database.mapping.*
import com.transportmanagement.model.entity.DriverStaying
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.isNull
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.update

class DriverStayingRepository {

    // Retrieves a DriverStaying entry by its ID
    suspend fun driverStayingById(id: Int): DriverStaying? = suspendTransaction {
        DriverStayingDAO.find { (DriverStayingTable.id eq id) }.map(::driverStayingDaoToModel).firstOrNull()
    }

    // Adds a new DriverStaying entry to the database
    suspend fun addDriverStaying(driverStaying: DriverStaying): Unit = suspendTransaction {
        DriverStayingDAO.new {
            this.siteId = driverStaying.siteId
            this.driverId = driverStaying.driverId
            this.arrivalTransportSectionId = driverStaying.arrivalTransportSectionId
            this.arrivalTime = driverStaying.arrivalTime.toJavaLocalDateTime()
            this.startTransportSectionId = driverStaying.startTransportSectionId
            this.startTime = driverStaying.startTime?.toJavaLocalDateTime()
        }
    }

    // Removes a DriverStaying entry by its ID, returning true if successful
    suspend fun removeDriverStayingById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = DriverStayingTable.deleteWhere {
            DriverStayingTable.id eq id
        }
        rowsDeleted == 1
    }

    // Updates an existing DriverStaying entry based on the provided model
    /*
    suspend fun updateDriverStaying(driverStaying: DriverStaying) {
        suspendTransaction {
            val driverStayingDAO = DriverStayingDAO.findById(driverStaying.id) ?: return@suspendTransaction
            driverStayingDAO.siteId = driverStaying.siteId
            driverStayingDAO.driverId = driverStaying.driverId
            driverStayingDAO.arrivalTransportSectionId = driverStaying.arrivalTransportSectionId!!
            driverStayingDAO.arrivalTime = driverStaying.arrivalTime.toJavaLocalDateTime()
            driverStayingDAO.startTransportSectionId = driverStaying.startTransportSectionId!!
            driverStayingDAO.startTime = driverStaying.startTime.toJavaLocalDateTime()
        }
    }*/

    // Retrieves all DriverStaying entries
    suspend fun getAllDriverStayings(): List<DriverStaying> = suspendTransaction {
        DriverStayingDAO.all().map(::driverStayingDaoToModel)
    }

    suspend fun removeActiveDriverStayingsByDriverId(toInt: Int) {
        suspendTransaction {
            DriverStayingTable.deleteWhere {
                DriverStayingTable.driverId eq toInt and DriverStayingTable.startTransportSectionId.isNull()

            }
        }
    }

    suspend fun getActiveAvailableDriversAtSite(siteId: Int): List<DriverStaying> {
        return suspendTransaction {
            DriverStayingDAO.find {
                (DriverStayingTable.siteId eq siteId) and DriverStayingTable.startTransportSectionId.isNull()
            }.map(::driverStayingDaoToModel)
        }
    }

    suspend fun getActiveAvailableDriversAtSiteWithArrivalTime(siteId: Int): List<DriverWithArrivalTime> = suspendTransaction {
        DriverStayingDAO.find { DriverStayingTable.siteId eq siteId  and DriverStayingTable.startTransportSectionId.isNull() }
            .mapNotNull { staying ->
                val driver = staying.driverId.let { DriverDAO.findById(it) }?.let(::driverDaoToModel)
                driver?.let {
                    DriverWithArrivalTime(
                        driver = it,
                        arrivalTime = staying.arrivalTime.toKotlinLocalDateTime()
                    )
                }
            }
    }

    suspend fun countReferredDrivers(transportsectionIds: List<Int>): List<Int> {
        return suspendTransaction {
            DriverStayingDAO.find { DriverStayingTable.arrivalTransportSectionId inList transportsectionIds and (DriverStayingTable.startTransportSectionId notInList transportsectionIds) and DriverStayingTable.startTransportSectionId.isNotNull() }
                .map { it.driverId }
        }

    }

    suspend fun restoreDriverStayingsByTransportSectionId(transportSection: Int?) {
        suspendTransaction {
            DriverStayingTable.update({
                DriverStayingTable.startTransportSectionId eq transportSection
            }) {
                it[startTransportSectionId] = null
                it[startTime] = null
            }
        }
    }

    suspend fun deleteDriverStayingsByArrivalTransportSectionId(transportSectionId: Int) {
        suspendTransaction {
            DriverStayingTable.deleteWhere {
                DriverStayingTable.arrivalTransportSectionId eq transportSectionId
            }
        }
    }

    suspend fun refreshDriverStaying(driverId: Int, destinationSiteId: Int, id: Int, predictTime: LocalDateTime) {
        suspendTransaction {
            DriverStayingTable.update({
                DriverStayingTable.driverId eq driverId and (DriverStayingTable.siteId eq destinationSiteId)
            }) {
                it[startTransportSectionId] = id
                it[startTime] = predictTime.toJavaLocalDateTime()
            }
        }
    }


}
