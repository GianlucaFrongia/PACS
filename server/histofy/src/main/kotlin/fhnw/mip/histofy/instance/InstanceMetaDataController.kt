package fhnw.mip.histofy.instance

import fhnw.mip.histofy.comments.Comment
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ClassPathResource
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["http://localhost:5173", "https://v000563.fhnw.ch/"])
class InstanceMetaDataController {
    @Autowired
    lateinit var instanceMetaDataService: InstanceMetaDataService

    @Autowired
    private lateinit var instanceRepository: InstanceRepository

    @GetMapping("/instances")
    fun getInstances(
    ): ResponseEntity<List<DicomInstance>> {
        return ResponseEntity(instanceRepository.findAll(), HttpStatus.OK)
    }

    @GetMapping("/instances/{uid}")
    fun getSingleInstances(
        @PathVariable uid: Long
    ): ResponseEntity<DicomInstance> {
        val instance = instanceRepository.findByInstanceMetaDataUid(uid)
        return ResponseEntity(instance, HttpStatus.OK)
    }

    @GetMapping("/instances_metadata")
    fun index(): ResponseEntity<List<InstanceMetaData>> {
        return instanceMetaDataService.findAll()
    }

    @GetMapping("/instances_metadata", params = ["descriptionsCollection"])
    fun getInstancesMetadata(@RequestParam("descriptionsCollection") descriptionsCollection: String): ResponseEntity<String> {
        val file = ClassPathResource("data/descriptionCollection.json").file
        val jsonString = file.readText()
        return ResponseEntity(jsonString, HttpStatus.OK)
    }

    @GetMapping("/instances_metadata/{id}")
    fun getSingleInstancesMetadata(@PathVariable id: Long): ResponseEntity<InstanceMetaData> {
        return instanceMetaDataService.findSingleInstance(id)
    }

    @PostMapping("/instances_metadata/{id}/tags/{tagId}")
    fun addTagToInstance(@PathVariable id: Long, @PathVariable tagId: Long): ResponseEntity<InstanceMetaData> {
        return instanceMetaDataService.addTagToInstance(id, tagId)
    }

    @PostMapping("/instances_metadata/{id}/comments/")
    fun addCommentToInstance(@PathVariable id: Long, @RequestBody comment: Comment): ResponseEntity<MutableSet<Comment>> {
        println(comment)
        println(id)
        return instanceMetaDataService.addCommentToInstance(id, comment)
    }

    @DeleteMapping("/instances_metadata/{id}/comments/{commentId}")
    fun removeCommentFromInstance(
        @PathVariable id: Long,
        @PathVariable commentId: Long
    ): ResponseEntity<InstanceMetaData> {
        return instanceMetaDataService.removeCommentFromInstance(id, commentId)
    }

    @DeleteMapping("/instances_metadata/{id}/tags/{tagId}")
    fun removeTagFromInstance(@PathVariable id: Long, @PathVariable tagId: Long): ResponseEntity<InstanceMetaData> {
        return instanceMetaDataService.removeTagFromInstance(id, tagId)
    }
}
