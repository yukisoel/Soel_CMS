import {GoogleRepository} from "@/main/repositories/GoogleRepository.ts";
import {GoogleAccount, GoogleLocation} from "@/main/model/GoogleAccount.ts";
import {GoogleLocationPhotoModel, GoogleLocationProfileModel} from "@/main/model/LocationModel.ts";

export interface GoogleService {
  getAccounts(): Promise<GoogleAccount[]>
  getAccount(accountId:string): Promise<GoogleAccount>
  getLocations(googleAccount:GoogleAccount): Promise<GoogleLocation[]>
  getLocation(locationId:string): Promise<GoogleLocation>
  getLocationProfile(locationId:string): Promise<GoogleLocationProfileModel>
  getLocationPhotos(accountId:string, locationId:string): Promise<GoogleLocationPhotoModel[]>
  updateLocationProfile(locationId:string, updateMask:string, locationProfile:GoogleLocationProfileModel): Promise<GoogleLocationProfileModel>
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

  async updateLocationProfile(locationId:string, updateMask:string, locationProfile:GoogleLocationProfileModel): Promise<GoogleLocationProfileModel> {
    return this.googleRepository.updateLocationProfile(locationId, updateMask, locationProfile)
  }
}