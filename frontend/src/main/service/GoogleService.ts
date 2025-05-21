import {GoogleRepository} from "@/main/repositories/GoogleRepository.ts";
import {
  GoogleLocationFoodMenusModel,
  GoogleLocationLocalPostModel,
  GoogleLocationPhotoModel,
  // GoogleLocationProfileModel
} from "@/main/model/LocationModel.ts";
import {GoogleAccount, GoogleLocation, GoogleLocationCategory, GoogleLocationDate} from "@/types/apiModel.ts";
import {GoogleLocationProfileModel} from "@/types/apiModel.ts";
export interface GoogleService {
  getAccounts(): Promise<GoogleAccount[]>
  getAccount(accountId:string): Promise<GoogleAccount>
  getLocations(googleAccount:GoogleAccount): Promise<GoogleLocation[]>
  getLocation(locationId:string): Promise<GoogleLocation>
  getLocationProfile(locationId:string): Promise<GoogleLocationProfileModel>
  getLocationPhotos(accountId:string, locationId:string): Promise<GoogleLocationPhotoModel[]>
  getLocationFoodMenus(accountId: string,locationId: string): Promise<GoogleLocationFoodMenusModel>
  getCategories(): Promise<GoogleLocationCategory[]>
  postLocationPhoto(accountId:string, locationId:string, photos:FileList): Promise<void>
  postLocationLocalPost(accountId:string, locationId:string, localPost:GoogleLocationLocalPostModel, photos:FileList): Promise<void>
  updateLocationProfile(locationId:string, updateMask:string, locationProfile:GoogleLocationProfileModel): Promise<GoogleLocationProfileModel>
  updateLocationProfileTitle(locationId:string, title:string): Promise<GoogleLocationProfileModel>
  updateLocationProfileDescription(locationId:string, description:string): Promise<GoogleLocationProfileModel>
  updateLocationProfilePrimaryCategories(locationId:string, category: GoogleLocationCategory): Promise<GoogleLocationProfileModel>
  updateLocationProfileAdditionalCategories(locationId:string, categories: GoogleLocationCategory[]): Promise<GoogleLocationProfileModel>
  updateLocationProfileOpeningDate(locationId:string, openingDate: GoogleLocationDate): Promise<GoogleLocationProfileModel>
  updateLocationFoodMenus(accountId: string, locationId: string, foodMenus: GoogleLocationFoodMenusModel): Promise<void>
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

  async getCategories(): Promise<GoogleLocationCategory[]> {
    return this.googleRepository.getCategories()
  }

  async postLocationPhoto(accountId:string, locationId:string, photos:FileList): Promise<void> {
    return this.googleRepository.postLocationPhoto(accountId, locationId, photos)
  }

  async postLocationLocalPost(accountId:string, locationId:string, localPost:GoogleLocationLocalPostModel, photos:FileList): Promise<void> {
    return this.googleRepository.postLocationLocalPost(accountId, locationId, localPost, photos)
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
}
