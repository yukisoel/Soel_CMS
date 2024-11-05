import{AxiosResponse} from "axios";
import {GoogleAccount, GoogleLocation} from "@/main/model/GoogleAccount.ts";
import {axiosApiClient} from "@/main/client/axiosClient.ts";
import {GoogleLocationPhotoModel, GoogleLocationProfileModel} from "@/main/model/LocationModel.ts";

export interface GoogleRepository {
  getAccounts(): Promise<GoogleAccount[]>
  getLocations(googleAccount:GoogleAccount): Promise<GoogleLocation[]>
  getLocation(locationId:string): Promise<GoogleLocation>
  getLocationProfile(locationId:string): Promise<GoogleLocationProfileModel>
  getLocationPhotos(accountId:string, locationId:string): Promise<LocationPhotoListResponse>
}

type AccountListResponse = GoogleAccount[]
type LocationListResponse = GoogleLocation[]
type LocationResponse = GoogleLocation
type LocationPhotoListResponse = GoogleLocationPhotoModel[]

export class GoogleRepositoryImpl implements GoogleRepository {
  async getAccounts(): Promise<GoogleAccount[]> {
    try{
      const response:AxiosResponse<AccountListResponse> = await axiosApiClient.get('google/accounts', {
        headers: {
          'Accept': 'application/json; charset=utf-8',
        },
      })
       return response.data
     }catch (error){
      console.error(error)
      throw new Error("google get accounts failed")
     }
  }

  async getLocations(googleAccount:GoogleAccount): Promise<GoogleLocation[]> {
    try{
      const response:AxiosResponse<LocationListResponse> = await axiosApiClient.get('google/locations', {
        params: {
          accountId: googleAccount.name
        },
        headers: {
          'Accept': 'application/json; charset=utf-8',
        },
      })
      return response.data
    }catch (error){
      console.error(error)
      throw new Error("google get locations failed")
    }
  }

  async getLocation(locationId:string): Promise<GoogleLocation> {
    try{
      const response:AxiosResponse<LocationResponse> = await axiosApiClient.get('google/location', {
        params: {
          locationId: locationId
        },
        headers: {
          'Accept': 'application/json; charset=utf-8',
        },
      })
      return response.data
    }catch (error){
      console.error(error)
      throw new Error("google get location failed")
    }
  }

  async getLocationProfile(locationId:string): Promise<GoogleLocationProfileModel> {
    try{
      console.log({locationId})
      const response:AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.get('google/location/profile', {
        params: {
          locationId: locationId
        },
        headers: {
          'Accept': 'application/json; charset=utf-8',
        },
      })
      return response.data
    }catch (error){
      console.error(error)
      throw new Error("google get location profile failed")
    }
  }

  async getLocationPhotos(accountId:string, locationId:string): Promise<LocationPhotoListResponse> {
    try{
      const response:AxiosResponse<LocationPhotoListResponse> = await axiosApiClient.get('google/location/photos', {
        params: {
          accountId: accountId,
          locationId: locationId
        },
        headers: {
          'Accept': 'application/json; charset=utf-8',
        },
      })
      return response.data
    }catch (error){
      console.error(error)
      throw new Error("google get location photos failed")
    }
  }
}