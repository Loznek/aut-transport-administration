package com.transportmanagement.model.repository

import com.transportmanagement.database.mapping.DriverDAO
import com.transportmanagement.database.mapping.DriverTable
import com.transportmanagement.database.mapping.driverDaoToModel
import com.transportmanagement.database.mapping.suspendTransaction
import com.transportmanagement.model.entity.Driver
import kotlinx.datetime.toJavaLocalDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere

class DriverRepository {

    // Retrieves a driver by their ID
    suspend fun driverById(id: Int): Driver? = suspendTransaction {
        DriverDAO.find { (DriverTable.id eq id) }.map(::driverDaoToModel).firstOrNull()
    }

    // Adds a new driver entry to the database
    suspend fun addDriver(driver: Driver): Int = suspendTransaction {
        val newDriver=DriverDAO.new {
            this.name = driver.name
            this.dateOfBirth = driver.dateOfBirth.toJavaLocalDateTime()
            this.homeSiteId = driver.homeSiteId
            this.active = true
        }
        newDriver.id.value

    }

    // Removes a driver entry by their ID, returning true if successful
    suspend fun removeDriverById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = DriverTable.deleteWhere {
            DriverTable.id eq id
        }
        rowsDeleted == 1
    }

    // Updates an existing driver entry based on the provided model
    /*
    suspend fun updateDriver(driver: Driver) {
        suspendTransaction {
            val driverDAO = DriverDAO.findById(driver.id) ?: return@suspendTransaction
            driverDAO.name = driver.name
            driverDAO.dateOfBirth = driver.dateOfBirth.toJavaLocalDateTime()
            driverDAO.homeSiteId = driver.homeSiteId
        }
    }*/

    // Retrieves all drivers
    suspend fun getAllDrivers(): List<Driver> = suspendTransaction {
        DriverDAO.all().map(::driverDaoToModel)
    }

    suspend fun getAllActiveDrivers(): List<Driver> {
        return suspendTransaction {
            DriverDAO.find { DriverTable.active eq true }
                .map(::driverDaoToModel)
        }
    }

   suspend fun deactivateDriver(driverId: Int): Boolean {
        return suspendTransaction {
            val driver = DriverDAO.findById(driverId) ?: return@suspendTransaction false
            driver.active = false
            true
        }
    }


}
