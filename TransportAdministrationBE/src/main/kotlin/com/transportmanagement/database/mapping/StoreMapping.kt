package com.transportmanagement.database.mapping

import com.transportmanagement.model.entity.Store
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

// Table definition
object StoreTable : IntIdTable("store") {
    val address = varchar("address", 255) // Adjust size as needed
    val name = varchar("name", 255) // Adjust size as needed
    val lat = double("lat")
    val lon = double("lon")
    val active = bool("active")
}

// DAO class
class StoreDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<StoreDAO>(StoreTable)

    var address by StoreTable.address
    var name by StoreTable.name
    var lat by StoreTable.lat
    var lon by StoreTable.lon
    var active by StoreTable.active
}

// Mapping function from DAO to model
fun storeDaoToModel(dao: StoreDAO): Store = Store(
    id = dao.id.value,
    name = dao.name,
    address = dao.address,
    lat = dao.lat,
    lon = dao.lon,
    active = dao.active
)

// Optional: Mapping function from model to DAO
fun storeModelToDAO(store: Store): StoreDAO {
    return StoreDAO.new(store.id) {
        address = store.address
        name = store.name
        lat = store.lat
        lon = store.lon
        active = store.active
    }
}