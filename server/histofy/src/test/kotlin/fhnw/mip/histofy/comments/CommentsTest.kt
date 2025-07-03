import fhnw.mip.histofy.comments.Comment
import fhnw.mip.histofy.comments.CommentsRepository
import fhnw.mip.histofy.exception.ResourceNotFoundException
import fhnw.mip.histofy.instance.InstanceMetaData
import fhnw.mip.histofy.instance.InstanceMetaDataService
import fhnw.mip.histofy.instance.InstancesMetaDataRepository
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
class CommentsTest {

    @Mock
    private lateinit var instancesMetaDataRepository: InstancesMetaDataRepository

    @InjectMocks
    private lateinit var instanceMetaDataService: InstanceMetaDataService

    private val commentsRepository: CommentsRepository = mock(CommentsRepository::class.java)

    @Test
    fun `addCommentToInstance returns saved instance with added comment`() {
        // Given
        val instance = InstanceMetaData()
        val comment = Comment()
        `when`(instancesMetaDataRepository.findById(anyLong())).thenReturn(Optional.of(instance))
        `when`(commentsRepository.saveAndFlush(any(Comment::class.java))).thenReturn(comment)
        `when`(instancesMetaDataRepository.saveAndFlush(any(InstanceMetaData::class.java))).thenReturn(instance)

        // When
        val result = instanceMetaDataService.addCommentToInstance(1L, comment)

        // Then
        assertEquals(ResponseEntity(instance.comments, HttpStatus.OK), result)
        assertTrue(instance.comments.contains(comment))
    }

    @Test
    fun `removeCommentFromInstance returns saved instance without the removed comment`() {
        // Given
        val instance = InstanceMetaData()
        val comment = Comment()
        instance.comments.add(comment)
        `when`(instancesMetaDataRepository.findById(anyLong())).thenReturn(Optional.of(instance))
        `when`(commentsRepository.findById(anyLong())).thenReturn(Optional.of(comment))
        `when`(instancesMetaDataRepository.saveAndFlush(any(InstanceMetaData::class.java))).thenReturn(instance)

        // When
        val result = instanceMetaDataService.removeCommentFromInstance(1L, 1L)

        // Then
        assertEquals(ResponseEntity(instance, HttpStatus.OK), result)
        assertFalse(instance.comments.contains(comment))
    }
}
