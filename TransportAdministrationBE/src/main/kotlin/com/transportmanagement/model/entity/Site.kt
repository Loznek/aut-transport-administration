import kotlinx.serialization.Serializable


@Serializable
data class Site(
    val id: Int,
    val postalCode: Int,
    val streetName: Int,
    val houseNumber: String
)