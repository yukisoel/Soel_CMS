import {GoogleAccount} from "@/main/contexts/GoogleAccountsContext.tsx";
import axios, {AxiosResponse} from "axios";

export interface GoogleRepository {
  getAccounts(): Promise<GoogleAccount[]>
}

type AccountResponse = {
  accountList: GoogleAccount[]
}

export class GoogleRepositoryImpl implements GoogleRepository {
  async getAccounts(): Promise<GoogleAccount[]> {
    try{
      const response:AxiosResponse<AccountResponse> = await axios.get('api/google/accounts')
      console.log(response.data.accountList)
       return response.data.accountList
     }catch (error){
      console.error(error)
      throw new Error("google login failed")
     }
  }
}