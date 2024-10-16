import {GoogleAccount} from "@/main/contexts/GoogleAccountsContext.tsx";
import axios, {AxiosResponse} from "axios";

export interface GoogleRepository {
  getAccounts(): Promise<GoogleAccount[]>
}

type AccountListResponse = GoogleAccount[]

export class GoogleRepositoryImpl implements GoogleRepository {
  async getAccounts(): Promise<GoogleAccount[]> {
    try{
      const response:AxiosResponse<AccountListResponse> = await axios.get('api/google/accounts')
       return response.data
     }catch (error){
      console.error(error)
      throw new Error("google login failed")
     }
  }
}