package com.transportmanagement.database.mapping

import com.transportmanagement.model.entity.CargoStaying
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.datetime

// Table definition using IntIdTable
object CargoStayingTable : IntIdTable("cargo_staying") {
    val siteId = integer("site_id").references(SiteTable.id)
    val cargoId = integer("cargo_id").references(CargoTable.id)
    val arrivalTransportId = integer("arrival_transport_id").references(TransportTable.id).nullable()
    val arrivalTime = datetime("arrival_time")
    val startTransportId = integer("start_transport_id").references(TransportTable.id).nullable()
    val startTime = datetime("start_time").nullable()
}

// DAO class with an integer primary key
class CargoStayingDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<CargoStayingDAO>(CargoStayingTable)

    var siteId by CargoStayingTable.siteId
    var cargoId by CargoStayingTable.cargoId
    var arrivalTransportId by CargoStayingTable.arrivalTransportId
    var arrivalTime by CargoStayingTable.arrivalTime
    var startTransportId by CargoStayingTable.startTransportId
    var startTime by CargoStayingTable.startTime
}

// Mapping function from DAO to model
fun cargoStayingDaoToModel(dao: CargoStayingDAO): CargoStaying = CargoStaying(
    id = dao.id.value,                        // Include the ID field here
    siteId = dao.siteId,
    cargoId = dao.cargoId,
    arrivalTransportId = dao.arrivalTransportId,
    arrivalTime = dao.arrivalTime.toKotlinLocalDateTime(),
    startTransportId = dao.startTransportId,
    startTime = dao.startTime?.toKotlinLocalDateTime()
)

// Optional: Mapping function from model to DAO
fun cargoStayingModelToDAO(cargoStaying: CargoStaying): CargoStayingDAO {
    return CargoStayingDAO.new(cargoStaying.id) {
        siteId = cargoStaying.siteId
        cargoId = cargoStaying.cargoId
        arrivalTransportId = cargoStaying.arrivalTransportId
        arrivalTime = cargoStaying.arrivalTime.toJavaLocalDateTime()
        startTransportId = cargoStaying.startTransportId
        startTime = cargoStaying.startTime?.toJavaLocalDateTime()
    }
}
