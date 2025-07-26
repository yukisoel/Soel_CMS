import {GoogleRepository} from "@/main/repositories/GoogleRepository.ts";
import {
  GoogleLocationFoodMenusModel,
  GoogleLocationLocalPostModel,
  GoogleLocationPhotoModel,
} from "@/main/model/LocationModel.ts";
import {GoogleAccount, GoogleLocation, GoogleLocationCategory, GoogleLocationDate, GoogleLocationAttributeSnsLinkRequest, GoogleLocationAttributesModel, GoogleLocationStoreFrontAddressRequest, GoogleLocationBusinessHoursRequest, GooglePlacesAutoCompleteResponse, GoogleLocationLocalPostRequest, GoogleLocationReviewModel, BrandWithStoresListResponse, PrefectureListWithBrandListWithStoreListResponse } from "@/types/apiModel.ts";
import {GoogleLocationProfileModel} from "@/types/apiModel.ts";
import { components } from "@/types/api.ts";

type GoogleLocationAttributeService = components["schemas"]["GoogleLocationAttributeService"];
export interface GoogleService {
  getAccounts(): Promise<GoogleAccount[]>
  getAccount(accountId:string): Promise<GoogleAccount>
  getLocations(googleAccount:GoogleAccount): Promise<GoogleLocation[]>
  getLocation(locationId:string): Promise<GoogleLocation>
  getLocationProfile(locationId:string): Promise<GoogleLocationProfileModel>
  getLocationPhotos(accountId:string, locationId:string): Promise<GoogleLocationPhotoModel[]>
  getLocationFoodMenus(accountId: string,locationId: string): Promise<GoogleLocationFoodMenusModel>
  getLocationAttributes(locationId: string): Promise<GoogleLocationAttributesModel>
  getLocationAttributesServices(locationId: string): Promise<GoogleLocationAttributesModel>
  getLocationAttributesServicesOptions(): Promise<GoogleLocationAttributesModel>
  getLocationBusinessOwnerInfo(locationId: string): Promise<GoogleLocationAttributesModel>
  getCategories(): Promise<GoogleLocationCategory[]>
  getLocationReviews(accountId: string, locationId: string): Promise<GoogleLocationReviewModel[]>
  getBrandList(): Promise<BrandWithStoresListResponse>
  getStoreListByPrefecture(): Promise<PrefectureListWithBrandListWithStoreListResponse>
  postLocationPhoto(accountId:string, locationId:string, photos:FileList): Promise<void>
  updateLocationProfile(locationId:string, updateMask:string, locationProfile:GoogleLocationProfileModel): Promise<GoogleLocationProfileModel>
  updateLocationProfileTitle(locationId:string, title:string): Promise<GoogleLocationProfileModel>
  updateLocationProfileDescription(locationId:string, description:string): Promise<GoogleLocationProfileModel>
  updateLocationProfilePrimaryCategories(locationId:string, category: GoogleLocationCategory): Promise<GoogleLocationProfileModel>
  updateLocationProfileAdditionalCategories(locationId:string, categories: GoogleLocationCategory[]): Promise<GoogleLocationProfileModel>
  updateLocationProfileOpeningDate(locationId:string, openingDate: GoogleLocationDate): Promise<GoogleLocationProfileModel>
  updateLocationProfilePhoneNumber(locationId:string, phoneNumber: string): Promise<GoogleLocationProfileModel>
  updateLocationProfileWebsiteUri(locationId:string, websiteUri: string): Promise<GoogleLocationProfileModel>
  updateLocationAttributeMenuLink(locationId: string, menuLink: string): Promise<GoogleLocationProfileModel>
  updateLocationAttributeSnsLink(locationId: string, snsLink: GoogleLocationAttributeSnsLinkRequest): Promise<GoogleLocationProfileModel>
  updateLocationAttributesServices(locationId: string, services: GoogleLocationAttributeService[]): Promise<GoogleLocationAttributesModel>
  updateLocationFoodMenus(accountId: string, locationId: string, foodMenus: GoogleLocationFoodMenusModel): Promise<void>
  updateLocationProfileStorefrontAddress(locationId: string, storefrontAddress: GoogleLocationStoreFrontAddressRequest): Promise<GoogleLocationProfileModel>
  updateLocationProfileServiceArea(locationId: string, serviceArea: string[]): Promise<GoogleLocationProfileModel>
  updateLocationProfileBusinessHours(locationId: string, businessHours: GoogleLocationBusinessHoursRequest): Promise<GoogleLocationProfileModel>
  postPlacesAutoComplete(input: string): Promise<GooglePlacesAutoCompleteResponse>
  postLocationLocalPosts(accountId: string, locationId: string, localPost: GoogleLocationLocalPostRequest, photos: FileList): Promise<void>
  postLocationLocalPostBulk(accountId: string, locationIdList: string[], localPost: GoogleLocationLocalPostRequest, photos: FileList): Promise<void>
  postLocationReviewReply(accountId: string, locationId: string, reviewId: string, content: string): Promise<void>
  deleteLocationReviewReply(accountId: string, locationId: string, reviewId: string): Promise<void>
}

type Props = {
  googleRepository: GoogleRepository
}

export class GoogleServiceImpl implements GoogleService {
  googleRepository: GoogleRepository

  constructor({googleRepository}: Props) {
    this.googleRepository = googleRepository
  }

  async getAccounts(): Promise<GoogleAccount[]> {
    return this.googleRepository.getAccounts()
  }

  async getAccount(accountId:string): Promise<GoogleAccount> {
    return this.googleRepository.getAccount(accountId)
  }

  async getLocations(googleAccount:GoogleAccount): Promise<GoogleLocation[]> {
    return this.googleRepository.getLocations(googleAccount)
  }

