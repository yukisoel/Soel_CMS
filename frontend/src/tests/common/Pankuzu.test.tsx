import {describe, expect} from "vitest";
import Pankuzu, {PankuzuItem} from "@/main/common/Pankuzu.tsx";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {userEvent} from "@testing-library/user-event";

describe("Pankuzu", () => {
  it('パンクズリストが表示される', async () => {
    const testPankuzuList: PankuzuItem[] = [{name: 'test1Name', path: 'test1Path'}, {
      name: 'test2Name',
      path: 'test2Path'
    }]
    render(
      <MemoryRouter initialEntries={['/edit']}>
        <Pankuzu
          pankuzuItemList={testPankuzuList}
        />
      </MemoryRouter>
    )

    expect(screen.getByText(`${testPankuzuList[0].name} /`)).toBeInTheDocument()
    expect(screen.getByText(testPankuzuList[1].name)).toBeInTheDocument()
  })

  it('パンクズリストをクリックするとページ遷移する', async () => {
    const testPankuzuList: PankuzuItem[] = [{name: 'test1Name', path: '/test1Path'}]
    render(
      <MemoryRouter initialEntries={['/pankuzu']}>
        <Routes>
          <Route path="/pankuzu" element={<Pankuzu
            pankuzuItemList={testPankuzuList}
          />}/>
          <Route path={testPankuzuList[0].path} element={<div data-testid={"pankuzu-test"}>dummy</div>}/>
        </Routes>

      </MemoryRouter>
    )

    userEvent.click(screen.getByText(testPankuzuList[0].name))

    await waitFor(() => {
      expect(screen.getByTestId('pankuzu-test')).toBeInTheDocument()
    })
  })
})