package fhnw.mip.histofy.instance

import fhnw.mip.histofy.comments.Comment
import fhnw.mip.histofy.comments.CommentsRepository
import fhnw.mip.histofy.exception.ResourceNotFoundException
import fhnw.mip.histofy.tags.TagsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class InstanceMetaDataService {
    @Autowired
    lateinit var tagsRepository: TagsRepository

    @Autowired
    lateinit var instancesMetaDataRepository: InstancesMetaDataRepository

    @Autowired
    lateinit var commentsRepository: CommentsRepository

    fun addTagToInstance(instanceId: Long, tagId: Long): ResponseEntity<InstanceMetaData> {
        val instance =
            instancesMetaDataRepository.findById(instanceId)
                .orElseThrow { throw ResourceNotFoundException("Instance with ID $instanceId not found") }
        val tag = tagsRepository.findById(tagId)
            .orElseThrow { throw ResourceNotFoundException("Tag with ID $tagId not found") }

        instance.tags.add(tag)
        tag.instanceMetaDataIds.add(instanceId)

        val savedInstance = instancesMetaDataRepository.save(instance)
        tagsRepository.save(tag)
        return ResponseEntity(savedInstance, HttpStatus.OK)
    }

    fun removeTagFromInstance(instanceId: Long, tagId: Long): ResponseEntity<InstanceMetaData> {
        val instance =
            instancesMetaDataRepository.findById(instanceId)
                .orElseThrow { throw ResourceNotFoundException("Instance with ID $instanceId not found") }
        val tag = tagsRepository.findById(tagId)
            .orElseThrow { throw ResourceNotFoundException("Tag with ID $tagId not found") }

        instance.tags.remove(tag)
        tag.instanceMetaDataIds.remove(instanceId)
        val savedInstance = instancesMetaDataRepository.save(instance)
        tagsRepository.save(tag)
        return ResponseEntity(savedInstance, HttpStatus.OK)
    }

    fun findAll(): ResponseEntity<List<InstanceMetaData>> {
        return ResponseEntity(instancesMetaDataRepository.findAll(), HttpStatus.OK)
    }

    fun findSingleInstance(id: Long): ResponseEntity<InstanceMetaData> {
        val instance = instancesMetaDataRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("no such Instance with id: $id") }
        return ResponseEntity(instance, HttpStatus.OK)
    }

    fun addCommentToInstance(id: Long, comment: Comment): ResponseEntity<MutableSet<Comment>> {
        val instance = instancesMetaDataRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("no such Instance with id: $id") }
        println(id)
        commentsRepository.saveAndFlush(comment)
        instance.comments.add(comment)
        val savedInstance = instancesMetaDataRepository.saveAndFlush(instance)
        return ResponseEntity(savedInstance.comments, HttpStatus.OK)
    }

    fun removeCommentFromInstance(id: Long, commentId: Long): ResponseEntity<InstanceMetaData> {
        val instance = instancesMetaDataRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("no such Instance with id: $id") }
        val comment = commentsRepository.findById(commentId)
            .orElseThrow { ResourceNotFoundException("no such Comment with id: $commentId") }
        instance.comments.remove(comment)
        commentsRepository.delete(comment)
        val savedInstance = instancesMetaDataRepository.saveAndFlush(instance)
        return ResponseEntity(savedInstance, HttpStatus.OK)
    }

    fun findByUid(uid: Long): InstanceMetaData {
        val instance = instancesMetaDataRepository.findById(uid)
            .orElseThrow { ResourceNotFoundException("no such Instance with id: $uid") }

        return instance
    }
}