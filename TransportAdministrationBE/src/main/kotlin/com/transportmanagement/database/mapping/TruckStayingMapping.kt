package com.transportmanagement.database.mapping
import com.transportmanagement.model.entity.TruckStaying
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.datetime

// Table definition using IntIdTable
object TruckStayingTable : IntIdTable("truck_staying") {
    val siteId = integer("site_id").references(SiteTable.id)
    val truckId = integer("truck_id").references(TruckTable.id) // Adjust size as needed
    val arrivalTransportId = integer("arrival_transport_id").references(TransportTable.id).nullable()
    val arrivalTime = datetime("arrival_time")
    val startTransportId = integer("start_transport_id").references(TransportTable.id).nullable()
    val startTime = datetime("start_time").nullable()
}

// DAO class with an integer primary key
class TruckStayingDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<TruckStayingDAO>(TruckStayingTable)

    var siteId by TruckStayingTable.siteId
    var truckId by TruckStayingTable.truckId
    var arrivalTransportId by TruckStayingTable.arrivalTransportId
    var arrivalTime by TruckStayingTable.arrivalTime
    var startTransportId by TruckStayingTable.startTransportId
    var startTime by TruckStayingTable.startTime
}

// Mapping function from DAO to model
fun truckStayingDaoToModel(dao: TruckStayingDAO): TruckStaying = TruckStaying(
    id = dao.id.value,                        // Include the ID field here
    siteId = dao.siteId,
    truckId = dao.truckId,
    arrivalTransportId = dao.arrivalTransportId,
    arrivalTime = dao.arrivalTime.toKotlinLocalDateTime(),
    startTransportId = dao.startTransportId,
    startTime = dao.startTime?.toKotlinLocalDateTime()
)

// Optional: Mapping function from model to DAO
fun truckStayingModelToDAO(truckStaying: TruckStaying): TruckStayingDAO {
    return TruckStayingDAO.new(truckStaying.id) {
        siteId = truckStaying.siteId
        truckId = truckStaying.truckId
        arrivalTransportId = truckStaying.arrivalTransportId
        arrivalTime = truckStaying.arrivalTime.toJavaLocalDateTime()
        startTransportId = truckStaying.startTransportId
        startTime = truckStaying.startTime?.toJavaLocalDateTime()
    }
}
