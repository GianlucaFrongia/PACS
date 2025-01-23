package fhnw.mip.histofy.instance

import org.springframework.data.jpa.repository.JpaRepository

interface InstanceRepository : JpaRepository<DicomInstance, Long> {
    fun findByInstanceMetaDataUid(uid: Long): DicomInstance
}
