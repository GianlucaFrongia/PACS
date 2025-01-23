import fhnw.mip.histofy.exception.ResourceNotFoundException
import fhnw.mip.histofy.instance.InstanceMetaData
import fhnw.mip.histofy.instance.InstanceMetaDataService
import fhnw.mip.histofy.instance.InstancesMetaDataRepository
import fhnw.mip.histofy.tags.Tag
import fhnw.mip.histofy.tags.TagsRepository
import fhnw.mip.histofy.tags.TagsService
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.BDDMockito.given
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.util.*

@ExtendWith(MockitoExtension::class)
class TagServiceTest {

    @Mock
    lateinit var tagsRepository: TagsRepository

    @Mock
    lateinit var instancesMetaDataRepository: InstancesMetaDataRepository

    @InjectMocks
    lateinit var instanceMetaDataService: InstanceMetaDataService

    @InjectMocks
    lateinit var tagService: TagsService

    @Test
    fun `findAll - empty list`() {
        given(tagsRepository.count()).willReturn(0L)

        val result = tagService.findAll()

        assertEquals(HttpStatus.NO_CONTENT, result.statusCode)
        assertNull(result.body)
    }

    @Test
    fun `findAll - non-empty list`() {
        val tags = listOf(Tag("namespace1"), Tag("namespace2"))
        given(tagsRepository.count()).willReturn(tags.size.toLong())
        given(tagsRepository.findAll()).willReturn(tags)

        val result = tagService.findAll()

        assertEquals(HttpStatus.OK, result.statusCode)
        assertEquals(tags, result.body)
    }

    @Test
    fun `findById - tag found`() {
        val tagId = 1L
        val expectedTag = Tag("namespace")
        given(tagsRepository.findById(tagId)).willReturn(Optional.of(expectedTag))

        val result = tagService.findById(tagId)

        assertEquals(expectedTag, result)
    }

    @Test
    fun `findById - tag not found`() {
        val tagId = 1L
        given(tagsRepository.findById(tagId)).willReturn(Optional.empty())

        assertThrows(ResourceNotFoundException::class.java) {
            tagService.findById(tagId)
        }
    }

    @Test
    fun `findById - invalid tag ID`() {
        val invalidTagId = -1L

        assertThrows(IllegalArgumentException::class.java) {
            tagService.findById(invalidTagId)
        }
    }

    @Test
    fun `updateTag - existing tag`() {
        val namespace = "new_namespace"
        val existingTag = Tag("old_namespace")
        val updatedTag = existingTag.copy(namespace = namespace)
        val responseEntity = ResponseEntity(updatedTag, HttpStatus.OK)

        given(tagsRepository.findById(existingTag.id)).willReturn(Optional.of(existingTag))
        given(tagsRepository.saveAndFlush(any(Tag::class.java))).willReturn(updatedTag)

        val result = tagService.updateTag(existingTag.id, namespace)

        assertEquals(responseEntity.body?.namespace, result.body?.namespace)
        assertEquals(responseEntity.statusCode, result.statusCode)
    }

    @Test
    fun `updateTag - non-existing tag`() {
        val id = 1L
        val namespace = "new_namespace"

        given(tagsRepository.findById(id)).willReturn(Optional.empty())

        assertThrows(ResourceNotFoundException::class.java) {
            tagService.updateTag(id, namespace)
        }
    }

    @Test
    fun `deleteTag - existing tag`() {
        val existingTag = Tag("namespace")

        given(tagsRepository.existsById(existingTag.id)).willReturn(true)

        val instance = InstanceMetaData()
        given(instancesMetaDataRepository.findAll()).willReturn(listOf(instance))

        val result = tagService.deleteTag(existingTag.id)

        verify(tagsRepository, times(1)).deleteById(existingTag.id)
        verify(instancesMetaDataRepository, times(1)).saveAndFlush(instance)

        assertEquals(HttpStatus.NO_CONTENT, result.statusCode)
    }

    @Test
    fun `deleteTag - non-existing tag`() {
        val namespace = "new_namespace"
        val newTag = Tag(namespace)

        tagsRepository.saveAndFlush(newTag)
        given(tagsRepository.existsById(newTag.id)).willReturn(false)

        assertThrows(ResourceNotFoundException::class.java) {
            tagService.deleteTag(newTag.id)
        }
    }

    @Test
    fun `addTag - tag created successfully`() {
        `when`(tagsRepository.findAll()).thenReturn(emptyList())

        val namespace = "new_namespace"
        val responseEntity = tagService.addTag(namespace)

        verify(tagsRepository, times(1)).saveAndFlush(any())

        assertEquals(HttpStatus.CREATED, responseEntity.statusCode)
        assertEquals("new_namespace", responseEntity.body?.namespace)
    }

    @Test
    fun `addTag - tag already existing`() {
        val existingTag = Tag("existingNamespace")
        `when`(tagsRepository.findAll()).thenReturn(listOf(existingTag))

        val exception = assertThrows(ResourceNotFoundException::class.java) {
            tagService.addTag("existingNamespace")
        }

        verify(tagsRepository, never()).saveAndFlush(any())

        assertEquals("Tag with namespace: existingNamespace already exists", exception.message)
    }

    @Test
    fun `addTag - tag namespace to long`() {
        val longNamespace = "a".repeat(129)

        val exception = assertThrows(IllegalArgumentException::class.java) {
            tagService.addTag(longNamespace)
        }

        verify(tagsRepository, never()).saveAndFlush(any())

        assertEquals("Tag namespace is too long: $longNamespace", exception.message)
    }

    @Test
    fun `addTagToInstance - returns saved instance when instance and tag exist`() {
        val instance = InstanceMetaData()
        val tag = Tag("namespace")
        `when`(instancesMetaDataRepository.findById(anyLong())).thenReturn(Optional.of(instance))
        `when`(tagsRepository.findById(anyLong())).thenReturn(Optional.of(tag))
        `when`(instancesMetaDataRepository.save(any(InstanceMetaData::class.java))).thenReturn(instance)

        val response = instanceMetaDataService.addTagToInstance(instance.uid, tag.id)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(instance, response.body)
    }

    @Test
    fun `deleteTag - deleted Tag is not shown on instance`() {
        val instance = InstanceMetaData()
        val tag = Tag("namespace")
        given(instancesMetaDataRepository.findById(anyLong())).willReturn(Optional.of(instance))
        given(tagsRepository.findById(anyLong())).willReturn(Optional.of(tag))
        `when`(instancesMetaDataRepository.save(any(InstanceMetaData::class.java))).thenReturn(instance)

        instanceMetaDataService.addTagToInstance(instance.uid, tag.id)

        instanceMetaDataService.removeTagFromInstance(instance.uid ,tag.id)
        instancesMetaDataRepository.saveAndFlush(instance)

        assert(!instance.tags.contains(tag))
    }
}
