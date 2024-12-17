import {GoogleService} from "@/main/service/GoogleService.ts";
import {GoogleAccount, GoogleLocation} from "@/main/model/GoogleAccount.ts";
import {
    GoogleLocationFoodMenusModel,
  GoogleLocationLocalPostModel,
  GoogleLocationPhotoModel,
  GoogleLocationProfileModel
} from "@/main/model/LocationModel";

export default class SpyGoogleService implements GoogleService {
  getLocationFoodMenus(_accountId: string, _locationId: string): Promise<GoogleLocationFoodMenusModel> {
      throw new Error("Method not implemented.");
  }
  updateLocationProfile(_locationId: string, _updateMask: string, _locationProfile: GoogleLocationProfileModel): Promise<GoogleLocationProfileModel> {
      throw new Error("Method not implemented.");
  }
  getLocationProfile(_locationId: string): Promise<GoogleLocationProfileModel> {
      throw new Error("Method not implemented.");
  }
  getAccounts_isCalled = false
  getAccounts_returnValue:Promise<GoogleAccount[]> = new Promise(resolve => resolve([]))

  getAccounts(): Promise<GoogleAccount[]> {
    this.getAccounts_isCalled = true

    return this.getAccounts_returnValue
  }

  getAccount_isCalled = false
  getAccount_returnValue:Promise<GoogleAccount> = new Promise(resolve => resolve({name: "", accountName: ""}))
  getAccount(_accountId: string): Promise<GoogleAccount> {
    this.getAccount_isCalled = true

    return this.getAccount_returnValue
  }

  getLocations_isCalled = false
  getLocations_returnValue:Promise<GoogleLocation[]> = new Promise(resolve => resolve([]))

  getLocations(_googleAccount: GoogleAccount): Promise<GoogleLocation[]> {
    this.getLocations_isCalled = true

    return this.getLocations_returnValue
  }

  getLocation_isCalled = false
  getLocation_returnValue:Promise<GoogleLocation> = new Promise(resolve => resolve({name: "", title: ""}))

  getLocation(_locationId: string): Promise<GoogleLocation> {
    this.getLocation_isCalled = true

    return this.getLocation_returnValue
  }

  getLocationPhotos_isCalled = false
  getLocationPhotos_returnValue:Promise<GoogleLocationPhotoModel[]> = new Promise(resolve => resolve([]))

  getLocationPhotos(_accountId: string, _locationId: string): Promise<GoogleLocationPhotoModel[]> {
    this.getLocationPhotos_isCalled = true

    return this.getLocationPhotos_returnValue
  }

  postLocationPhoto_isCalled = false
  postLocationPhoto_returnValue:Promise<void> = new Promise(resolve => resolve())
  postLocationPhoto(_accountId: string, _locationId: string, _photos: FileList): Promise<void> {
    this.postLocationPhoto_isCalled = true

    return this.postLocationPhoto_returnValue
  }

  postLocationLocalPost_isCalled = false
  postLocationLocalPost_returnValue:Promise<void> = new Promise(resolve => resolve())
  postLocationLocalPost(_accountId: string, _locationId: string, _localPost: GoogleLocationLocalPostModel, _photos: FileList): Promise<void> {
    this.postLocationLocalPost_isCalled = true

    return this.postLocationLocalPost_returnValue
  }
}