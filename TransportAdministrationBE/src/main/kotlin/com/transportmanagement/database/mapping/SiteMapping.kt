package com.transportmanagement.database.mapping


import com.transportmanagement.model.entity.Site
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

// Table definition
object SiteTable : IntIdTable("site") {
    val name = varchar("name", 255) // Adjust size as needed
    val lon = double("lon")
    val lat = double("lat")
    val address = varchar("address", 255) // Adjust size as needed
    val active = bool("active")
}

// DAO class
class SiteDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<SiteDAO>(SiteTable)
    var name by SiteTable.name
    var lon by SiteTable.lon
    var lat by SiteTable.lat
    var address by SiteTable.address
    var active by SiteTable.active
}

// Mapping function from DAO to model
fun siteDaoToModel(dao: SiteDAO): Site = Site(
    id = dao.id.value,
    name = dao.name,
    lon = dao.lon,
    lat = dao.lat,
    address = dao.address,
    active = dao.active
)

// Optional: Mapping function from model to DAO (useful for creating or updating entries)
fun siteModelToDAO(site: Site): SiteDAO {
    val dao = SiteDAO.new {
        name = site.name
        lon = site.lon
        lat = site.lat
        address = site.address
        active = site.active
    }
    return dao
}