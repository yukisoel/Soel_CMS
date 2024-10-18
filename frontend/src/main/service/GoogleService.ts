import {GoogleRepository} from "@/main/repositories/GoogleRepository.ts";
import {GoogleAccount, GoogleLocation} from "@/main/model/GoogleAccount.ts";

export interface GoogleService {
  getAccounts(): Promise<GoogleAccount[]>
  getLocations(googleAccount:GoogleAccount): Promise<GoogleLocation[]>
  getLocation(locationId:string): Promise<GoogleLocation>
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

  async getLocations(googleAccount:GoogleAccount): Promise<GoogleLocation[]> {
    return this.googleRepository.getLocations(googleAccount)
  }

  async getLocation(locationId:string): Promise<GoogleLocation> {
    return this.googleRepository.getLocation(locationId)
  }
}