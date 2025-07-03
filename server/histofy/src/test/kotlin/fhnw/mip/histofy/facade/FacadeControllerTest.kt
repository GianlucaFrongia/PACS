package fhnw.mip.histofy.facade

import fhnw.mip.histofy.instance.InstanceMetaDataService
import jakarta.servlet.http.HttpServletRequest
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import org.springframework.core.env.Environment
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.client.RestTemplate
import java.net.URI

class FacadeControllerTest {

    private val environment: Environment = mock(Environment::class.java)
    private val instanceMetaDataService: InstanceMetaDataService = mock(InstanceMetaDataService::class.java)
    private val facadeController = FacadeController()

    @Test
    fun `index returns correct response in dev environment`() {
        // Given
        val request: HttpServletRequest = mock(HttpServletRequest::class.java)
        val restTemplate: RestTemplate = mock(RestTemplate::class.java)
        val headers: HttpHeaders = mock(HttpHeaders::class.java)
        `when`(environment.activeProfiles).thenReturn(arrayOf("dev"))
        `when`(request.requestURI).thenReturn("/server/orthanc/instances?expand")
        `when`(restTemplate.exchange(any(URI::class.java), any(), any(), eq(ByteArray::class.java)))
            .thenReturn(ResponseEntity(ByteArray(0), HttpStatus.OK))

        // When
        val result = facadeController.index(request, restTemplate, emptyMap(), headers)

        // Then
        assertEquals(HttpStatus.OK, result.statusCode)
    }

    @Test
    fun `index returns correct response in non-dev environment`() {
        // Given
        val request: HttpServletRequest = mock(HttpServletRequest::class.java)
        val restTemplate: RestTemplate = mock(RestTemplate::class.java)
        val headers: HttpHeaders = mock(HttpHeaders::class.java)
        `when`(environment.activeProfiles).thenReturn(arrayOf("prod"))
        `when`(request.requestURI).thenReturn("/orthanc/instances?expand")
        `when`(restTemplate.exchange(any(URI::class.java), any(), any(), eq(ByteArray::class.java)))
            .thenReturn(ResponseEntity(ByteArray(0), HttpStatus.OK))

        // When
        val result = facadeController.index(request, restTemplate, emptyMap(), headers)

        // Then
        assertEquals(HttpStatus.OK, result.statusCode)
    }

    @Test
    fun `index returns error response when exception is thrown`() {
        // Given
        val request: HttpServletRequest = mock(HttpServletRequest::class.java)
        val restTemplate: RestTemplate = mock(RestTemplate::class.java)
        val headers: HttpHeaders = mock(HttpHeaders::class.java)
        `when`(environment.activeProfiles).thenReturn(arrayOf("dev"))
        `when`(request.requestURI).thenReturn("/server/orthanc/instances?expand")
        `when`(restTemplate.exchange(any(URI::class.java), any(), any(), eq(ByteArray::class.java)))
            .thenThrow(RuntimeException("Test exception"))

        // When
        val result = facadeController.index(request, restTemplate, emptyMap(), headers)

        // Then
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.statusCode)
        assertEquals("Error: Test exception", result.body)
    }
}