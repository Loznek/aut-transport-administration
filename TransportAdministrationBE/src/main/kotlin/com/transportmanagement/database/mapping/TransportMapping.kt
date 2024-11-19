import com.transportmanagement.database.mapping.SiteTable
import com.transportmanagement.model.entity.Transport
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.dao.id.EntityID

// Table definition using IntIdTable
object TransportTable : IntIdTable("transport") {
    val startSiteId = integer("start_site_id").references(SiteTable.id)
    val destinationSiteId = integer("destination_site_id").references(SiteTable.id)
    val truckId = integer("truck_id").references(TruckTable.id)  // Corrected reference to truck table
}

// DAO class with an integer primary key
class TransportDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<TransportDAO>(TransportTable)

    var startSiteId by TransportTable.startSiteId
    var destinationSiteId by TransportTable.destinationSiteId
    var truckId by TransportTable.truckId
}

// Mapping function from DAO to model
fun daoToModel(dao: TransportDAO): Transport = Transport(
    id = dao.id.value,                  // Include the ID field here
    startSiteId = dao.startSiteId,
    destinationSiteId = dao.destinationSiteId,
    truckId = dao.truckId
)

// Optional: Mapping function from model to DAO
fun modelToDAO(transport: Transport): TransportDAO {
    return TransportDAO.new(transport.id) {
        startSiteId = transport.startSiteId
        destinationSiteId = transport.destinationSiteId
        truckId = transport.truckId
    }
}