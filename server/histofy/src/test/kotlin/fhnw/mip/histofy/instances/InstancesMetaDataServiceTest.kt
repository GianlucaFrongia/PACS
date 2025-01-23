import fhnw.mip.histofy.exception.ResourceNotFoundException
import fhnw.mip.histofy.instance.InstanceMetaData
import fhnw.mip.histofy.instance.InstanceMetaDataService
import fhnw.mip.histofy.instance.InstancesMetaDataRepository
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.BDDMockito.given
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.http.HttpStatus
import java.util.*

@ExtendWith(MockitoExtension::class)
class InstancesMetaDataServiceTest {

    @Mock
    lateinit var instancesMetaDataRepository: InstancesMetaDataRepository

    @InjectMocks
    lateinit var instanceMetaDataService: InstanceMetaDataService

    @Test
    fun `findAll - empty list`() {
        given(instancesMetaDataRepository.findAll()).willReturn(emptyList())

        val result = instanceMetaDataService.findAll()

        assertEquals(HttpStatus.OK, result.statusCode)
        assertTrue(result.body!!.isEmpty())
    }

    @Test

    fun `findAll - non-empty list`() {
        val instances = listOf(InstanceMetaData(uid=1), InstanceMetaData(uid=2))
        given(instancesMetaDataRepository.findAll()).willReturn(instances)

        val result = instanceMetaDataService.findAll()

        assertEquals(HttpStatus.OK, result.statusCode)
        assertEquals(instances, result.body)
    }

    @Test
    fun `findSingleInstance - instance found`() {
        val id = 1L
        val expectedInstance = InstanceMetaData(uid=id)
        given(instancesMetaDataRepository.findById(id)).willReturn(Optional.of(expectedInstance))

        val result = instanceMetaDataService.findSingleInstance(id)

        assertEquals(HttpStatus.OK, result.statusCode)
        assertEquals(expectedInstance, result.body)
    }

    @Test
    fun `findSingleInstance - instance not found`() {
        val id = 1L
        given(instancesMetaDataRepository.findById(id)).willReturn(Optional.empty())

        val exception = assertThrows<ResourceNotFoundException> {
            instanceMetaDataService.findSingleInstance(id)
        }

        assertEquals("no such Instance with id: $id", exception.message)
    }

    @Test
    fun `findByUid - instance found`() {
        val uid = 1L
        val expectedInstance = InstanceMetaData(uid=uid)
        given(instancesMetaDataRepository.findById(uid)).willReturn(Optional.of(expectedInstance))

        val result = instanceMetaDataService.findByUid(uid)

        assertNotNull(result)
        assertEquals(expectedInstance, result)
    }

    @Test
    fun `findByUid - instance not found`() {
        val uid = 1L
        given(instancesMetaDataRepository.findById(uid)).willReturn(Optional.empty())

        val exception = assertThrows<ResourceNotFoundException> {
            instanceMetaDataService.findByUid(uid)
        }

        assertEquals("no such Instance with id: $uid", exception.message)
    }
}
