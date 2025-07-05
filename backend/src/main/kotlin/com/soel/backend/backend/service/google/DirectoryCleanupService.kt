package com.soel.backend.backend.service.google

import org.springframework.stereotype.Service
import java.io.File
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit

@Service
class DirectoryCleanupService {
    private val scheduler = Executors.newSingleThreadScheduledExecutor()

    fun scheduleCleanup(directoryName: String, delay: Long, timeUnit: TimeUnit = TimeUnit.SECONDS) {
        println("Scheduling cleanup for directory: $directoryName after $delay $timeUnit")
        scheduler.schedule({
            val dir = File(directoryName)
            if (dir.exists() && dir.isDirectory) {
                println("Cleaning up directory: $directoryName")
                dir.deleteRecursively()
            } else {
                println("Directory $directoryName does not exist or is not a directory.")
            }
            println("Cleanup completed for directory: $directoryName")
        }, delay, timeUnit)
    }
}