package fhnw.mip.histofy.instance

import fhnw.mip.histofy.comments.Comment
import fhnw.mip.histofy.tags.Tag
import jakarta.persistence.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.Transient

@Entity
@Table(name = "instance_metadata")
@Serializable
class InstanceMetaData(
    private var src: String? = null,
    private var originalURL: String? = null,
    private var magnification: Float = 0.0f,
    private var hue: Float = 0.0f,
    private var saturation: Float = 0.0f,
    private var brightness: Float = 0.0f,
    private var coverage: Float = 0.0f,
    @Id
    var uid: Long = 0
) {

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "instance_has_tag",
        joinColumns = [JoinColumn(name = "instance_id")],
        inverseJoinColumns = [JoinColumn(name = "tag_id")]
    )
    val tags: MutableSet<Tag> = HashSet()

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var comments: MutableSet<Comment> = HashSet()

    override fun toString(): String {
        return "Instance(src=$src, originalURL=$originalURL, magnification=$magnification, hue=$hue, saturation=$saturation, brightness=$brightness, coverage=$coverage, uid=$uid, tags=$tags, comments=$comments)"
    }
}
