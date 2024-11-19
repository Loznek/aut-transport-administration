import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.javatime.timestamp
import java.time.LocalDateTime

// Table definition
object DriverTable : IntIdTable("driver") {
    val name = varchar("name", 255) // Adjust size as needed
    val dateOfBirth = datetime("date_of_birth")
    val dayOffInTheWeek = integer("day_off_in_the_week")
}

// DAO class
class DriverDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<DriverDAO>(DriverTable)

    var name by DriverTable.name
    var dateOfBirth by DriverTable.dateOfBirth
    var dayOffInTheWeek by DriverTable.dayOffInTheWeek
}

// Mapping function from DAO to model
fun daoToModel(dao: DriverDAO): Driver = Driver(
    id = dao.id.value,                // Include the ID field here
    name = dao.name,
    dateOfBirth = dao.dateOfBirth.toKotlinLocalDateTime(),
    dayOffInTheWeek = dao.dayOffInTheWeek
)

// Optional: Mapping function from model to DAO
fun modelToDAO(driver: Driver): DriverDAO {
    return DriverDAO.new(driver.id) {
        name = driver.name
        dateOfBirth = driver.dateOfBirth.toJavaLocalDateTime()
        dayOffInTheWeek = driver.dayOffInTheWeek
    }
}