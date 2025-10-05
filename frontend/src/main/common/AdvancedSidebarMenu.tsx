import { useContext, useMemo, useState } from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { GoogleAccountsContext } from '../contexts/GoogleAccountsContext'
import { GoogleSelectedLocationContext } from '../contexts/GoogleSelectedLocationContext'
import styles from '@/main/common/AdvancedSidebarMenu.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Separator from '@/main/common/Separator'
import SoelLogoIcon from '@/main/assets/SoelLogo.svg'
import HomeIcon from '@/main/assets/HomeIcon.svg'
import EditorIcon from '@/main/assets/EditorIcon.svg'
import ArrowIcon from '@/main/assets/ArrowIcon.svg'
import AdManageIcon from '@/main/assets/AdManageIcon.svg'
import ReviewIcon from '@/main/assets/ReviewIcon.svg'
import StoreMangeIcon from '@/main/assets/StoreManageIcon.svg'

export default function AdvancedSidebarMenu() {
  const { selectedAccount } = useContext(GoogleAccountsContext)
  const { googleSelectedLocation } = useContext(GoogleSelectedLocationContext)

  const SidebarItems = useMemo(() => [
    {
      title: '基本情報',
      icon: StoreMangeIcon,
      items: [
        { title: '各店基本情報変更', link: '/edit' },
        { title: '写真一括変更', link: '/edit/bulk/photo' },
        { title: '特別営業時間一括変更', link: '/edit/bulk/special' }
      ],
      flipIcon: true
    },
    {
      title: '投稿',
      icon: EditorIcon,
      items: [
        { title: '一括投稿', link: '/edit/bulk/schedule-post', subItems: [
          { title: 'ブランドから選択', link: '/edit/bulk/schedule-post?mode=brand' },
          { title: 'エリアから選択', link: '/edit/bulk/schedule-post?mode=area' }
        ] },
        { title: '投稿予約一覧', link: '/edit/bulk/schedule-post-list' },
        { title: '過去投稿一覧', link: '/edit/bulk/history-post-list' }
      ],
      flipIcon: true
    },
    {
      title: '口コミ管理',
      icon: ReviewIcon,
      items: [
        { title: '口コミ一覧', link: `/edit/accounts/${selectedAccount?.name}/location/${googleSelectedLocation?.name}/review` },
        { title: '口コミ分析', link: '#' }
      ],
      flipIcon: true
    },
    {
      title: '広告',
      icon: AdManageIcon,
      items: [],
      flipIcon: true
    }
  ], [selectedAccount, googleSelectedLocation])

  return (
    <Wrapper direction="col" className={styles.sidebar_container} justify="justify-between">
      <Wrapper direction="col">
        <Wrapper padding="3.4rem 12.3rem 3.1rem 5.8rem">
          <img src={SoelLogoIcon} alt="soel_logo" />
        </Wrapper>
        <div className={styles.separator} />
        <Link to="" onClick={(e) => e.preventDefault()}>
          <Wrapper gap="1.7rem" padding="2.1rem 0 2.1rem 4.4rem">
            <img src={HomeIcon} alt="home_icon" />
            <Typography content="ホーム" size="medium" color="primary" />
          </Wrapper>
        </Link>
        {
          SidebarItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))
        }
      </Wrapper>
      <Wrapper direction="col" padding="0 0 3rem 0">
        <a href="/oauth2/authorization/google">
          <Wrapper gap="1.7rem" padding="2.1rem 0 2.1rem 4.4rem">
            <Typography content="Google連携" size="medium" color="primary" />
          </Wrapper>
        </a>
        <div className={styles.separator} />
        <a href={`${window.location.origin}/logout`}>
          <Wrapper gap="1.7rem" padding="2.1rem 0 2.1rem 4.4rem" className={styles.logout_container}>
            <Typography content="ログアウト" size="medium" color="primary" />
          </Wrapper>
        </a>
      </Wrapper>
    </Wrapper>
  )
}

type SidebarItemProps = {
  title: string
  icon: string
  items: {
    title: string
    link: string
    subItems?: {
      title: string
      link: string
    }[]
  }[]
  flipIcon?: boolean
}

function SidebarItem({ title, icon: Icon, items, flipIcon = false }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { pathname } = useLocation()
  const isSelected = useMemo(() => {
    return items.some(({ link }) => pathname.includes(link))
  }, [pathname, items])

  return (
    <>
      <Wrapper direction="col">
        <div className={classNames(styles.menu_container, isSelected ? styles.menu_container_selected : '')} onClick={() => setIsOpen(!isOpen)}>
          <Wrapper gap="1.7rem" padding="2.1rem 0">
            <img src={Icon} alt="home_icon" className={flipIcon ? styles.icon_flipped : ''}  />
            <Typography content={title} size="medium" color="primary" />
          </Wrapper>
          <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
        </div>
        {isOpen && (
          <Wrapper direction="col" padding="0 0 3rem">
            {items.map(({ title, link, subItems }, index) => (
              <Wrapper
                className={classNames(
                  link === pathname ? styles.sub_menu_container_selected : '',
                  styles.sub_menu_item_wrapper
                )}
                key={index}
                padding="2rem 0 2rem 7.8rem"
                onMouseEnter={() => setHoveredItem(title)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {subItems ? (
                  <>
                    <Typography content={title} size="normal" weight="normal" color="primary" />
                    {hoveredItem === title && (
                      <div className={styles.flyout_menu}>
                        {subItems.map((subItem, subIndex) => (
                          <div key={subIndex}>
                            <Link to={subItem.link}>
                              <Wrapper padding="1.5rem 2rem" className={styles.flyout_item}>
                                <Typography content={subItem.title} size="normal" weight="normal" color="primary" className={styles.flyout_text} />
                              </Wrapper>
                            </Link>
                            {subIndex < subItems.length - 1 && <Separator />}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={link}>
                    <Typography content={title} size="normal" weight="normal" color="primary" />
                  </Link>
                )}
              </Wrapper>
            ))}
          </Wrapper>
        )}
      </Wrapper>
      {!isSelected && <div className={styles.separator} />}
    </>
  )
}
