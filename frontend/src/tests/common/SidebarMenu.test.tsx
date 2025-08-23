import { describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import SidebarMenu from '@/main/common/SidebarMenu.tsx'
import LogoIcon from '@/main/assets/Logo.svg'
import HomeIcon from '@/main/assets/HomeIcon.svg'
import EditorIcon from '@/main/assets/EditorIcon.svg'
import AdManageIcon from '@/main/assets/AdManageIcon.svg'
import ReviewIcon from '@/main/assets/ReviewIcon.svg'
import StoreMangeIcon from '@/main/assets/StoreManageIcon.svg'

describe('SidebarMenu', () => {
  const dummyEmail:string = 'dummyEmail'

  it('ロゴが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByAltText('logo')).toBeInTheDocument()
    const logo = screen.getByAltText('logo')
    expect(logo).toHaveAttribute('src', LogoIcon)
  })

  it('メインページへのリンクが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByText('メインページ')).toBeInTheDocument()
  })

  it('メインページのアイコンが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByAltText('home_icon')).toBeInTheDocument()
    const home_icon = screen.getByAltText('home_icon')
    expect(home_icon).toHaveAttribute('src', HomeIcon)
  })

  it('ページ編集へのリンクが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByText('ページ編集')).toBeInTheDocument()
  })

  it('ページ編集のアイコンが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByAltText('editor_icon')).toBeInTheDocument()
    const editor_icon = screen.getByAltText('editor_icon')
    expect(editor_icon).toHaveAttribute('src', EditorIcon)
  })

  it('広告管理へのリンクが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByText('広告管理')).toBeInTheDocument()
  })

  it('広告管理のアイコンが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByAltText('ad_manage_icon')).toBeInTheDocument()
    const ad_manage_icon = screen.getByAltText('ad_manage_icon')
    expect(ad_manage_icon).toHaveAttribute('src', AdManageIcon)
  })

  it('口コミ管理へのリンクが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByText('口コミ管理')).toBeInTheDocument()
  })

  it('口コミ管理のアイコンが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByAltText('review_icon')).toBeInTheDocument()
    const review_icon = screen.getByAltText('review_icon')
    expect(review_icon).toHaveAttribute('src', ReviewIcon)
  })

  it('店舗管理へのリンクが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByText('店舗管理')).toBeInTheDocument
  })

  it('店舗管理のアイコンが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByAltText('store_manage_icon')).toBeInTheDocument()
    const store_manage_icon = screen.getByAltText('store_manage_icon')
    expect(store_manage_icon).toHaveAttribute('src', StoreMangeIcon)
  })

  it('お問い合わせボタンが表示される', async() => {
    render(<SidebarMenu email={dummyEmail}/>)


    expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
  })

  it('emailが表示される', async() => {
    const emailTest = 'email-test'
    render(<SidebarMenu email={emailTest}/>)


    expect(screen.getByText(emailTest)).toBeInTheDocument()
  })

})