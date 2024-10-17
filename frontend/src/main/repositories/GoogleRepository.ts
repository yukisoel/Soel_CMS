import axios, {AxiosResponse} from "axios";
import {GoogleAccount, GoogleLocation} from "@/main/model/GoogleAccount.ts";

export interface GoogleRepository {
  getAccounts(): Promise<GoogleAccount[]>
  getLocations(googleAccount:GoogleAccount): Promise<GoogleLocation[]>
}

type AccountListResponse = GoogleAccount[]
type LocationListResponse = GoogleLocation[]

export class GoogleRepositoryImpl implements GoogleRepository {
  async getAccounts(): Promise<GoogleAccount[]> {
    try{
      const response:AxiosResponse<AccountListResponse> = await axios.get('api/google/accounts')
       return response.data
     }catch (error){
      console.error(error)
      throw new Error("google get accounts failed")
     }
  }

  async getLocations(googleAccount:GoogleAccount): Promise<GoogleLocation[]> {
    try{
      const response:AxiosResponse<LocationListResponse> = await axios.get('api/google/locations', {
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
}