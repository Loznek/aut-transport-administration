package com.transportmanagement.database.mapping

import com.transportmanagement.model.entity.TransportSection
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.datetime

// Table definition using IntIdTable
object TransportSectionTable : IntIdTable("transport_section") {
    val startSiteId = integer("start_site_id").references(SiteTable.id)
    val destinationSiteId = integer("destination_site_id").references(SiteTable.id)
    val startTime = datetime("start_time")
    val arrivalTime = datetime("arrival_time").nullable()
    val driverId = integer("driver_id").references(DriverTable.id)
    val transportId = integer("transport_id").references(TransportTable.id).nullable()
}

// DAO class with an integer primary key
class TransportSectionDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<TransportSectionDAO>(TransportSectionTable)

    var startSiteId by TransportSectionTable.startSiteId
    var destinationSiteId by TransportSectionTable.destinationSiteId
    var startTime by TransportSectionTable.startTime
    var arrivalTime by TransportSectionTable.arrivalTime
    var driverId by TransportSectionTable.driverId
    var transportId by TransportSectionTable.transportId
}

// Mapping function from DAO to model
fun transportSectionDaoToModel(dao: TransportSectionDAO): TransportSection = TransportSection(
    id = dao.id.value,                      // Include the ID field here
    startSiteId = dao.startSiteId,
    destinationSiteId = dao.destinationSiteId,
    startTime = dao.startTime.toKotlinLocalDateTime(),
    arrivalTime = dao.arrivalTime?.toKotlinLocalDateTime(),
    driverId = dao.driverId,
    transportId = dao.transportId
)

// Optional: Mapping function from model to DAO
fun transportSectionModelToDAO(transportSection: TransportSection): TransportSectionDAO {
    return TransportSectionDAO.new(transportSection.id) {
        startSiteId = transportSection.startSiteId
        destinationSiteId = transportSection.destinationSiteId
        startTime = transportSection.startTime.toJavaLocalDateTime()
        arrivalTime = transportSection.arrivalTime?.toJavaLocalDateTime()
        driverId = transportSection.driverId
        transportId = transportSection.transportId
    }
}