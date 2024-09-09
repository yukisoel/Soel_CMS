import {describe, expect} from "vitest";
import EditPage from "../../main/pages/EditPage.tsx";
import {render, screen, waitFor, within} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import ButtonBackIcon from "@/main/assets/Button_Back.svg";


describe('EditPage', () => {
  it('タイトルが表示される', async() =>{
    render(<EditPage />)

    expect(screen.getByText('ページ編集 /')).toBeInTheDocument()
  })

  it('戻るボタンが表示される', async() => {
    render(<EditPage />)


    expect(screen.getByAltText('button_back')).toBeInTheDocument()
    const button_back = screen.getByAltText('button_back')
    expect(button_back).toHaveAttribute('src', ButtonBackIcon)
  })

  it('サイドバーメニューが表示される', async() => {
    render(<EditPage />)


    expect(screen.getByTestId('sidebar_menu_container')).toBeInTheDocument()
  })

  describe('window_store_search', () => {
    it('window_store_searchが表示されている', async() => {
      render(<EditPage />)


      expect(screen.getByTestId('window_store_search_container')).toBeInTheDocument()
    })

    describe('ブランドを選択について', () => {
      it('ブランドを選択のcontainerが表示される', async() => {
        render(<EditPage />)


        const window_store_search_container = screen.getByTestId('window_store_search_container')


        expect(within(window_store_search_container).getByTestId('brand_select_container')).toBeInTheDocument()
      })
      it('ブランドを選択のタイトルが表示されている', async() => {
        render(<EditPage />)


        const brand_select_container = screen.getByTestId('brand_select_container')


        expect(within(brand_select_container).getByText('ブランドを選択')).toBeInTheDocument()
      })
      it('ブランドを選択のプルダウンメニューが表示されている', async() => {
        render(<EditPage />)


        const brand_select_container = screen.getByTestId('brand_select_container')


        expect(within(brand_select_container).getByText('入力して検索')).toBeInTheDocument()
      })
      describe('プルダウンメニューを押したとき', async() => {
        it('プルダウンメニューが表示される', async() => {
          render(<EditPage />)


          const brand_select_container = screen.getByTestId('brand_select_container')
          const pull_down = within(brand_select_container).getByText('入力して検索')
          await userEvent.click(pull_down)


          await waitFor(() => {
            expect(screen.getByText('ブランド1')).toBeInTheDocument()
          })
        })

        it('プルダウンメニューで選択肢を選ぶと選択した項目が表示される', async() => {
          render(<EditPage />)


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
      it('店舗を選択のcontainerが表示される', async() => {
        render(<EditPage />)


        expect(screen.getByTestId('window_store_search_container')).toBeInTheDocument()
      })

      it('店舗を選択のタイトルが表示されている', async() => {
        render(<EditPage />)


        const store_select_container = screen.getByTestId('store_select_container')


        expect(within(store_select_container).getByText('店舗を選択')).toBeInTheDocument()
      })

      it('店舗を選択のプルダウンメニューが表示されている', async() => {
        render(<EditPage />)


        const store_select_container = screen.getByTestId('store_select_container')


        expect(within(store_select_container).getByText('入力して検索')).toBeInTheDocument()
      })

      describe('プルダウンメニューを押したとき', async() => {
        it('プルダウンメニューが表示される', async () => {
          render(<EditPage/>)


          const store_select_container = screen.getByTestId('store_select_container')
          const pull_down = within(store_select_container).getByText('入力して検索')
          await userEvent.click(pull_down)


          await waitFor(() => {
            expect(screen.getByText('SOELプレミアム秋葉原店')).toBeInTheDocument()
          })
        })

        it('プルダウンメニューで選択肢を選ぶと選択した項目が表示される', async() => {
          render(<EditPage />)


          const store_select_container = screen.getByTestId('store_select_container')
          const pull_down = within(store_select_container).getByText('入力して検索')
          await userEvent.click(pull_down)
          await userEvent.click(screen.getByText('SOELプレミアム秋葉原店'))


          await waitFor(() => {
            expect(within(store_select_container).queryByText('入力して検索')).toBeNull()
          })
          expect(screen.getByText('SOELプレミアム秋葉原店')).toBeInTheDocument()
        })
      })
    })

    describe('対象サービスを選択について', () => {
      it('対象サービスを選択のcontainerが表示される', async() => {
        render(<EditPage/>)


        expect(screen.getByTestId('service_select_container')).toBeInTheDocument()
      })

      it('対象サービスを選択のタイトルが表示されている', async() => {
        render(<EditPage/>)


        const service_select_container = screen.getByTestId('service_select_container')


        expect(within(service_select_container).getByText('対象サービスを選択')).toBeInTheDocument()
      })

      it('対象サービスを選択のプルダウンメニューが表示されている', async() => {
        render(<EditPage/>)


        const service_select_container = screen.getByTestId('service_select_container')


        expect(within(service_select_container).getByText('入力して検索')).toBeInTheDocument()
      })

      describe('プルダウンメニューを押したとき', async() => {
        it('プルダウンメニューが表示される', async () => {
          render(<EditPage/>)


          const service_select_container = screen.getByTestId('service_select_container')
          const pull_down = within(service_select_container).getByText('入力して検索')
          await userEvent.click(pull_down)


          await waitFor(() => {
            expect(screen.getByText('GBP')).toBeInTheDocument()
          })
        })

        it('プルダウンメニューで選択肢を選ぶと選択した項目が表示される', async() => {
          render(<EditPage/>)


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

    it('検索ボタンが表示される', async() => {
      render(<EditPage />)


      expect(screen.getByText('検索')).toBeInTheDocument()
    })

    describe.skip('検索ボタンを押したとき', () => {
    })

  })

})