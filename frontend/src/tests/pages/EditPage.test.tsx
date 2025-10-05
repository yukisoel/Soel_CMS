import { describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import EditPage from '../../main/pages/EditPage.tsx'
import ButtonBackIcon from '@/main/assets/Button_Back.svg'


describe('EditPage', () => {
  const dummyEmail = 'dummyEmail'
  it('パンクズリストが表示される', async () => {
    render(
      <MemoryRouter initialEntries={['/edit']}>
        <EditPage
          email={dummyEmail}
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
        />
      </MemoryRouter>
    )


    expect(screen.getByTestId('sidebar_menu_container')).toBeInTheDocument()
  })

})