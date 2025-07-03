package fhnw.mip.histofy.instance

import org.springframework.data.jpa.repository.JpaRepository

interface InstancesMetaDataRepository
    : JpaRepository<InstanceMetaData, Long> {

}