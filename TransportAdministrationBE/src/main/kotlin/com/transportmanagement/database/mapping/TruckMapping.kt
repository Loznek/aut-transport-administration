package com.transportmanagement.database.mapping

import com.transportmanagement.model.entity.Truck
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

// Table definition using IntIdTable
object TruckTable : IntIdTable("truck") {
    val licensePlate = varchar("license_plate", 255) // Adjust size as needed
    val type = varchar("type", 255) // Adjust size as needed
    val volumeCapacity = double("volume_capacity")
    val weightCapacity = double("weight_capacity")
    val active = bool("active")
}

// DAO class with an integer primary key
class TruckDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<TruckDAO>(TruckTable)

    var licensePlate by TruckTable.licensePlate
    var type by TruckTable.type
    var volumeCapacity by TruckTable.volumeCapacity
    var weightCapacity by TruckTable.weightCapacity
    var active by TruckTable.active
}

// Mapping function from DAO to model
fun truckDaoToModel(dao: TruckDAO): Truck = Truck(
    id = dao.id.value,               // Use the integer ID directly
    licensePlate = dao.licensePlate,
    type = dao.type,
    volumeCapacity = dao.volumeCapacity,
    weightCapacity = dao.weightCapacity,
    active = dao.active
)

// Optional: Mapping function from model to DAO
fun truckModelToDAO(truck: Truck): TruckDAO {
    return TruckDAO.new(truck.id) {
        licensePlate = truck.licensePlate
        type = truck.type
        volumeCapacity = truck.volumeCapacity
        weightCapacity = truck.weightCapacity
        active = truck.active
    }
}
