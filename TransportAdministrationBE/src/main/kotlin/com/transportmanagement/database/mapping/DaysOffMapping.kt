package com.transportmanagement.database.mapping

import com.transportmanagement.model.entity.DaysOff
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.datetime

// Table definition using IntIdTable
object DaysOffTable : IntIdTable("days_off") {
    val driverId = integer("driver_id").references(DriverTable.id)
    val startTime = datetime("start_time")
    val endTime = datetime("end_time")
}

// DAO class with an integer primary key
class DaysOffDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<DaysOffDAO>(DaysOffTable)

    var driverId by DaysOffTable.driverId
    var startTime by DaysOffTable.startTime
    var endTime by DaysOffTable.endTime
}

// Mapping function from DAO to model
fun daysOffDaoToModel(dao: DaysOffDAO): DaysOff = DaysOff(
    id = dao.id.value,                 // Include the ID field here
    driverId = dao.driverId,
    startTime = dao.startTime.toKotlinLocalDateTime(),
    endTime = dao.endTime.toKotlinLocalDateTime()
)

// Optional: Mapping function from model to DAO
fun daysOffModelToDAO(daysOff: DaysOff): DaysOffDAO {
    return DaysOffDAO.new(daysOff.id) {
        driverId = daysOff.driverId
        startTime = daysOff.startTime.toJavaLocalDateTime()
        endTime = daysOff.endTime.toJavaLocalDateTime()
    }
}