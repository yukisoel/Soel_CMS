import styles from "@/main/common/AdvancedSidebarMenu.module.scss";
import {useState} from "react";
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
        <SidebarItem title="基本情報" icon={StoreMangeIcon} items={['各店基本情報変更', '基本情報一括変更']} isSelected flipIcon />
        <SidebarItem title="投稿" icon={EditorIcon} items={['一括投稿', '投稿予約一覧', '過去投稿一覧']} flipIcon />
        <SidebarItem title="口コミ管理" icon={ReviewIcon} items={['口コミ一覧', '口コミ分析']} flipIcon />
        <SidebarItem title="広告" icon={AdManageIcon} items={[]} flipIcon />
    </Wrapper>
  )
}

type SidebarItemProps = {
  title: string
  icon: string
  items: string[]
  isSelected?: boolean
  flipIcon?: boolean
}

function SidebarItem({title, icon: Icon, items, isSelected = false, flipIcon = false}: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Wrapper direction="col" gap="1.5rem">
        <div className={classNames(styles.menu_container, isSelected ? styles.menu_container_selected : '')} onClick={() => setIsOpen(!isOpen)}>
          <Wrapper gap="1.7rem" padding="2.1rem 0 2.1rem 0">
            <img src={Icon} alt="home_icon" className={flipIcon ? styles.icon_flipped : ''}  />
            <Typography content={title} size="medium" color="primary" />
          </Wrapper>
          <img src={ArrowIcon} alt="icon" className={classNames(styles.arrow_icon, isOpen ? styles.arrow_icon_open : '')} />
        </div>
        {isOpen && (
          <Wrapper direction="col" gap="2rem" padding="0 0 3rem 7.8rem">
            {items.map((item, index) => (
              <a href="#" key={index}>
                <Typography content={item} size="normal" weight="normal" color="primary" />
              </a>
            ))}
          </Wrapper>
        )}
      </Wrapper>
      {!isSelected && <div className={styles.separator} />}
    </>
  )
}
