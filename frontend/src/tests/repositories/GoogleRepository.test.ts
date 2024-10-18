import {describe} from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {GoogleRepositoryImpl} from "@/main/repositories/GoogleRepository.ts";
import {GoogleAccount} from "@/main/model/GoogleAccount.ts";

describe("GoogleRepository", () => {
  describe('getAccounts', () => {
    it('/api/google/accountsにリクエストしている', async () => {
      const mockAxios = new MockAdapter(axios)
      mockAxios.onGet('/api/google/accounts').reply(200, [])
      const googleRepository = new GoogleRepositoryImpl()


      await googleRepository.getAccounts()


      expect(mockAxios.history.get.length).toBe(1)
      mockAxios.restore()
      vi.restoreAllMocks()
    })

    it('リクエストが成功したとき、レスポンスの結果を返す', async () => {
      const testAccountList:GoogleAccount[] = [
        {name: 'testName1', accountName: 'testAccountName1'},
      ]
      const testAxiosResponse = {accountList: testAccountList}
      const mockAxios = new MockAdapter(axios)
      mockAxios.onGet('/api/google/accounts').reply(200, testAxiosResponse)
      const googleRepository = new GoogleRepositoryImpl()


      const result = await googleRepository.getAccounts()


      expect(result).toEqual(testAccountList)
      mockAxios.restore()
      vi.restoreAllMocks()
    })

    it('リクエストが失敗したとき、エラーを投げる', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {})
      const mockAxios = new MockAdapter(axios)
      mockAxios.onGet('/api/google/accounts').reply(500)
      const googleRepository = new GoogleRepositoryImpl()


      await expect(googleRepository.getAccounts()).rejects.toThrow('google login failed')
      mockAxios.restore()
      vi.restoreAllMocks()
    })
  })
})