import {describe, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import EditGBP from "@/main/components/editPage/EditGBP.tsx";
import EditProfileIcon from "@/main/assets/EditProfileIcon.svg"
import EditPhotoIcon from "@/main/assets/EditPhotoIcon.svg"
import EditMenuIcon from "@/main/assets/EditMenuIcon.svg"
import EditOrderIcon from "@/main/assets/EditOrderIcon.svg"
import EditInfoIcon from "@/main/assets/EditInfoIcon.svg"
import EditItemIcon from "@/main/assets/EditItemIcon.svg"
import EditReserveIcon from "@/main/assets/EditReserveIcon.svg"
import EditQnAIcon from "@/main/assets/EditQnAIcon.svg"

describe('EditGBP', () => {
  const dumyyStoreName = 'dummyStoreName'
  it('店舗名が表示される', async() => {
    const storeNameTest = "storeNameTest"
    render(
      <EditGBP
        storeName={storeNameTest}
      />
    )


    expect(screen.queryByText(storeNameTest)).toBeInTheDocument()
  })

  it('編集中の店舗のバッジが表示される', async() => {
    render(
      <EditGBP
        storeName={dumyyStoreName}
      />
    )


    expect(screen.queryByText('編集中の店舗')).toBeInTheDocument()
  })

  it('「プロフィールを編集」のボタンが表示される', async() => {
    render(
      <EditGBP
        storeName={dumyyStoreName}
      />
    )

    expect(screen.getByText('プロフィールを編集')).toBeInTheDocument()
    expect(screen.getByAltText('edit_profile')).toBeInTheDocument()
    const editProfileIcon = screen.getByAltText('edit_profile')
    expect(editProfileIcon).toHaveAttribute('src', EditProfileIcon)
  })

  it.skip('「プロフィールを編集」ボタンを押したとき、/edit-profileに遷移する', async() => {

  })

  it('「写真」のボタンが表示される', async() => {
    render(
      <EditGBP
        storeName={dumyyStoreName}
      />
    )

    expect(screen.getByText('写真')).toBeInTheDocument()
    expect(screen.getByAltText('edit_photo')).toBeInTheDocument()
    const editPhotoIcon = screen.getByAltText('edit_photo')
    expect(editPhotoIcon).toHaveAttribute('src', EditPhotoIcon)
  })

  it.skip('「写真」ボタンを押したとき、/edit-photoに遷移する', async() => {

  })

  it('「編集メニュー」のボタンが表示される', async() => {
    render(
      <EditGBP
        storeName={dumyyStoreName}
      />
    )

    expect(screen.getByText('編集メニュー')).toBeInTheDocument()
    expect(screen.getByAltText('edit_menu')).toBeInTheDocument()
    const editPhotoIcon = screen.getByAltText('edit_menu')
    expect(editPhotoIcon).toHaveAttribute('src', EditMenuIcon)
  })

  it.skip('「編集メニュー」ボタンを押したとき、/edit-menuに遷移する', async() => {

  })

  it('「料理の注文」のボタンが表示される', async() => {
    render(
      <EditGBP
        storeName={dumyyStoreName}
      />
    )

    expect(screen.getByText('編集メニュー')).toBeInTheDocument()
    expect(screen.getByAltText('edit_order')).toBeInTheDocument()
    const editOrderIcon = screen.getByAltText('edit_order')
    expect(editOrderIcon).toHaveAttribute('src', EditOrderIcon)
  })

  it.skip('「料理の注文」ボタンを押したとき、/edit-orderに遷移する', async() => {

  })

  it('「最新情報を追加」のボタンが表示される', async() => {
    render(
      <EditGBP
        storeName={dumyyStoreName}
      />
    )

    expect(screen.getByText('最新情報を追加')).toBeInTheDocument()
    expect(screen.getByAltText('edit_info')).toBeInTheDocument()
    const editInfoIcon = screen.getByAltText('edit_info')
    expect(editInfoIcon).toHaveAttribute('src', EditInfoIcon)
  })

  it.skip('「最新情報を追加」ボタンを押したとき、/edit-infoに遷移する', async() => {

  })

  it('「商品を編集」のボタンが表示される', async() => {
    render(
      <EditGBP
        storeName={dumyyStoreName}
      />
    )

    expect(screen.getByText('商品を編集')).toBeInTheDocument()
    expect(screen.getByAltText('edit_item')).toBeInTheDocument()
    const editItemIcon = screen.getByAltText('edit_item')
    expect(editItemIcon).toHaveAttribute('src', EditItemIcon)
  })

  it.skip('「商品を編集」ボタンを押したとき、/edit-itemに遷移する', async() => {

  })

  it('「予約」のボタンが表示される', async() => {
    render(
      <EditGBP
        storeName={dumyyStoreName}
      />
    )

    expect(screen.getByText('予約')).toBeInTheDocument()
    expect(screen.getByAltText('edit_reserve')).toBeInTheDocument()
    const editReserveIcon = screen.getByAltText('edit_reserve')
    expect(editReserveIcon).toHaveAttribute('src', EditReserveIcon)
  })

  it.skip('「予約」ボタンを押したとき、/edit-reserveに遷移する', async() => {

  })

  it('「Q&A」のボタンが表示される', async() => {
    render(
      <EditGBP
        storeName={dumyyStoreName}
      />
    )

    expect(screen.getByText('Q&A')).toBeInTheDocument()
    expect(screen.getByAltText('edit_faq')).toBeInTheDocument()
    const editReserveIcon = screen.getByAltText('edit_faq')
    expect(editReserveIcon).toHaveAttribute('src', EditQnAIcon)
  })

  it.skip('「Q&A」ボタンを押したとき、/edit-faqに遷移する', async() => {

  })
})