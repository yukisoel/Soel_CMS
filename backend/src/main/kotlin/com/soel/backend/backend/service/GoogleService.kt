package com.soel.backend.backend.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.soel.backend.backend.SecurityConfig
import com.soel.backend.backend.entity.MenuLog
import com.soel.backend.backend.model.*
import com.soel.backend.backend.repository.GoogleRepository
import com.soel.backend.backend.repository.MenuLogRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.HttpClientErrorException
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody
import java.io.FileInputStream
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.*

interface GoogleService {
    fun getMe(accessToken: String): GoogleMe?
    fun getAccounts(accessToken: String): ResponseEntity<List<GoogleAccount>>?
    fun getAccount(accessToken: String, accountId: String): ResponseEntity<GoogleAccount>?
    fun getCategories(accessToken: String): ResponseEntity<List<GoogleLocationCategory>>?
    fun getLocations(accessToken: String, accountId: String): ResponseEntity<List<GoogleLocation>>?
    fun getLocation(accessToken: String, locationId: String): ResponseEntity<GoogleLocation>?
    fun getLocationProfile(accessToken: String, locationId: String): ResponseEntity<GoogleLocationProfileModel>?
    fun getLocationAttributes(accessToken: String, locationId: String): ResponseEntity<GoogleLocationAttributesModel>?
    fun getLocationPhotos(accessToken: String, accountId: String, locationId: String): ResponseEntity<List<GoogleLocationPhotoModel>>?
    fun getLocationLocalPosts(accessToken: String, accountId: String, locationId: String): ResponseEntity<List<GoogleLocationLocalPostModel>>?
    fun getLocationFoodMenus(accessToken: String, accountId: String, locationId: String): ResponseEntity<GoogleLocationFoodMenusModel>?
    fun getLocationQuestions(accessToken: String, locationId: String): ResponseEntity<List<GoogleLocationQuestion>>?
    fun getLocationAnswers(accessToken: String, locationId: String, questionId: String): ResponseEntity<List<GoogleLocationAnswer>>?
    fun getLocationPhotoLocal(filename: String): ResponseEntity<StreamingResponseBody>?
    fun getLocationReviews(accessToken: String, accountId: String, locationId: String): ResponseEntity<List<GoogleLocationReviewCustom>>?

    fun deleteLocationPhotoLocal(filename: String)

    fun postLocationPhotos(accessToken: String, accountId: String, locationId: String, files: List<MultipartFile>)
    fun postLocationLocalPosts(accessToken: String, accountId: String, locationId: String, localPost: GoogleLocationLocalPostModel, files: List<MultipartFile>)
    fun postLocationQuestion(accessToken: String, locationId: String, text: String)
    fun postLocationAnswer(accessToken: String, locationId: String, questionId: String, text: String)

    fun updateLocationProfile(accessToken: String, locationId: String, updateMask: String, locationProfile: GoogleLocationProfileModel): ResponseEntity<GoogleLocationProfileModel>?
    fun updateLocationFoodMenus(accessToken: String, accountId: String, locationId: String, locationFoodMenus: GoogleLocationFoodMenusModel): ResponseEntity<GoogleLocationFoodMenusModel>?
    fun updateLocationQuestion(accessToken: String, locationId: String, questionId: String, text: String): ResponseEntity<GoogleLocationQuestion>?
    fun updateLocationAttributes(accessToken: String, locationId: String, attributeMask: String, attributes: GoogleLocationAttributesModel): ResponseEntity<GoogleLocationAttributesModel>?

    fun deleteLocationQuestion(accessToken: String, locationId: String, questionId: String)
    fun deleteLocationAnswer(accessToken: String, locationId: String, questionId: String)
}

@Service
class GoogleServiceImpl(val googleRepository: GoogleRepository, val menuLogRepository: MenuLogRepository, val objectMapper: ObjectMapper) : GoogleService {
    private val logger: Logger = LoggerFactory.getLogger(SecurityConfig::class.java)

    override fun getMe(accessToken: String): GoogleMe? {
        return googleRepository.getMe(accessToken)
    }

