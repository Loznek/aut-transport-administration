package com.transportmanagement.database.mapping

import com.transportmanagement.model.entity.Driver
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.datetime

// Table definition
object DriverTable : IntIdTable("driver") {
    val name = varchar("name", 255) // Adjust size as needed
    val dateOfBirth = datetime("date_of_birth")
    val dayOffInTheWeek = integer("day_off_in_the_week")
    val homeSiteId = integer("home_site_id")
    val active = bool("active")
}

// DAO class
class DriverDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<DriverDAO>(DriverTable)

    var name by DriverTable.name
    var dateOfBirth by DriverTable.dateOfBirth
    var dayOffInTheWeek by DriverTable.dayOffInTheWeek
    var homeSiteId by DriverTable.homeSiteId
    var active by DriverTable.active
}

// Mapping function from DAO to model
fun driverDaoToModel(dao: DriverDAO): Driver = Driver(
    id = dao.id.value,                // Include the ID field here
    name = dao.name,
    dateOfBirth = dao.dateOfBirth.toKotlinLocalDateTime(),
    dayOffInTheWeek = dao.dayOffInTheWeek,
    homeSiteId = dao.homeSiteId,
    active = dao.active
)

// Optional: Mapping function from model to DAO
fun driverModelToDAO(driver: Driver): DriverDAO {
    return DriverDAO.new(driver.id) {
        name = driver.name
        dateOfBirth = driver.dateOfBirth.toJavaLocalDateTime()
        dayOffInTheWeek = driver.dayOffInTheWeek
        homeSiteId = driver.homeSiteId
        active = driver.active
    }
}