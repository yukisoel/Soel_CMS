import {render,screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import App from "@/main/App.tsx";

describe('App', () => {
  it('/edit にアクセスすると、SearchStore が表示される', async () => {
    render(
      <MemoryRouter initialEntries={['/edit']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByTestId('window_store_search_container')).toBeInTheDocument()
  })

  it('/edit/gbp にアクセスすると、EditGBP が表示される', async () => {
    render(
      <MemoryRouter initialEntries={['/edit/gbp']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByTestId('window_edit_gbp_container')).toBeInTheDocument()
  })
})