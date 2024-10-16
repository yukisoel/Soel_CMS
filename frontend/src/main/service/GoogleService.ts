import {GoogleAccount} from "@/main/contexts/GoogleAccountsContext.tsx";
import {GoogleRepository} from "@/main/repositories/GoogleRepository.ts";

export interface GoogleService {
  getAccounts(): Promise<GoogleAccount[]>
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
}