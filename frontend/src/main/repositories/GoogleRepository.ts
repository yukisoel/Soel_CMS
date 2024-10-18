import{AxiosResponse} from "axios";
import {GoogleAccount, GoogleLocation} from "@/main/model/GoogleAccount.ts";
import {axiosApiClient} from "@/main/client/axiosClient.ts";

export interface GoogleRepository {
  getAccounts(): Promise<GoogleAccount[]>
  getLocations(googleAccount:GoogleAccount): Promise<GoogleLocation[]>
  getLocation(locationId:string): Promise<GoogleLocation>
}

type AccountListResponse = GoogleAccount[]
type LocationListResponse = GoogleLocation[]
type LocationResponse = GoogleLocation

export class GoogleRepositoryImpl implements GoogleRepository {
  async getAccounts(): Promise<GoogleAccount[]> {
    try{
      const response:AxiosResponse<AccountListResponse> = await axiosApiClient.get('google/accounts')
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
        }
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
        }
      })
      return response.data
    }catch (error){
      console.error(error)
      throw new Error("google get location failed")
    }
  }
}