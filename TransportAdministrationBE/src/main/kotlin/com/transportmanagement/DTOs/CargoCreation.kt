package com.transportmanagement.DTOs

import com.transportmanagement.model.entity.Cargo

class CargoCreation (
    val cargo: Cargo,
    val startSiteId: Int,
)