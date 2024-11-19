import com.transportmanagement.model.entity.Cargo
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.dao.id.EntityID

// Table definition
object CargoTable : IntIdTable("cargo") {
    val name = varchar("name", 255) // Adjust size as needed
    val volume = double("volume")
    val weight = double("weight")
}

// DAO class
class CargoDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<CargoDAO>(CargoTable)

    var name by CargoTable.name
    var volume by CargoTable.volume
    var weight by CargoTable.weight
}

// Mapping function from DAO to model
fun daoToModel(dao: CargoDAO): Cargo = Cargo(
    id = dao.id.value,           // Include the ID field here
    name = dao.name,
    volume = dao.volume,
    weight = dao.weight
)

// Optional: Mapping function from model to DAO
fun modelToDAO(cargo: Cargo): CargoDAO {
    return CargoDAO.new(cargo.id) {
        name = cargo.name
        volume = cargo.volume
        weight = cargo.weight
    }
}