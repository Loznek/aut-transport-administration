package com.transportmanagement.database.mapping


import com.transportmanagement.model.entity.Site
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

// Table definition
object SiteTable : IntIdTable("site") {

    val postalCode = integer("postal_code")
    val streetName = integer("street_name")
    val houseNumber = varchar("house_number", 255) // Adjust size as needed
    val active = bool("active")
}

// DAO class
class SiteDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<SiteDAO>(SiteTable)

    var postalCode by SiteTable.postalCode
    var streetName by SiteTable.streetName
    var houseNumber by SiteTable.houseNumber
    var active by SiteTable.active
}

// Mapping function from DAO to model
fun siteDaoToModel(dao: SiteDAO): Site = Site(
    id = dao.id.value,
    postalCode = dao.postalCode,
    streetName = dao.streetName,
    houseNumber = dao.houseNumber,
    active = dao.active
)

// Optional: Mapping function from model to DAO (useful for creating or updating entries)
fun siteModelToDAO(site: Site): SiteDAO {
    val dao = SiteDAO.new {
        postalCode = site.postalCode
        streetName = site.streetName
        houseNumber = site.houseNumber
        active = site.active
    }
    return dao
}