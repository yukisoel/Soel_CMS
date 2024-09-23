import { GoogleAccount } from "@/main/contexts/GoogleAccountsContext";
import {GoogleRepository} from "@/main/repositories/GoogleRepository.ts";

export default class SpyGoogleRepository implements GoogleRepository {
    getAccounts_isCalled = false
    getAccounts_returnValue:Promise<GoogleAccount[]> = new Promise(resolve => resolve([]))
    getAccounts(): Promise<GoogleAccount[]> {
      this.getAccounts_isCalled = true

      return this.getAccounts_returnValue
    }

}