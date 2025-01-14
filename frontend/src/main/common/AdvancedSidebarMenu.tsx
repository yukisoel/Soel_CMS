import styles from "@/main/common/AdvancedSidebarMenu.module.scss";
import {useMemo, useState} from "react";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SoelLogoIcon from '@/main/assets/SoelLogo.svg'
import HomeIcon from '@/main/assets/HomeIcon.svg'
import EditorIcon from '@/main/assets/EditorIcon.svg'
import ArrowIcon from "@/main/assets/ArrowIcon.svg";
import AdManageIcon from '@/main/assets/AdManageIcon.svg'
import ReviewIcon from '@/main/assets/ReviewIcon.svg'
import StoreMangeIcon from '@/main/assets/StoreManageIcon.svg'
import classNames from "classnames";
import { useLocation } from "react-router-dom";

const SidebarItems = [
    {
        title: '基本情報',
        icon: StoreMangeIcon,
        items: [
            {title: '各店基本情報変更', link: '/stores/select'},
            {title: '基本情報一括変更', link: '/basic/bulk/schedule-post'}
        ],
        flipIcon: true
    },
    {
        title: '投稿',
        icon: EditorIcon,
        items: [
            {title: '一括投稿', link: '/edit/post/bulk'},
            {title: '投稿予約一覧', link: '/edit/reservation'},
            {title: '過去投稿一覧', link: '/edit/past'}
        ],
        flipIcon: true
    },
    {
        title: '口コミ管理',
        icon: ReviewIcon,
        items: [
            {title: '口コミ一覧', link: '/edit/review'},
            {title: '口コミ分析', link: '/edit/analysis'}
        ],
        flipIcon: true
    },
    {
        title: '広告',
        icon: AdManageIcon,
        items: [],
        flipIcon: true
    }
]

export default function AdvancedSidebarMenu() {
  return (
    <Wrapper direction="col" className={styles.sidebar_container}>
        <Wrapper padding="3.4rem 12.3rem 3.1rem 5.8rem">
          <img src={SoelLogoIcon} alt="soel_logo" />
        </Wrapper>
        <div className={styles.separator} />
        <a href="#">
          <Wrapper gap="1.7rem" padding="2.1rem 0 2.1rem 4.4rem">
              <img src={HomeIcon} alt="home_icon" />
              <Typography content="ホーム" size="medium" color="primary" />
          </Wrapper>
        </a>
        {
            SidebarItems.map((item, index) => (
                <SidebarItem key={index} {...item} />
            ))
        }
    </Wrapper>
  )
}

type SidebarItemProps = {
  title: string
  icon: string
  items: {
    title: string
    link: string
  }[]
  flipIcon?: boolean
}

function SidebarItem({title, icon: Icon, items, flipIcon = false}: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { pathname } = useLocation()
  const isSelected = useMemo(() => {
    return items.some(({link}) => pathname.includes(link))
  }, [pathname])

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
            {items.map(({title, link}, index) => (
            <Wrapper className={link === pathname ? styles.sub_menu_container_selected : ''} key={index} padding="2rem 0 2rem 7.8rem">
              <a href={link}>
                <Typography content={title} size="normal" weight="normal" color="primary" />
              </a>
            </Wrapper>
            ))}
          </Wrapper>
        )}
      </Wrapper>
      {!isSelected && <div className={styles.separator} />}
    </>
  )
}
