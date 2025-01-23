package fhnw.mip.histofy.instance

import jakarta.persistence.*
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@Entity
data class DicomInstance(
    @SerialName("FileSize")
    val fileSize: Long,

    @SerialName("FileUuid")
    val fileUuid: String,

    @SerialName("ID")
    val id: String,

    @SerialName("IndexInSeries")
    val indexInSeries: Int,

    @SerialName("MainDicomTags")
    @OneToOne(cascade = [CascadeType.ALL])
    val mainDicomTags: MainDicomTags, // One-to-one relationship

    @SerialName("ParentSeries")
    val parentSeries: String,

    @SerialName("Type")
    val type: String,
) {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var uid: Long? = null

    @OneToOne()
    var instanceMetaData: InstanceMetaData? = null

    override fun toString(): String {
        return "DicomInstance(fileSize=$fileSize, fileUuid='$fileUuid', id='$id', mainDicomTags=$mainDicomTags, parentSeries='$parentSeries', type='$type', instanceMetaData=$instanceMetaData)"
    }
}
