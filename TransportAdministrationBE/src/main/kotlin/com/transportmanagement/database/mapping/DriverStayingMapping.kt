package com.transportmanagement.database.mapping

import com.transportmanagement.model.entity.DriverStaying
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.datetime

// Table definition
object DriverStayingTable : IntIdTable("driver_staying") {
    val siteId = integer("site_id").references(SiteTable.id)
    val driverId = integer("driver_id").references(DriverTable.id)
    val arrivalTransportSectionId = integer("arrival_transport_section_id").references(TransportSectionTable.id)
    val arrivalTime = datetime("arrival_time")
    val startTransportSectionId = integer("start_transport_section_id").references(TransportSectionTable.id).nullable()
    val startTime = datetime("start_time").nullable()
}

// DAO class
class DriverStayingDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<DriverStayingDAO>(DriverStayingTable)

    var siteId by DriverStayingTable.siteId
    var driverId by DriverStayingTable.driverId
    var arrivalTransportSectionId by DriverStayingTable.arrivalTransportSectionId
    var arrivalTime by DriverStayingTable.arrivalTime
    var startTransportSectionId by DriverStayingTable.startTransportSectionId
    var startTime by DriverStayingTable.startTime
}

// Mapping function from DAO to model
fun driverStayingDaoToModel(dao: DriverStayingDAO): DriverStaying = DriverStaying(
    id = dao.id.value,
    siteId = dao.siteId,
    driverId = dao.driverId,
    arrivalTransportSectionId = dao.arrivalTransportSectionId,
    arrivalTime = dao.arrivalTime.toKotlinLocalDateTime(),
    startTransportSectionId = dao.startTransportSectionId,
    startTime = dao.startTime?.toKotlinLocalDateTime()
)

// Optional: Mapping function from model to DAO
fun driverStayingModelToDAO(driverStaying: DriverStaying): DriverStayingDAO {
    return DriverStayingDAO.new(driverStaying.id) {
        siteId = driverStaying.siteId
        driverId = driverStaying.driverId
        arrivalTransportSectionId = driverStaying.arrivalTransportSectionId
        arrivalTime = driverStaying.arrivalTime.toJavaLocalDateTime()
        startTransportSectionId = driverStaying.startTransportSectionId
        startTime = driverStaying.startTime?.toJavaLocalDateTime()
    }
}