    override fun getAccounts(accessToken: String): ResponseEntity<List<GoogleAccount>>? {
        try {
            val googleAccountsResponse = googleRepository.getAccounts(accessToken)
            val googleAccounts = googleAccountsResponse?.accounts?.map { account ->
                GoogleAccount(
                    account.name.removePrefix("accounts/"),
                    account.accountName
                )
            }
            return ResponseEntity.ok(googleAccounts)
        } catch (e: Exception) {
            logger.error("Error getting accounts", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getAccount(accessToken: String, accountId: String): ResponseEntity<GoogleAccount>? {
        try {
            val googleAccount = googleRepository.getAccount(accessToken, accountId)
            return ResponseEntity.ok(
                GoogleAccount(
                    googleAccount!!.name.removePrefix("accounts/"),
                    googleAccount.accountName
                )
            )
        } catch (e: Exception) {
            logger.error("Error getting account", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getCategories(accessToken: String): ResponseEntity<List<GoogleLocationCategory>>? {
        val languageCode = "ja"
        val regionCode = "jp"
        val view = "basic"
        try {
            val googleCategoriesMutableList: MutableList<GoogleLocationCategory> = mutableListOf()
            var nextPageToken: String? = null
            do {
                val googleCategoriesResponse = googleRepository.getCategories(accessToken, languageCode, regionCode, view, nextPageToken)
                val googleCategories = googleCategoriesResponse?.categories?.map { category ->
                    GoogleLocationCategory(
                        category.name,
                        category.displayName
                    )
                }
                nextPageToken = googleCategoriesResponse?.nextPageToken
                googleCategoriesMutableList.addAll(googleCategories!!.toMutableList())
            } while (nextPageToken != null)
            return ResponseEntity.ok(googleCategoriesMutableList)
        } catch (e: Exception) {
            logger.error("Error getting categories", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocations(accessToken: String, accountId: String): ResponseEntity<List<GoogleLocation>>? {
        try {
            val googleLocationsMutableList: MutableList<GoogleLocation> = mutableListOf()
            var nextPageToken: String? = null
            do {
                val googleLocationsResponse = googleRepository.getLocations(accessToken, accountId, nextPageToken)
                val googleLocations = googleLocationsResponse?.locations?.map { location ->
                    GoogleLocation(
                        location.name.removePrefix("locations/"),
                        location.title
                    )
                }
                nextPageToken = googleLocationsResponse?.nextPageToken
                googleLocationsMutableList.addAll(googleLocations!!.toMutableList())
            } while (nextPageToken != null)
            return ResponseEntity.ok(googleLocationsMutableList)
        } catch (e: Exception) {
            logger.error("Error getting locations", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocation(accessToken: String, locationId: String): ResponseEntity<GoogleLocation>? {
        try {
            val googleLocation = googleRepository.getLocation(accessToken, locationId)
            return ResponseEntity.ok(
                GoogleLocation(
                    googleLocation!!.name.removePrefix("locations/"),
                    googleLocation.title
                )
            )
        } catch (e: Exception) {
            logger.error("Error getting location", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocationProfile(accessToken: String, locationId: String): ResponseEntity<GoogleLocationProfileModel>? {
        try {
            val googleLocationProfile = googleRepository.getLocationProfile(accessToken, locationId)
            logger.info("googleLocationProfile: $googleLocationProfile")
            return ResponseEntity.ok(
                GoogleLocationProfileModel(
                    name = googleLocationProfile!!.name?.removePrefix("locations/"),
                    title = googleLocationProfile.title,
                    phoneNumbers = googleLocationProfile.phoneNumbers,
                    categories = googleLocationProfile.categories,
                    storefrontAddress = googleLocationProfile.storefrontAddress,
                    websiteUri = googleLocationProfile.websiteUri,
                    regularHours = googleLocationProfile.regularHours,
                    moreHours = googleLocationProfile.moreHours,
                    profile = googleLocationProfile.profile,
                    openInfo = googleLocationProfile.openInfo,
                    serviceArea = googleLocationProfile.serviceArea,
                )
            )
        } catch (e: Exception) {
            logger.error("Error getting location profile", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocationAttributes(accessToken: String, locationId: String): ResponseEntity<GoogleLocationAttributesModel>? {
        try {
            val googleLocationAttributes = googleRepository.getLocationAttributes(accessToken, locationId)
            return ResponseEntity.ok(
                GoogleLocationAttributesModel(
                    googleLocationAttributes!!.name,
                    googleLocationAttributes.attributes,
                )
            )
        } catch (e: Exception) {
            logger.error("Error getting location attributes", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocationPhotos(accessToken: String, accountId: String, locationId: String): ResponseEntity<List<GoogleLocationPhotoModel>>? {
        try {
            val googlePhotosMutableList: MutableList<GoogleLocationPhotoModel> = mutableListOf()
            var nextPageToken: String? = null
            do {
                val googleLocationPhotosResponse =
                    googleRepository.getLocationPhotos(accessToken, accountId, locationId, nextPageToken)

                val googleLocationPhotoModels = googleLocationPhotosResponse?.mediaItems?.map { photoModel ->
                    GoogleLocationPhotoModel(
                        photoModel.name,
                        photoModel.mediaFormat,
                        photoModel.googleUrl,
                        photoModel.thumbnailUrl,
                        photoModel.createTime,
                        photoModel.locationAssociation,
                        photoModel.dataRef,
                    )
                }
                nextPageToken = googleLocationPhotosResponse?.nextPageToken
                googlePhotosMutableList.addAll(googleLocationPhotoModels!!.toMutableList())
                println(nextPageToken)
            } while (nextPageToken != null)
            return ResponseEntity.ok(googlePhotosMutableList)
        } catch (e: Exception) {
            logger.error("Error getting location photos", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocationLocalPosts(accessToken: String, accountId: String, locationId: String): ResponseEntity<List<GoogleLocationLocalPostModel>>? {
        try {
            val googleLocalPostsMutableList: MutableList<GoogleLocationLocalPostModel> = mutableListOf()
            var nextPageToken: String? = null
            do {
                println("do-while")
                val googleLocationLocalPostsResponse =
                    googleRepository.getLocationLocalPosts(accessToken, accountId, locationId, nextPageToken)
                println("googleLocationLocalPostsResponse: $googleLocationLocalPostsResponse")
                val googleLocationLocalPostModels =
                    googleLocationLocalPostsResponse?.localPosts?.map { localPostModel ->
                        GoogleLocationLocalPostModel(
                            localPostModel.name,
                            localPostModel.languageCode,
                            localPostModel.summary,
                            localPostModel.callToAction,
                            localPostModel.createTime,
                            localPostModel.updateTime,
                            localPostModel.event,
                            localPostModel.state,
                            localPostModel.media,
                            localPostModel.searchUrl,
                            localPostModel.topicType,
                            localPostModel.alertType,
                            localPostModel.offer,
                        )
                    }
                nextPageToken = googleLocationLocalPostsResponse?.nextPageToken
                googleLocalPostsMutableList.addAll(googleLocationLocalPostModels!!.toMutableList())
                println(nextPageToken)
            } while (nextPageToken != null)
            return ResponseEntity.ok(googleLocalPostsMutableList)
        } catch (e: Exception) {
            logger.error("Error getting location local posts", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocationFoodMenus(accessToken: String, accountId: String, locationId: String): ResponseEntity<GoogleLocationFoodMenusModel>? {
        try {
            val googleLocationFoodMenusModel =
                googleRepository.getLocationFoodMenus(accessToken, accountId, locationId)
            val menuJson = objectMapper.writeValueAsString(googleLocationFoodMenusModel?.menus)
            val menuLog = MenuLog(
                userName = googleLocationFoodMenusModel?.name ?: "",
                locationId = locationId,
                menu = menuJson
            )
            val savedMenuLog = menuLogRepository.save(menuLog)
            println("success savedMenuLog:createdAt=${savedMenuLog.createdAt}, id=${savedMenuLog.id}, userName=${savedMenuLog.userName}, locationId=${savedMenuLog.locationId}")
            return ResponseEntity.ok(googleLocationFoodMenusModel)
        } catch (e: Exception) {
            logger.error("Error getting location food menus", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocationQuestions(accessToken: String, locationId: String): ResponseEntity<List<GoogleLocationQuestion>>? {
        try {
            val googleLocalQuestionMutableList: MutableList<GoogleLocationQuestion> = mutableListOf()
            var nextPageToken: String? = null
            do {
                val googleLocationQuestionsResponse =
                    googleRepository.getLocationQuestions(accessToken, locationId, nextPageToken)
                val googleLocationQuestions = googleLocationQuestionsResponse?.questions?.map { question ->
                    GoogleLocationQuestion(
                        question.name,
                        question.text,
                        question.createTime,
                        question.updateTime,
                        question.upvoteCount,
                        question.totalAnswerCount,
                        question.author,
                        question.topAnswers,
                    )
                }
                nextPageToken = googleLocationQuestionsResponse?.nextPageToken
                googleLocalQuestionMutableList.addAll(googleLocationQuestions!!.toMutableList())
                println(nextPageToken)
            } while (nextPageToken != null)
            return ResponseEntity.ok(googleLocalQuestionMutableList)
        } catch (e: Exception) {
            logger.error("Error getting location questions", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocationAnswers(accessToken: String, locationId: String, questionId: String): ResponseEntity<List<GoogleLocationAnswer>>? {
        try {
            val googleLocalAnswerMutableList: MutableList<GoogleLocationAnswer> = mutableListOf()
            var nextPageToken: String? = null
            do {
                val googleLocationAnswersResponse =
                    googleRepository.getLocationAnswers(accessToken, locationId, questionId, nextPageToken)
                val googleLocationAnswers = googleLocationAnswersResponse?.answers?.map { answer ->
                    GoogleLocationAnswer(
                        answer.name,
                        answer.text,
                        answer.createTime,
                        answer.updateTime,
                        answer.upvoteCount,
                        answer.author,
                    )
                }
                nextPageToken = googleLocationAnswersResponse?.nextPageToken
                googleLocalAnswerMutableList.addAll(googleLocationAnswers!!.toMutableList())
                println(nextPageToken)
            } while (nextPageToken != null)
            return ResponseEntity.ok(googleLocalAnswerMutableList)
        } catch (e: Exception) {
            logger.error("Error getting location answers", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun getLocationPhotoLocal(filename: String): ResponseEntity<StreamingResponseBody>? {
        println("getLocationPhotoLocal")
        val uploadDir = System.getProperty("user.dir")
        val filePath: Path = Paths.get(uploadDir).resolve(filename).normalize()
        if (!Files.exists(filePath) || !Files.isReadable(filePath)) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "ファイルが見つかりません")
        }
        println("filePath = $filePath")
        val file = filePath.toFile()
        val contentType: String = Files.probeContentType(filePath) ?: "application/octet-stream"

        val streamingResponseBody = StreamingResponseBody { outputStream ->
            try {
                FileInputStream(file).use { inputStream ->
                    inputStream.copyTo(outputStream)
                }
            } catch (e: IOException) {
                println("Error streaming file: ${e.message}")
            } finally {
                println("before:deleteLocationPhotoLocal")
                this.deleteLocationPhotoLocal(filename)
            }
        }

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType))
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"${file.name}\"")
            .body(streamingResponseBody)
    }

    override fun getLocationReviews(accessToken: String, accountId: String, locationId: String): ResponseEntity<List<GoogleLocationReviewCustom>>? {
        try {
            val googleReviewsMutableList: MutableList<GoogleLocationReviewCustom> = mutableListOf()
            var nextPageToken: String? = null
            do {
                val googleLocationReviewsResponse =
                    googleRepository.getLocationReviews(accessToken, accountId, locationId, nextPageToken)
                val googleLocationReviews = googleLocationReviewsResponse?.reviews?.map { review ->
                    GoogleLocationReviewCustom(
                        review.name,
                        review.reviewId,
                        review.comment,
                        review.starRating,
                        review.reviewer,
                        review.reviewReply,
                        review.createTime,
                        review.updateTime,
                        isReply = review.reviewReply != null,
                    )
                }
                nextPageToken = googleLocationReviewsResponse?.nextPageToken
                googleReviewsMutableList.addAll(googleLocationReviews!!.toMutableList())
            } while (nextPageToken != null)
            return ResponseEntity.ok(googleReviewsMutableList)
        } catch (e: Exception) {
            logger.error("Error getting location reviews", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun deleteLocationPhotoLocal(filename: String) {
        println("deleteLocationPhotoLocal")
        val uploadDir = System.getProperty("user.dir")
        val filePath: Path = Paths.get(uploadDir).resolve(filename).normalize()
        if (!Files.exists(filePath) || !Files.isReadable(filePath)) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "ファイルが見つかりません")
        }
        Files.delete(filePath)
    }

    override fun postLocationPhotos(accessToken: String, accountId: String, locationId: String, files: List<MultipartFile>) {
        if (files.isEmpty()) {
            return
        }
        try {
            val uploadDir = System.getProperty("user.dir")
            for (file in files) {
                if (file.isEmpty) {
                    continue
                }
                val originalFilename = file.originalFilename
                val fileExtension = originalFilename!!.substringAfterLast('.', "")
                val fileName = "${UUID.randomUUID()}.$fileExtension"

                val targetLocation = Paths.get(uploadDir).resolve(fileName)
                Files.copy(file.inputStream, targetLocation)
                val response = googleRepository.postLocationPhoto(accessToken, accountId, locationId, fileName)
            }
        } catch (e: Exception) {
            logger.error("Error posting location photos", e)
        }
    }

    override fun postLocationLocalPosts(accessToken: String, accountId: String, locationId: String, localPost: GoogleLocationLocalPostModel, files: List<MultipartFile>) {
        println("postLocationLocalPosts")
        if (files.isEmpty()) {
            return
        }
        try {
            val filenameList = mutableListOf<String>()
            val uploadDir = System.getProperty("user.dir")
            for (file in files) {
                if (file.isEmpty) {
                    continue
                }
                val originalFilename = file.originalFilename
                val fileExtension = originalFilename!!.substringAfterLast('.', "")
                val fileName = "${UUID.randomUUID()}.$fileExtension"
                filenameList.add(fileName)

                val targetLocation = Paths.get(uploadDir).resolve(fileName)
                println("fileName = $fileName")
                Files.copy(file.inputStream, targetLocation)
            }
            val response =
                googleRepository.postLocationLocalPost(accessToken, accountId, locationId, localPost, filenameList)
        } catch (e: Exception) {
            logger.error("Error posting location local posts", e)
        }
    }

    override fun postLocationQuestion(accessToken: String, locationId: String, text: String) {
        try {
            val response = googleRepository.postLocationQuestion(accessToken, locationId, text)
        } catch (e: Exception) {
            logger.error("Error posting location question", e)
        }
    }

    override fun postLocationAnswer(accessToken: String, locationId: String, questionId: String, text: String) {
        try {
            val response = googleRepository.postLocationAnswer(accessToken, locationId, questionId, text)
        } catch (e: Exception) {
            logger.error("Error posting location answer", e)
        }
    }

    override fun updateLocationProfile(accessToken: String, locationId: String, updateMask: String, locationProfile: GoogleLocationProfileModel): ResponseEntity<GoogleLocationProfileModel>? {
        try {
            val googleLocationProfile =
                googleRepository.updateLocationProfile(accessToken, locationId, updateMask, locationProfile)
            return ResponseEntity.ok(
                GoogleLocationProfileModel(
                    name = googleLocationProfile!!.name?.removePrefix("locations/"),
                    title = googleLocationProfile.title,
                    phoneNumbers = googleLocationProfile.phoneNumbers,
                    categories = googleLocationProfile.categories,
                    storefrontAddress = googleLocationProfile.storefrontAddress,
                    websiteUri = googleLocationProfile.websiteUri,
                    regularHours = googleLocationProfile.regularHours,
                    moreHours = googleLocationProfile.moreHours,
                    profile = googleLocationProfile.profile,
                    openInfo = googleLocationProfile.openInfo,
                )
            )
        } catch (e: Exception) {
            logger.error("Error updating location profile", e)
            return when (e) {
                is HttpClientErrorException.NotFound -> {
                    ResponseEntity
                        .status(444)
                        .body(null)
                }
                else -> {
                    ResponseEntity
                        .badRequest()
                        .body(null)
                }
            }
        }
    }

    override fun updateLocationFoodMenus(accessToken: String, accountId: String, locationId: String, locationFoodMenus: GoogleLocationFoodMenusModel): ResponseEntity<GoogleLocationFoodMenusModel>? {
        try {
            val googleLocationFoodMenusModel =
                googleRepository.updateLocationFoodMenus(accessToken, accountId, locationId, locationFoodMenus)
            return ResponseEntity.ok(googleLocationFoodMenusModel)
        } catch (e: Exception) {
            logger.error("Error updating location food menus", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun updateLocationQuestion(accessToken: String, locationId: String, questionId: String, text: String): ResponseEntity<GoogleLocationQuestion>? {
        try {
            val googleLocationQuestion =
                googleRepository.updateLocationQuestion(accessToken, locationId, questionId, text)
            return ResponseEntity.ok(googleLocationQuestion)
        } catch (e: Exception) {
            logger.error("Error updating location question", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun updateLocationAttributes(accessToken: String, locationId: String, attributeMask: String, attributes: GoogleLocationAttributesModel): ResponseEntity<GoogleLocationAttributesModel>? {
        try {
            val googleLocationAttributes =
                googleRepository.updateLocationAttributes(accessToken, locationId, attributeMask, attributes)
            return ResponseEntity.ok(googleLocationAttributes)
        } catch (e: Exception) {
            logger.error("Error updating location attributes", e)
            return ResponseEntity
                .badRequest()
                .body(null)
        }
    }

    override fun deleteLocationQuestion(accessToken: String, locationId: String, questionId: String) {
        try {
            googleRepository.deleteLocationQuestion(accessToken, locationId, questionId)
        } catch (e: Exception) {
            logger.error("Error deleting location question", e)
        }
    }

    override fun deleteLocationAnswer(accessToken: String, locationId: String, questionId: String) {
        try {
            googleRepository.deleteLocationAnswer(accessToken, locationId, questionId)
        } catch (e: Exception) {
            logger.error("Error deleting location answer", e)
        }
    }
}