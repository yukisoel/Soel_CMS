import {describe} from "vitest";
import SpyGoogleRepository from "@/tests/doubles/repositories/SpyGoogleRepository.ts";
import {GoogleServiceImpl} from "@/main/service/GoogleService.ts";

describe("GoogleService", () => {
  describe('getAccounts', () => {
    it('GoogleRepositoryのgetAccountsを呼ぶ', async() => {
      const spyGoogleRepository = new SpyGoogleRepository()
      const googleService = new GoogleServiceImpl({googleRepository: spyGoogleRepository})


      await googleService.getAccounts()


      expect(spyGoogleRepository.getAccounts_isCalled).toBe(true)
    })

    it('GoogleRepositoryのgetAccountsの結果を返す', async() => {
      const testAccountList = [
        {name: 'testName1', accountName: 'testAccountName1'},
      ]
      const spyGoogleRepository = new SpyGoogleRepository()
      spyGoogleRepository.getAccounts_returnValue = new Promise(resolve => resolve(testAccountList))
      const googleService = new GoogleServiceImpl({googleRepository: spyGoogleRepository})


      const result = await googleService.getAccounts()


      expect(result).toEqual(testAccountList)
    })
  })
})