import {describe, expect} from "vitest";
import EditPage from "../../main/pages/EditPage.tsx";
import {render, screen} from "@testing-library/react";
import ButtonBackIcon from "@/main/assets/Button_Back.svg";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {PankuzuItem} from "@/main/common/Pankuzu.tsx";


describe('EditPage', () => {
  const dummyEmail = 'dummyEmail'
  const dummyPankuzu: PankuzuItem[] = [{name: 'dummyName', path: 'dummyPath'}]
  const dummyChild: React.ReactNode = <></>
  it('パンクズリストが表示される', async () => {
    render(
      <MemoryRouter initialEntries={['/edit']}>
        <EditPage
          email={dummyEmail}
          pankuzuItemList={dummyPankuzu}
          children={dummyChild}
        />
      </MemoryRouter>
    )

    expect(screen.getByTestId(`pankuzu_container`)).toBeInTheDocument()
  })

  it('戻るボタンが表示される', async () => {
    render(
      <MemoryRouter initialEntries={['/edit']}>
        <Routes>
          <Route
            path="/edit"
            element={
              <EditPage
                email={dummyEmail}
                pankuzuItemList={dummyPankuzu}
                children={dummyChild}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    )


    expect(screen.getByAltText('button_back')).toBeInTheDocument()
    const button_back = screen.getByAltText('button_back')
    expect(button_back).toHaveAttribute('src', ButtonBackIcon)
  })

  it('サイドバーメニューが表示される', async () => {
    render(
      <MemoryRouter initialEntries={['/edit']}>
        <EditPage
          email={dummyEmail}
          pankuzuItemList={dummyPankuzu}
          children={dummyChild}
        />
      </MemoryRouter>
    )


    expect(screen.getByTestId('sidebar_menu_container')).toBeInTheDocument()
  })

})