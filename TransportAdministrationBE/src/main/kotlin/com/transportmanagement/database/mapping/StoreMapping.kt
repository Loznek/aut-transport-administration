package com.transportmanagement.database.mapping

import com.transportmanagement.model.entity.Store
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

// Table definition
object StoreTable : IntIdTable("store") {
    val postalCode = integer("postal_code")
    val streetName = varchar("street_name", 255) // Adjust size as needed
    val houseNumber = varchar("house_number", 255) // Adjust size as needed
    val active = bool("active")
}

// DAO class
class StoreDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<StoreDAO>(StoreTable)

    var postalCode by StoreTable.postalCode
    var streetName by StoreTable.streetName
    var houseNumber by StoreTable.houseNumber
    var active by StoreTable.active
}

// Mapping function from DAO to model
fun storeDaoToModel(dao: StoreDAO): Store = Store(
    id = dao.id.value,                // Include the ID field here
    postalCode = dao.postalCode,
    streetName = dao.streetName,
    houseNumber = dao.houseNumber,
    active = dao.active
)

// Optional: Mapping function from model to DAO
fun storeModelToDAO(store: Store): StoreDAO {
    return StoreDAO.new(store.id) {
        postalCode = store.postalCode
        streetName = store.streetName
        houseNumber = store.houseNumber
        active = store.active
    }
}