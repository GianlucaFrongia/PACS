package fhnw.mip.histofy.comments

import org.springframework.data.jpa.repository.JpaRepository

interface CommentsRepository : JpaRepository<Comment, Long>