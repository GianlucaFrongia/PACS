package fhnw.mip.histofy.tags

import fhnw.mip.histofy.exception.ResourceNotFoundException
import fhnw.mip.histofy.instance.InstancesMetaDataRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Service
@Transactional
class TagsService {
    @Autowired
    lateinit var tagsRepository: TagsRepository

    @Autowired
    lateinit var instancesMetaDataRepository: InstancesMetaDataRepository

    fun findAll(): ResponseEntity<List<Tag>> {
        if (tagsRepository.count() == 0L) {
            return ResponseEntity(HttpStatus.NO_CONTENT)
        }
        return ResponseEntity(tagsRepository.findAll(), HttpStatus.OK)
    }

    fun findById(id: Long): Tag {
        require(id >= 0L) {
            throw IllegalArgumentException("Invalid Tag ID: $id")
        }
        return tagsRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("no such Tag with id: $id") }
    }

    fun updateTag(id: Long, namespace: String): ResponseEntity<Tag> {
        val tag = tagsRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("no such Tag with id: $id") }
        tag.namespace = namespace
        tagsRepository.saveAndFlush(tag)
        return ResponseEntity(tag, HttpStatus.OK)
    }

    fun deleteTag(id: Long): ResponseEntity<Tag> {
        if (!tagsRepository.existsById(id)) {
            throw ResourceNotFoundException("no such Tag with id: $id")
        } else {
            tagsRepository.deleteById(id)
            for (instance in instancesMetaDataRepository.findAll()) {
                instance.tags.removeIf { it.id == id }
                instancesMetaDataRepository.saveAndFlush(instance)
            }
            return ResponseEntity(HttpStatus.NO_CONTENT)
        }
    }

    fun addTag(namespace: String): ResponseEntity<Tag> {
        require(namespace.length < 128) {
            throw IllegalArgumentException("Tag namespace is too long: $namespace")
        }

        val newTag = Tag(namespace)
        // check if tag already exists
        if (tagsRepository.findAll().any { it.namespace == newTag.namespace }) {
            throw ResourceNotFoundException("Tag with namespace: ${newTag.namespace} already exists")
        }
        tagsRepository.saveAndFlush(newTag)
        return ResponseEntity(newTag, HttpStatus.CREATED)
    }
}
