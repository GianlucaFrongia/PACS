package fhnw.mip.histofy.instance

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable


@Serializable
@Entity
data class MainDicomTags(
    @SerialName("ImageComments")
    val imageComments: String,
    @SerialName("InstanceNumber")
    val instanceNumber: String,
    @SerialName("SOPInstanceUID")
    @Id
    val sopInstanceUid: String,
)