  async getLocation(locationId:string): Promise<GoogleLocation> {
    return this.googleRepository.getLocation(locationId)
  }

  async getLocationProfile(locationId:string): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.getLocationProfile(locationId)
  }

  async getLocationPhotos(accountId:string, locationId:string): Promise<GoogleLocationPhotoModel[]> {
    return this.googleRepository.getLocationPhotos(accountId, locationId)
  }

  async getLocationFoodMenus(accountId: string, locationId: string): Promise<GoogleLocationFoodMenusModel> {
    return this.googleRepository.getLocationFoodMenus(accountId, locationId)
  }

  async getLocationAttributes(locationId: string): Promise<GoogleLocationAttributesModel> {
    return this.googleRepository.getLocationAttributes(locationId)
  }

  async getLocationAttributesServices(locationId: string): Promise<GoogleLocationAttributesModel> {
    return this.googleRepository.getLocationAttributesServices(locationId)
  }

  async getLocationAttributesServicesOptions(): Promise<GoogleLocationAttributesModel> {
    return this.googleRepository.getLocationAttributesServicesOptions()
  }

  async getLocationBusinessOwnerInfo(locationId: string): Promise<GoogleLocationAttributesModel> {
    return this.googleRepository.getLocationBusinessOwnerInfo(locationId)
  }

  async getCategories(): Promise<GoogleLocationCategory[]> {
    return this.googleRepository.getCategories()
  }

  async getLocationReviews(accountId: string, locationId: string): Promise<GoogleLocationReviewModel[]> {
    return this.googleRepository.getLocationReviews(accountId, locationId)
  }

  async getBrandList(): Promise<BrandWithStoresListResponse> {
    return this.googleRepository.getBrandList()
  }

  async getStoreListByPrefecture(): Promise<PrefectureListWithBrandListWithStoreListResponse> {
    return this.googleRepository.getStoreListByPrefecture()
  }

  async postLocationPhoto(accountId:string, locationId:string, photos:FileList): Promise<void> {
    return this.googleRepository.postLocationPhoto(accountId, locationId, photos)
  }

  async updateLocationProfile(locationId:string, updateMask:string, locationProfile:GoogleLocationProfileModel): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfile(locationId, updateMask, locationProfile)
  }

  async updateLocationProfileTitle(locationId:string, title:string): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfileTitle(locationId, title)
  }

  async updateLocationProfileDescription(locationId:string, description:string): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfileDescription(locationId, description)
  }

  async updateLocationProfilePrimaryCategories(locationId:string, category: GoogleLocationCategory): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfilePrimaryCategories(locationId, category)
  }

  async updateLocationProfileAdditionalCategories(locationId:string, categories: GoogleLocationCategory[]): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfileAdditionalCategories(locationId, categories)
  }

  async updateLocationFoodMenus(accountId: string, locationId: string, foodMenus: GoogleLocationFoodMenusModel): Promise<void> {
    return this.googleRepository.updateLocationFoodMenus(accountId, locationId, foodMenus)
  }

  async updateLocationProfileOpeningDate(locationId:string, openingDate: GoogleLocationDate): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfileOpeningDate(locationId, openingDate)
  }

  async updateLocationProfilePhoneNumber(locationId:string, phoneNumber: string): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfilePhoneNumber(locationId, phoneNumber)
  }

  async updateLocationProfileWebsiteUri(locationId:string, websiteUri: string): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfileWebsiteUri(locationId, websiteUri)
  }

  async updateLocationAttributeMenuLink(locationId: string, menuLink: string): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationAttributeMenuLink(locationId, menuLink)
  }

  async updateLocationAttributeSnsLink(locationId: string, snsLink: GoogleLocationAttributeSnsLinkRequest): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationAttributeSnsLink(locationId, snsLink)
  }

  async updateLocationAttributesServices(locationId: string, services: GoogleLocationAttributeService[]): Promise<GoogleLocationAttributesModel> {
    return this.googleRepository.updateLocationAttributesServices(locationId, services)
  }

  async updateLocationProfileStorefrontAddress(locationId: string, storefrontAddress: GoogleLocationStoreFrontAddressRequest): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfileStorefrontAddress(locationId, storefrontAddress)
  }

  async updateLocationProfileServiceArea(locationId: string, serviceArea: string[]): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfileServiceArea(locationId, serviceArea)
  }

  async updateLocationProfileBusinessHours(locationId: string, businessHours: GoogleLocationBusinessHoursRequest): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfileBusinessHours(locationId, businessHours)
  }

  async postPlacesAutoComplete(input: string): Promise<GooglePlacesAutoCompleteResponse> {
    return this.googleRepository.postPlacesAutoComplete(input)
  }

  async postLocationLocalPosts(accountId: string, locationId: string, localPost: GoogleLocationLocalPostRequest, photos: FileList): Promise<void> {
    return this.googleRepository.postLocationLocalPosts(accountId, locationId, localPost, photos)
  }

  async postLocationLocalPostBulk(accountId: string, locationIdList: string[], localPost: GoogleLocationLocalPostRequest, photos: FileList): Promise<void> {
    return this.googleRepository.postLocationLocalPostBulk(accountId, locationIdList, localPost, photos)
  }

  async postLocationReviewReply(accountId: string, locationId: string, reviewId: string, content: string): Promise<void> {
    return this.googleRepository.postLocationReviewReply(accountId, locationId, reviewId, content)
  }

  async deleteLocationReviewReply(accountId: string, locationId: string, reviewId: string): Promise<void> {
    return this.googleRepository.deleteLocationReviewReply(accountId, locationId, reviewId)
  }
}
