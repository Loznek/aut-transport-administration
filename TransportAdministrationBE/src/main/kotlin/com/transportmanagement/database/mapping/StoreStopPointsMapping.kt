package com.transportmanagement.database.mapping

import com.transportmanagement.model.entity.StoreStopPoint
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.datetime

// Table definition using IntIdTable
object StoreStopPointsTable : IntIdTable("store_stop_points") {
    val transportSectionId = integer("transport_section_id").references(TransportSectionTable.id)
    val storeId = integer("store_id").references(StoreTable.id)
    val orderInSection = integer("order_in_section")
    val arrivalTime = datetime("arrival_time").nullable()
}

// DAO class with an integer primary key
class StoreStopPointsDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<StoreStopPointsDAO>(StoreStopPointsTable)

    var transportSectionId by StoreStopPointsTable.transportSectionId
    var storeId by StoreStopPointsTable.storeId
    var orderInSection by StoreStopPointsTable.orderInSection
    var arrivalTime by StoreStopPointsTable.arrivalTime
}

// Mapping function from DAO to model
fun storeStopPointsDaoToModel(dao: StoreStopPointsDAO): StoreStopPoint = StoreStopPoint(
    id = dao.id.value,                    // Include the ID field here
    transportSectionId = dao.transportSectionId,
    storeId = dao.storeId,
    orderInSection = dao.orderInSection,
    arrivalTime = dao.arrivalTime?.toKotlinLocalDateTime()
)

// Optional: Mapping function from model to DAO
fun storeStopPointsModelToDAO(storeStopPoint: StoreStopPoint): StoreStopPointsDAO {
    return StoreStopPointsDAO.new(storeStopPoint.id) {
        transportSectionId = storeStopPoint.transportSectionId
        storeId = storeStopPoint.storeId
        orderInSection = storeStopPoint.orderInSection
        arrivalTime = storeStopPoint.arrivalTime?.toJavaLocalDateTime()
    }
}
