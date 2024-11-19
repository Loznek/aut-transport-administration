package com.transportmanagement.database.mapping

import Site
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.dao.id.EntityID

// Table definition
object SiteTable : IntIdTable("site") {

    val postalCode = integer("postal_code")
    val streetName = integer("street_name")
    val houseNumber = varchar("house_number", 255) // Adjust size as needed
}

// DAO class
class SiteDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<SiteDAO>(SiteTable)

    var postalCode by SiteTable.postalCode
    var streetName by SiteTable.streetName
    var houseNumber by SiteTable.houseNumber
}

// Mapping function from DAO to model
fun daoToModel(dao: SiteDAO): Site = Site(
    id = dao.id.value,
    postalCode = dao.postalCode,
    streetName = dao.streetName,
    houseNumber = dao.houseNumber
)

// Optional: Mapping function from model to DAO (useful for creating or updating entries)
fun modelToDAO(site: Site): SiteDAO {
    val dao = SiteDAO.new {
        postalCode = site.postalCode
        streetName = site.streetName
        houseNumber = site.houseNumber
    }
    return dao
}