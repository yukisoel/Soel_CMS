import {GoogleRepository} from "@/main/repositories/GoogleRepository.ts";
import {GoogleAccount, GoogleLocation} from "@/main/model/GoogleAccount.ts";
import { GoogleLocationProfileModel } from "@/main/model/LocationModel";

export default class SpyGoogleRepository implements GoogleRepository {
    getLocationProfile(_locationId: string): Promise<GoogleLocationProfileModel> {
        throw new Error("Method not implemented.");
    }
    getAccounts_isCalled = false
    getAccounts_returnValue:Promise<GoogleAccount[]> = new Promise(resolve => resolve([]))
    getAccounts(): Promise<GoogleAccount[]> {
      this.getAccounts_isCalled = true

      return this.getAccounts_returnValue
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

}