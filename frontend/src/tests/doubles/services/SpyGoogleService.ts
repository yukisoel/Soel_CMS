import {GoogleService} from "@/main/services/GoogleService.ts";
import {GoogleAccount} from "@/main/contexts/GoogleAccountsContext.tsx";

export default class SpyGoogleService implements GoogleService {
  getAccounts_isCalled = false
  getAccounts_returnValue:Promise<GoogleAccount[]> = new Promise(resolve => resolve([]))

  getAccounts(): Promise<GoogleAccount[]> {
    this.getAccounts_isCalled = true

    return this.getAccounts_returnValue
  }
}