import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from '@/main/components/editPage/EditGBPDashboard.module.scss'
import { DashboardItem } from '@/main/components/editPage/DashboardItem.tsx'
import EditProfileIcon from '@/main/assets/EditProfileIcon.svg'
import EditPhotoIcon from '@/main/assets/EditPhotoIcon.svg'
import EditMenuIcon from '@/main/assets/EditMenuIcon.svg'
import EditOrderIcon from '@/main/assets/EditOrderIcon.svg'
import EditInfoIcon from '@/main/assets/EditInfoIcon.svg'
import EditItemIcon from '@/main/assets/EditItemIcon.svg'
import EditReserveIcon from '@/main/assets/EditReserveIcon.svg'
import EditQnAIcon from '@/main/assets/EditQnAIcon.svg'
import { PankuzuItemListContext } from '@/main/contexts/PankuzuItemListContext.tsx'
import { GoogleSelectedLocationContext } from '@/main/contexts/GoogleSelectedLocationContext.tsx'
import { GoogleAccountsContext } from '@/main/contexts/GoogleAccountsContext.tsx'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext'


export default function EditGBPDashboard() {
  const googleRepository = useGoogleRepository()
  const { setPankuzuItemList } = useContext(PankuzuItemListContext)
  const { setSelectedAccount } = useContext(GoogleAccountsContext)
  const { googleSelectedLocation, setGoogleSelectedLocation } = useContext(GoogleSelectedLocationContext)
  const { accountId, locationId } = useParams()

  useEffect(() => {
    setPankuzuItemList([{ name: 'ページ編集', path: '/edit' }, { name: 'GBP', path: '/edit/gbp' }])
    if(googleSelectedLocation.name === '' && accountId && locationId) {
      googleRepository.getAccount(accountId).then(account => {
        setSelectedAccount(account)
      })
      googleRepository.getLocation(locationId).then(location => {
        setGoogleSelectedLocation(location)
      })
    }
  },[])
  return (
    <div className={styles.dashboard_item_container}>
      <div className={styles.dashboard_item_row}>
        <DashboardItem
          navigation={'profile'}
          text={'プロフィールを編集'}
          src={EditProfileIcon}
          altText={'edit_profile'}
        />
        <DashboardItem
          navigation={'photo'}
          text={'写真'}
          src={EditPhotoIcon}
          altText={'edit_photo'}
        />
        <DashboardItem
          navigation={'menu'}
          text={'編集メニュー'}
          src={EditMenuIcon}
          altText={'edit_menu'}
        />
        <DashboardItem
          navigation={''}
          text={'料理の注文'}
          src={EditOrderIcon}
          altText={'edit_order'}
        />
      </div>
      <div className={styles.dashboard_item_row}>
        <DashboardItem
          navigation={'latest_information'}
          text={'最新情報を追加'}
          src={EditInfoIcon}
          altText={'edit_info'}
        />
        <DashboardItem
          navigation={'product'}
          text={'商品を編集'}
          src={EditItemIcon}
          altText={'edit_item'}
        />
        <DashboardItem
          navigation={'reservation'}
          text={'予約'}
          src={EditReserveIcon}
          altText={'edit_reserve'}
        />
        <DashboardItem
          navigation={'qa'}
          text={'Q&A'}
          src={EditQnAIcon}
          altText={'edit_faq'}
        />
      </div>
    </div>
  )
}
