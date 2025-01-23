package fhnw.mip.histofy.instance

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.core.io.ClassPathResource
import org.springframework.http.HttpHeaders
import org.springframework.web.client.RestTemplate
import org.w3c.dom.Element
import java.io.File
import java.net.URI
import javax.xml.parsers.DocumentBuilderFactory


@Configuration
class InstanceMetaDataConfiguration(private val instanceMetaDataService: InstanceMetaDataService) {
    @Serializable
    private val descriptionCollection = HashSet<String>()
    private val username = "orthanc"
    private val password = "orthanc"
    private val json = Json { prettyPrint = true }
    private val restTemplate: RestTemplate = RestTemplate()
    private val instancesList: MutableList<DicomInstance> = mutableListOf()

    @Autowired
    private val environment: Environment? = null

    @Bean
    fun instancesInitializer(
        instanceMetaRepository: InstancesMetaDataRepository,
        instanceRepository: InstanceRepository,
    ) = ApplicationRunner {
        println("Building from XML")
        // get the profile from the environment
        //val profile = environment?.activeProfiles?.get(0)
        //println("Using profile: $profile")

        val instances = createInstancesFromXML(ClassPathResource("data/allImageMetadata.xml").file)
        val responseEntity: org.springframework.http.ResponseEntity<ByteArray>
        instanceMetaRepository.saveAll(instances)

        val authHeader = HttpHeaders().apply {
            setBasicAuth(username, password)
        }
        val requestEntity = org.springframework.http.HttpEntity<Any>(authHeader)

        if (environment?.activeProfiles?.contains("dev") == true) {
            responseEntity = restTemplate.exchange(
                URI.create("http://localhost:8042/instances?expand"),
                org.springframework.http.HttpMethod.GET,
                requestEntity,
                ByteArray::class.java
            )
        }
        else if (environment?.activeProfiles?.contains("ci") == true) {
            responseEntity = restTemplate.exchange(
                URI.create("https://v000563.fhnw.ch/orthanc/instances?expand"),
                org.springframework.http.HttpMethod.GET,
                requestEntity,
                ByteArray::class.java
            )
        }
        else {
            responseEntity = restTemplate.exchange(
                URI.create("http://orthanc:8042/instances?expand"),
                org.springframework.http.HttpMethod.GET,
                requestEntity,
                ByteArray::class.java
            )

        }

        val responseData = json.decodeFromString<List<DicomInstance>>(String(responseEntity.body!!))


        responseData.forEach {
            val id = it.mainDicomTags.sopInstanceUid.split(".").last()
            
            val instanceMetaData = instanceMetaDataService.findByUid(id.toLong())
            it.instanceMetaData = instanceMetaData
            instancesList.add(it)
        }

        instancesList.sortBy { it.instanceMetaData?.uid }
        instanceRepository.saveAllAndFlush(instancesList)
    }

    fun createInstancesFromXML(file: File): List<InstanceMetaData> {
        val instanceMetaDatas = mutableListOf<InstanceMetaData>()

        val documentBuilderFactory = DocumentBuilderFactory.newInstance()
        val documentBuilder = documentBuilderFactory.newDocumentBuilder()
        val document = documentBuilder.parse(file)

        val nodeList = document.getElementsByTagName("image")
        for (i in 0 until nodeList.length) {
            val node = nodeList.item(i)
            if (node.nodeType == Element.ELEMENT_NODE) {
                val element = node as Element
                val src = if (element.hasAttribute("src")) element.getAttribute("src") else ""
                val hue = if (element.hasAttribute("hue")) element.getAttribute("hue") else ""
                val saturation = if (element.hasAttribute("saturation")) element.getAttribute("saturation") else ""
                val brightness = if (element.hasAttribute("brightness")) element.getAttribute("brightness") else ""
                val coverage = if (element.hasAttribute("coverage")) element.getAttribute("coverage") else ""

                val originalURL = extractTextContent(element, "originalURL")
                val magnification = extractMagnificationContent(element, "magnification")
                val uid = extractTextContent(element, "uid").toLong()
                val instanceMetaData = InstanceMetaData(src, originalURL, magnification, hue.toFloat(), saturation.toFloat(), brightness.toFloat(), coverage.toFloat(),  uid)
                instanceMetaDatas.add(instanceMetaData)
            }
        }
        val json = Json { prettyPrint = true }
        val jsonString = json.encodeToString(descriptionCollection)

        val descriptionCollectionFile = File("descriptionCollection.json")
        descriptionCollectionFile.writeText(jsonString)

        return instanceMetaDatas
    }

    fun extractTextContent(element: Element, tagName: String): String {
        val nodeList = element.getElementsByTagName(tagName)
        return if (nodeList.length > 0) nodeList.item(0).textContent else ""
    }

    fun extractMagnificationContent(element: Element, tagName: String): Float {
        val nodeList = element.getElementsByTagName(tagName)
        return if (nodeList.item(0).textContent != "") nodeList.item(0).textContent.replace(',', '.').replace(" ", "")
            .replace("und", ".")
            .trim().toFloat() else 0.0f
    }
}

