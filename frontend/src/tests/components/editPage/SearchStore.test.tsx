import {describe, expect} from "vitest";
import {render, screen, waitFor, within} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {userEvent} from "@testing-library/user-event";
import SearchStore from "@/main/components/editPage/SearchStore.tsx";
import {
  GoogleAccount,
  GoogleAccountsContextProvider
} from "@/main/contexts/GoogleAccountsContext.tsx";
import SpyGoogleService from "@/tests/doubles/services/SpyGoogleService.ts";

// const TestComponent = () => {
//   const accountListContext = useContext(GoogleAccountsContext)
//   return (
//     <>
//       <p>{accountListContext.selectedAccount?.accountName}</p>
//     </>
//   )
// }

describe('SearchStore', () => {

  it('window_store_searchが表示されている', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchStore/>
      </MemoryRouter>
    )


    expect(screen.getByTestId('window_store_search_container')).toBeInTheDocument()
  })

  describe('ブランドを選択について', () => {
    it('ブランドを選択のcontainerが表示される', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const window_store_search_container = screen.getByTestId('window_store_search_container')


      expect(within(window_store_search_container).getByTestId('brand_select_container')).toBeInTheDocument()
    })
    it('ブランドを選択のタイトルが表示されている', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const brand_select_container = screen.getByTestId('brand_select_container')


      expect(within(brand_select_container).getByText('ブランドを選択')).toBeInTheDocument()
    })
    it('ブランドを選択のプルダウンメニューが表示されている', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const brand_select_container = screen.getByTestId('brand_select_container')


      expect(within(brand_select_container).getByText('入力して検索')).toBeInTheDocument()
    })
    describe('プルダウンメニューを押したとき', async () => {
      it('プルダウンメニューが表示される', async () => {
        render(
          <MemoryRouter initialEntries={["/"]}>
            <SearchStore/>
          </MemoryRouter>
        )


        const brand_select_container = screen.getByTestId('brand_select_container')
        const pull_down = within(brand_select_container).getByText('入力して検索')
        await userEvent.click(pull_down)


        await waitFor(() => {
          expect(screen.getByText('ブランド1')).toBeInTheDocument()
        })
      })

      it('プルダウンメニューで選択肢を選ぶと選択した項目が表示される', async () => {
        render(
          <MemoryRouter initialEntries={["/"]}>
            <SearchStore/>
          </MemoryRouter>
        )


        const brand_select_container = screen.getByTestId('brand_select_container')
        const pull_down = within(brand_select_container).getByText('入力して検索')
        await userEvent.click(pull_down)
        await userEvent.click(screen.getByText('ブランド1'))


        await waitFor(() => {
          expect(within(brand_select_container).queryByText('入力して検索')).toBeNull()
        })
        expect(screen.getByText('ブランド1')).toBeInTheDocument()
      })
    })
  })

  describe('店舗を選択について', () => {
    it('店舗を選択のcontainerが表示される', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      expect(screen.getByTestId('window_store_search_container')).toBeInTheDocument()
    })

    it('店舗を選択のタイトルが表示されている', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const store_select_container = screen.getByTestId('store_select_container')


      expect(within(store_select_container).getByText('店舗を選択')).toBeInTheDocument()
    })

    it('店舗を選択のプルダウンメニューが表示されている', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const store_select_container = screen.getByTestId('store_select_container')


      expect(within(store_select_container).getByText('入力して検索')).toBeInTheDocument()
    })

    describe('プルダウンメニューを押したとき', async () => {
      it('/api/google/accountsで取得したプルダウンメニューが表示される', async () => {
        const testAccount: GoogleAccount = {name: 'dummy', accountName: 'testAccountName'}
        const spyGoogleService = new SpyGoogleService()
        spyGoogleService.getAccounts_returnValue = new Promise(resolve => resolve([testAccount]))

        render(
          <MemoryRouter initialEntries={["/"]}>
            <GoogleAccountsContextProvider googleService={spyGoogleService}>
              <SearchStore/>
            </GoogleAccountsContextProvider>
          </MemoryRouter>
        )


        const store_select_container = screen.getByTestId('store_select_container')
        const pull_down = within(store_select_container).getByText('入力して検索')
        await userEvent.click(pull_down)


        await waitFor(() => {
          expect(screen.getByText(testAccount.accountName)).toBeInTheDocument()
        })
      })

      it('プルダウンメニューで選択肢を選ぶと選択した項目が表示される', async () => {
        const testAccount: GoogleAccount = {name: 'dummy', accountName: 'testAccountName'}
        const spyGoogleService = new SpyGoogleService()
        spyGoogleService.getAccounts_returnValue = new Promise(resolve => resolve([testAccount]))

        render(
          <MemoryRouter initialEntries={["/"]}>
            <GoogleAccountsContextProvider googleService={spyGoogleService}>
              <SearchStore/>
            </GoogleAccountsContextProvider>
          </MemoryRouter>
        )


        const store_select_container = screen.getByTestId('store_select_container')
        const pull_down = within(store_select_container).getByText('入力して検索')
        await userEvent.click(pull_down)
        await userEvent.click(screen.getByText(testAccount.accountName))


        await waitFor(() => {
          expect(within(store_select_container).queryByText('入力して検索')).toBeNull()
        })
        expect(screen.getByText(testAccount.accountName)).toBeInTheDocument()
      })
    })
  })

  describe('対象サービスを選択について', () => {
    it('対象サービスを選択のcontainerが表示される', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      expect(screen.getByTestId('service_select_container')).toBeInTheDocument()
    })

    it('対象サービスを選択のタイトルが表示されている', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const service_select_container = screen.getByTestId('service_select_container')


      expect(within(service_select_container).getByText('対象サービスを選択')).toBeInTheDocument()
    })

    it('対象サービスを選択のプルダウンメニューが表示されている', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const service_select_container = screen.getByTestId('service_select_container')


      expect(within(service_select_container).getByText('入力して検索')).toBeInTheDocument()
    })

    describe('プルダウンメニューを押したとき', async () => {
      it('プルダウンメニューが表示される', async () => {
        render(
          <MemoryRouter initialEntries={["/"]}>
            <SearchStore/>
          </MemoryRouter>
        )


        const service_select_container = screen.getByTestId('service_select_container')
        const pull_down = within(service_select_container).getByText('入力して検索')
        await userEvent.click(pull_down)


        await waitFor(() => {
          expect(screen.getByText('GBP')).toBeInTheDocument()
        })
      })

      it('プルダウンメニューで選択肢を選ぶと選択した項目が表示される', async () => {
        render(
          <MemoryRouter initialEntries={["/"]}>
            <SearchStore/>
          </MemoryRouter>
        )


        const service_select_container = screen.getByTestId('service_select_container')
        const pull_down = within(service_select_container).getByText('入力して検索')
        await userEvent.click(pull_down)
        await userEvent.click(screen.getByText('GBP'))


        await waitFor(() => {
          expect(within(service_select_container).queryByText('入力して検索')).toBeNull()
        })
        expect(screen.getByText('GBP')).toBeInTheDocument()
      })
    })
  })

  describe('プルダウンの選択について', () => {
    it('ブランドを選択のプルダウンを選択しているとき、他のプルダウンは表示されない', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const brand_select_container = screen.getByTestId('brand_select_container')
      const pull_down = within(brand_select_container).getByText('入力して検索')
      await userEvent.click(pull_down)


      expect(screen.getByTestId('store_select_container').hidden).toBe(true)
      expect(screen.getByTestId('service_select_container').hidden).toBe(true)
    })

    it('ブランドを選択のプルダウンをもう一度クリックしているとき、他のプルダウンが表示される', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const brand_select_container = screen.getByTestId('brand_select_container')
      const pull_down = within(brand_select_container).getByText('入力して検索')
      await userEvent.click(pull_down)
      const opened_pull_down = within(brand_select_container).getByText('入力して検索')
      await userEvent.click(opened_pull_down)


      expect(screen.getByTestId('store_select_container').hidden).toBe(false)
      expect(screen.getByTestId('service_select_container').hidden).toBe(false)
    })

    it('店舗を選択のプルダウンを選択しているとき、他のプルダウンは表示されない', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const store_select_container = screen.getByTestId('store_select_container')
      const pull_down = within(store_select_container).getByText('入力して検索')
      await userEvent.click(pull_down)


      expect(screen.getByTestId('brand_select_container').hidden).toBe(true)
      expect(screen.getByTestId('service_select_container').hidden).toBe(true)
    })

    it('店舗を選択のプルダウンをもう一度クリックしているとき、他のプルダウンが表示される', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const store_select_container = screen.getByTestId('store_select_container')
      const pull_down = within(store_select_container).getByText('入力して検索')
      await userEvent.click(pull_down)
      const opened_pull_down = within(store_select_container).getByText('入力して検索')
      await userEvent.click(opened_pull_down)


      expect(screen.getByTestId('brand_select_container').hidden).toBe(false)
      expect(screen.getByTestId('service_select_container').hidden).toBe(false)
    })

    it('対象サービスを選択のプルダウンを選択しているとき、他のプルダウンは表示されない', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const service_select_container = screen.getByTestId('service_select_container')
      const pull_down = within(service_select_container).getByText('入力して検索')
      await userEvent.click(pull_down)


      expect(screen.getByTestId('brand_select_container').hidden).toBe(true)
      expect(screen.getByTestId('store_select_container').hidden).toBe(true)
    })

    it('対象サービスを選択のプルダウンをもう一度クリックしているとき、他のプルダウンが表示される', async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchStore/>
        </MemoryRouter>
      )


      const service_select_container = screen.getByTestId('service_select_container')
      const pull_down = within(service_select_container).getByText('入力して検索')
      await userEvent.click(pull_down)
      const opened_pull_down = within(service_select_container).getByText('入力して検索')
      await userEvent.click(opened_pull_down)


      expect(screen.getByTestId('brand_select_container').hidden).toBe(false)
      expect(screen.getByTestId('store_select_container').hidden).toBe(false)
    })
  })

  it('検索ボタンが表示される', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchStore/>
      </MemoryRouter>
    )


    expect(screen.getByText('検索')).toBeInTheDocument()
  })

  describe('検索ボタンを押したとき', () => {
    describe('選択されたサービスがGBPのとき',() => {
      it('/edit/gbpに遷移する', async () => {
        render(
          <MemoryRouter initialEntries={['/edit']}>
            <Routes>
              <Route path="/edit" element={<SearchStore/>}/>
              <Route path="/edit/gbp" element={<div>GBP</div>}/>
            </Routes>
          </MemoryRouter>
        )


        const service_select_container = screen.getByTestId('service_select_container')
        const pull_down = within(service_select_container).getByText('入力して検索')
        await userEvent.click(pull_down)
        await userEvent.click(screen.getByText('GBP'))
        const search_button = screen.getByTestId('search_button')
        await userEvent.click(search_button)


        await waitFor(() => {
          expect(screen.getByText('GBP')).toBeInTheDocument()
        })
      })

      it('選択した店舗名が表示される', async() => {

      })
    })

    it('選択されたサービスがGBPじゃないとき, どこにも遷移しない', async () => {
      render(
        <MemoryRouter initialEntries={['/edit']}>
          <Routes>
            <Route path="/edit" element={<SearchStore/>}/>
            <Route path="/edit/gbp" element={<div>GBP</div>}/>
          </Routes>
        </MemoryRouter>
      )


      const service_select_container = screen.getByTestId('service_select_container')
      const pull_down = within(service_select_container).getByText('入力して検索')
      await userEvent.click(pull_down)
      await userEvent.click(screen.getByText('食べログ'))
      const search_button = screen.getByTestId('search_button')
      await userEvent.click(search_button)


      await waitFor(() => {
        expect(screen.queryByText('GBP')).toBeNull()
      })
    })
  })
})