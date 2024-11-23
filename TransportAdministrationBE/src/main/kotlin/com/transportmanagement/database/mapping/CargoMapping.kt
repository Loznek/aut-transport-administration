package com.transportmanagement.database.mapping

import com.transportmanagement.model.entity.Cargo
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

// Table definition
object CargoTable : IntIdTable("cargo") {
    val name = varchar("name", 255) // Adjust size as needed
    val volume = double("volume")
    val weight = double("weight")
    val delivered = bool("delivered")
    val destinationStoreId = integer("destination_id").references(StoreTable.id)
    val active = bool("active")
}

// DAO class
class CargoDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<CargoDAO>(CargoTable)

    var name by CargoTable.name
    var volume by CargoTable.volume
    var weight by CargoTable.weight
    var delivered by CargoTable.delivered
    var destinationStoreId by CargoTable.destinationStoreId
    var active by CargoTable.active
}

// Mapping function from DAO to model
fun cargoDaoToModel(dao: CargoDAO): Cargo = Cargo(
    id = dao.id.value,           // Include the ID field here
    name = dao.name,
    volume = dao.volume,
    weight = dao.weight,
    delivered = dao.delivered,
    destinationStoreId = dao.destinationStoreId,
    active = dao.active
)


suspend fun <T> suspendTransaction(block: Transaction.() -> T): T =
    newSuspendedTransaction(Dispatchers.IO, statement = block)
// Optional: Mapping function from model to DAO
fun cargoModelToDAO(cargo: Cargo): CargoDAO {
    return CargoDAO.new(cargo.id) {
        name = cargo.name
        volume = cargo.volume
        weight = cargo.weight
        delivered = cargo.delivered
        destinationStoreId = cargo.destinationStoreId
        active = cargo.active
    }
}