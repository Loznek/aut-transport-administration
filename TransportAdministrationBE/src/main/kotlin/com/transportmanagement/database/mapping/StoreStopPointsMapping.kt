import com.transportmanagement.model.entity.StoreStopPoint
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.dao.id.EntityID

// Table definition using IntIdTable
object StoreStopPointTable : IntIdTable("store_stop_points") {
    val transportSectionId = integer("transport_section_id").references(TransportSectionTable.id)
    val storeId = integer("store_id").references(StoreTable.id)
    val orderInSection = integer("order_in_section")
}

// DAO class with an integer primary key
class StoreStopPointDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<StoreStopPointDAO>(StoreStopPointTable)

    var transportSectionId by StoreStopPointTable.transportSectionId
    var storeId by StoreStopPointTable.storeId
    var orderInSection by StoreStopPointTable.orderInSection
}

// Mapping function from DAO to model
fun daoToModel(dao: StoreStopPointDAO): StoreStopPoint = StoreStopPoint(
    id = dao.id.value,                    // Include the ID field here
    transportSectionId = dao.transportSectionId,
    storeId = dao.storeId,
    orderInSection = dao.orderInSection
)

// Optional: Mapping function from model to DAO
fun modelToDAO(storeStopPoint: StoreStopPoint): StoreStopPointDAO {
    return StoreStopPointDAO.new(storeStopPoint.id) {
        transportSectionId = storeStopPoint.transportSectionId
        storeId = storeStopPoint.storeId
        orderInSection = storeStopPoint.orderInSection
    }
}
