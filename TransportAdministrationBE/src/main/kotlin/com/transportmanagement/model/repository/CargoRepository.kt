

import com.transportmanagement.DTOs.CargoWithArrivalTime
import com.transportmanagement.database.mapping.*
import com.transportmanagement.model.entity.Cargo
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.update

class CargoRepository {

    // Retrieves a cargo item by its ID
    suspend fun cargoById(id: Int): Cargo? = suspendTransaction {
        CargoDAO.find{(CargoTable.id eq id)}.map(::cargoDaoToModel).firstOrNull()
    }

    // Adds a new cargo entry to the database
    suspend fun addCargo(cargo: Cargo): Int = suspendTransaction {
        val newCargo= CargoDAO.new {
            this.name = cargo.name
            this.volume = cargo.volume
            this.weight = cargo.weight
            this.active = true
            this.destinationStoreId = cargo.destinationStoreId
            this.delivered = false
        }
        newCargo.id.value
    }

    // Removes a cargo entry by its ID, returning true if successful
    suspend fun removeCargoById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = CargoTable.deleteWhere {
            CargoTable.id eq id
        }
        rowsDeleted == 1
    }



    // Updates an existing cargo entry based on the provided model
    /*
    suspend fun updateCargo(cargo: Cargo) {
        suspendTransaction {
            val cargoDAO = CargoDAO.findById(cargo.id) ?: return@suspendTransaction
            cargoDAO.name = cargo.name
            cargoDAO.volume = cargo.volume
            cargoDAO.weight = cargo.weight
            cargoDAO.destinationStoreId = cargo.destinationStoreId
            cargoDAO.delivered = cargo.delivered
        }
    }*/

    suspend fun getAvailableCargoWithArrivalTime(siteId: Int): List<CargoWithArrivalTime> = suspendTransaction {
        CargoStayingDAO.find {
            CargoStayingTable.siteId eq siteId and CargoStayingTable.startTransportId.isNull()
        }.mapNotNull { staying ->
            val cargo = staying.cargoId.let { CargoDAO.findById(it) }?.let(::cargoDaoToModel)
            cargo?.let {
                CargoWithArrivalTime(
                    cargo = it,
                    arrivalTime = staying.arrivalTime.toKotlinLocalDateTime()
                )
            }
        }
    }

    suspend fun deactivateCargoById(cargoId: Int): Boolean {
        return suspendTransaction {
            val cargo = CargoDAO.findById(cargoId) ?: return@suspendTransaction false
            cargo.active = false
            true
        }

    }

    suspend fun noteDeliveredCargo(cargoIds: List<Int>) {
        suspendTransaction {
            CargoTable.update({ CargoTable.id inList cargoIds }) {
                it[delivered] = true
            }

        }
    }

    suspend fun restoreCargoDeliveredState(cargoIds: List<Int>) {
        suspendTransaction {
            CargoTable.update({ CargoTable.id inList cargoIds and CargoTable.delivered.eq(true) }) {
                it[delivered] = false
            }
        }
    }

    suspend fun getDeliveredCargos(cargoIds: List<Int>, storeIds: List<Int>): List<Int?> {
        return suspendTransaction {
            CargoDAO.find { (CargoTable.id inList cargoIds) and (CargoTable.destinationStoreId inList storeIds) }.map { it.id.value }
        }
    }

    suspend fun getAllActiveCargos(): List<Cargo> = suspendTransaction {
        CargoDAO.find { CargoTable.active eq true }.map(::cargoDaoToModel)

    }

    suspend fun getAllCargos(): List<Cargo> = suspendTransaction {
        CargoDAO.all().map(::cargoDaoToModel)

    }

    suspend fun getNotDeliveredCargos(): List<Cargo> = suspendTransaction {
        CargoDAO.find { CargoTable.delivered eq false and (CargoTable.active eq true) }.map(::cargoDaoToModel)

    }

    suspend fun getCargosByDestinationStoreId(storeId: Int): List<Cargo> = suspendTransaction {
        CargoDAO.find { CargoTable.destinationStoreId eq storeId and (CargoTable.active eq true) and (CargoTable.delivered eq false) }.map(::cargoDaoToModel)

    }


}
