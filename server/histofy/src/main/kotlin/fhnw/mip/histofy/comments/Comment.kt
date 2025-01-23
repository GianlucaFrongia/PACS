package fhnw.mip.histofy.comments

import com.fasterxml.jackson.annotation.JsonBackReference
import fhnw.mip.histofy.instance.InstanceMetaData
import jakarta.persistence.*
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.Transient
import java.text.Format
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Entity
@Serializable
class Comment(
    @SerialName("comment")
    private var comment: String = "",
    @SerialName("author")
    private var author: String = ""
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0


    var createdAt: String = LocalDateTime.now().toString()

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    private val instance: InstanceMetaData? = null

    override fun toString(): String {
        return "Comment(id=$id, comment='$comment', createdAt=$createdAt, author='$author')"
    }
}