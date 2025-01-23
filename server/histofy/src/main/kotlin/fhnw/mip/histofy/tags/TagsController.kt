package fhnw.mip.histofy.tags

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["http://localhost:5173", "https://v000563.fhnw.ch"])
@RequestMapping("/api")
class StudyController {
    @Autowired
    lateinit var tagsService: TagsService

    @GetMapping("/tags")
    fun index(): ResponseEntity<List<Tag>> {
        return tagsService.findAll()
    }

    @PostMapping("/tags")
    fun addTagToRepo(@RequestBody payload: Tag): ResponseEntity<Tag> {
        return tagsService.addTag(payload.namespace)
    }

    @PutMapping("/tags/{id}")
    fun updateTag(@PathVariable id: Long, @RequestBody payload: Tag): ResponseEntity<Tag> {
        return tagsService.updateTag(id, payload.namespace)
    }

    @DeleteMapping("/tags/{id}")
    fun deleteTag(@PathVariable id: Long): ResponseEntity<Tag> {
        return tagsService.deleteTag(id)
    }
}
