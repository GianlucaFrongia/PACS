package fhnw.mip.histofy.facade

import fhnw.mip.histofy.instance.InstanceMetaDataService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cache.annotation.Caching
import org.springframework.core.env.Environment
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate
import org.springframework.web.util.UriComponentsBuilder

@RestController
@RequestMapping("/orthanc")
@CrossOrigin(origins = ["http://localhost:5173", "https://v000563.fhnw.ch"])
@Caching
class FacadeController {
    private val username = "orthanc"
    private val password = "orthanc"

    @Autowired
    private val environment: Environment? = null

    @Autowired
    private val instanceMetaDataService: InstanceMetaDataService? = null

    @RequestMapping(value = ["{*path}"])
    fun index(
        request: HttpServletRequest,
        restTemplate: RestTemplate,
        @RequestParam params: Map<String, String>,
        @RequestHeader headers: HttpHeaders,
    ): ResponseEntity<Any> {
        // http://localhost:8081/orthanc/instances?expand
        // http://localhost:8042/instances?expand
        val url: java.net.URI

        if (environment?.activeProfiles?.contains("dev") == true) {
            url = UriComponentsBuilder.fromHttpUrl("http://localhost:8042/")
                .path(request.requestURI.replace("/server/orthanc/", ""))
                .apply {
                    params.forEach { (key, value) -> queryParam(key, value) }
                }
                .build().toUri()

        } else {
            url = UriComponentsBuilder.fromHttpUrl("http://orthanc:8042/")
                .path(request.requestURI.replace("/orthanc/", ""))
                .apply {
                    params.forEach { (key, value) -> queryParam(key, value) }
                }
                .build().toUri()
        }

        val authHeader = HttpHeaders().apply {
            setBasicAuth(username, password)
            set("Accept", "image/jpeg")
        }

        try {
            val requestEntity = org.springframework.http.HttpEntity<Any>(authHeader)
            val responseEntity = restTemplate.exchange(
                url,
                org.springframework.http.HttpMethod.GET,
                requestEntity,
                ByteArray::class.java
            )

            val responseHeaders = HttpHeaders().apply {
                contentType = responseEntity.headers.contentType
            }

            responseHeaders.set("cache-control", "max-age=315360")
            return ResponseEntity(responseEntity.body, responseHeaders, responseEntity.statusCode)
        } catch (ex: Exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: ${ex.message}")
        }
    }
}
