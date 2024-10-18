import {afterEach, describe, expect} from "vitest";
import {useContext} from "react";
import {GoogleAccountsContext, GoogleAccountsContextProvider} from "@/main/contexts/GoogleAccountsContext.tsx";
import {render, waitFor, screen} from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import SpyGoogleService from "@/tests/doubles/services/SpyGoogleService.ts";
import {GoogleAccount} from "@/main/model/GoogleAccount.ts";

const TestComponent = () => {
  const accountListContext = useContext(GoogleAccountsContext)
  return (
    <>
      {accountListContext?.accountList?.map((account, index) =>(
        <div key={index}>
          <p>{account.name}</p>
          <p>{account.accountName}</p>
        </div>
      ))

      }
    </>
  )
}

describe("GoogleAccountsContext", () => {
  let mockAxios: MockAdapter
  afterEach(() => {
    mockAxios.restore()
    vi.restoreAllMocks()
  })

  it('GoogleServiceのgetAccountsを呼んでいる', async() => {
    mockAxios = new MockAdapter(axios)

    const spyGoogleService = new SpyGoogleService()
    render(
      <GoogleAccountsContextProvider googleService={spyGoogleService}>
        <TestComponent />
      </GoogleAccountsContextProvider>
    )

    await waitFor(() => {
      expect(spyGoogleService.getAccounts_isCalled).toBeTruthy()
    })
  })

  it.skip('/api/google/accountsにアクセスして初期値で設定している', async() => {
    const testAccountList:GoogleAccount[] = [
      {name: 'testName1', accountName: 'testAccountName1'},
    ]
    mockAxios = new MockAdapter(axios)
    mockAxios.onGet('/api/google/accounts').reply(200, testAccountList)

    // render(
    //   <GoogleAccountsContextProvider>
    //     <TestComponent />
    //   </GoogleAccountsContextProvider>
    // )

    await waitFor(() =>{
      expect(screen.getByText('testName1')).toBeInTheDocument()
      expect(screen.getByText('testAccountName1')).toBeInTheDocument()
    })
  })
})