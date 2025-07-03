package fhnw.mip.histofy.tags

import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class TagsConfiguration {
    @Bean
    fun tagsInitializer(tagsRepository: TagsRepository) = ApplicationRunner {
        val tags = listOf(
            Tag("fhnw"),
            Tag("mip"),
            Tag("histofy")
        )
        tagsRepository.saveAll(tags)
    }
}