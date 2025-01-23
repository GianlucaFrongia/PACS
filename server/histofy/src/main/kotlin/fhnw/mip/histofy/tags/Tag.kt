package fhnw.mip.histofy.tags

import jakarta.persistence.*
import kotlinx.serialization.Serializable

@Entity
@Serializable
class Tag(var namespace: String) {
    fun copy(namespace: String): Tag {
        return Tag(namespace)
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0

    @ElementCollection
    @CollectionTable(
        name = "tag_instance_ids", joinColumns =  [JoinColumn(name = "tag_id")]
    )
    @Column(name = "instance_id")
    val instanceMetaDataIds: MutableSet<Long> = HashSet()

    override fun toString(): String {
        return "Tag(namespace=$namespace, id=$id, instanceMetaDataIds=$instanceMetaDataIds)"
    }
}