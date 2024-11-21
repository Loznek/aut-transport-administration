
package com.transportmanagement.model.entity


import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class Driver(
    val id: Int,
    val name: String,
    val dateOfBirth: LocalDateTime,
    val dayOffInTheWeek: Int,
    val homeSiteId: Int,
    val active: Boolean
)