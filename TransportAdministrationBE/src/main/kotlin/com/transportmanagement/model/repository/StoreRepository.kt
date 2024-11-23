package com.transportmanagement.model.repository

import com.transportmanagement.database.mapping.StoreDAO
import com.transportmanagement.database.mapping.StoreTable
import com.transportmanagement.database.mapping.storeDaoToModel
import com.transportmanagement.database.mapping.suspendTransaction
import com.transportmanagement.model.entity.Store
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere

class StoreRepository {

    // Retrieves a store by its ID
    suspend fun storeById(id: Int): Store? = suspendTransaction {
        StoreDAO.find { (StoreTable.id eq id) }.map(::storeDaoToModel).firstOrNull()
    }

    // Adds a new store entry to the database
    suspend fun addStore(store: Store): Unit = suspendTransaction {
        StoreDAO.new {
            this.name = store.name
            this.lat = store.lat
            this.lon = store.lon
            this.address = store.address
            this.active = true
        }
    }

    // Removes a store entry by its ID, returning true if successful
    suspend fun removeStoreById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = StoreTable.deleteWhere {
            StoreTable.id eq id
        }
        rowsDeleted == 1
    }

    // Updates an existing store entry based on the provided model
    /*
    suspend fun updateStore(store: Store) {
        suspendTransaction {
            val storeDAO = StoreDAO.findById(store.id) ?: return@suspendTransaction
            storeDAO.name = store.name
            storeDAO.lat = store.lat
            storeDAO.lon = store.lon
            storeDAO.address = store.address
        }
    }
    */
    // Retrieves all stores
    suspend fun getAllStores(): List<Store> = suspendTransaction {
        StoreDAO.all().map(::storeDaoToModel)
    }

    suspend fun getActiveStores(): List<Store> = suspendTransaction {
        StoreDAO.find { StoreTable.active eq true }.map(::storeDaoToModel)
    }

    suspend fun deactivateStoreById(id: Int): Boolean = suspendTransaction {
        val store = StoreDAO.findById(id) ?: return@suspendTransaction false
        store.active = false
        true
    }

    suspend fun getAllActiveStores(): List<Store> = suspendTransaction {
        StoreDAO.find { StoreTable.active eq true }.map(::storeDaoToModel)
    }


}
