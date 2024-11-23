package com.transportmanagement.model.repository



import com.transportmanagement.database.mapping.SiteDAO
import com.transportmanagement.database.mapping.SiteTable
import com.transportmanagement.database.mapping.siteDaoToModel

import com.transportmanagement.database.mapping.suspendTransaction
import com.transportmanagement.model.entity.Site
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere

class SiteRepository {

    // Retrieves a site by its ID
    suspend fun siteById(id: Int): Site? = suspendTransaction {
        SiteDAO.find{(SiteTable.id eq id)}.map(::siteDaoToModel).firstOrNull()
    }

    // Adds a new site entry to the database
    suspend fun addSite(site: Site): Unit = suspendTransaction {
        SiteDAO.new {
            this.name = site.name
            this.lon = site.lon
            this.lat = site.lat
            this.address = site.address
            this.active = true
        }
    }

    // Removes a site entry by its ID, returning true if successful
    suspend fun removeSiteById(id: Int): Boolean = suspendTransaction {
        val rowsDeleted = SiteTable.deleteWhere {
            SiteTable.id eq id
        }
        rowsDeleted == 1
    }

    // Updates an
    /* existing site entry based on the provided model
    suspend fun updateSite(site: Site) {
        suspendTransaction {
            val siteDAO = SiteDAO.findById(site.id) ?: return@suspendTransaction
            siteDAO.name = site.name
            siteDAO.lon = site.lon
            siteDAO.lat = site.lat
            siteDAO.address = site.address
        }
    }

     */

    // Retrieves all sites
    suspend fun getAllSites(): List<Site> = suspendTransaction {
        SiteDAO.all().map(::siteDaoToModel)
    }

    suspend fun getActiveSites(): List<Site> = suspendTransaction {
        SiteDAO.find { SiteTable.active eq true }.map(::siteDaoToModel)
    }

    suspend fun deactivateSiteById(toInt: Int): Boolean {
        return suspendTransaction {
            val site = SiteDAO.findById(toInt) ?: return@suspendTransaction false
            site.active = false
            true
        }
    }

    suspend fun getAllActiveSites(): List<Site> = suspendTransaction {
        SiteDAO.find { SiteTable.active eq true }.map(::siteDaoToModel)

    }

}
