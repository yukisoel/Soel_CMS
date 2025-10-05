import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SearchStoreV2.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Button from '@/main/common/Button'
import PhotoPullDownMenu from '@/main/components/editPage/PhotoPullDownMenu'
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem'
import { PankuzuItemListContext } from '@/main/contexts/PankuzuItemListContext'
import { ServiceName } from '@/main/model/ServiceName'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext'
import { GoogleAccountsContext } from '@/main/contexts/GoogleAccountsContext'
import { GoogleSelectedLocationContext } from '@/main/contexts/GoogleSelectedLocationContext'
import { GoogleAccount, GoogleLocation } from '@/types/apiModel'
import Typography from '@/main/common/Typography'

export default function SearchStoreV2() {
  const googleRepository = useGoogleRepository()
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedAccountName, setSelectedAccountName] = useState<string>('')
  const [selectedLocationTitle, setSelectedLocationTitle] = useState<string>('')
  const [accountList, setAccountList] = useState<GoogleAccount[]>([])
  const [locationList, setLocationList] = useState<GoogleLocation[]>([])
  const navigate = useNavigate()

  const { selectedAccount, setSelectedAccount } = useContext(GoogleAccountsContext)!
  const { googleSelectedLocation, setGoogleSelectedLocation } = useContext(GoogleSelectedLocationContext)!
  const { setPankuzuItemList } = useContext(PankuzuItemListContext)

  useEffect(() => {
    setPankuzuItemList([{ name: 'ページ編集', path: '/edit' }])
  }, [setPankuzuItemList])

  useEffect(() => {
    if (selectedService === ServiceName.GBP) {
      googleRepository.getAccounts().then(setAccountList)
    }
  }, [selectedService])

  useEffect(() => {
    if (selectedAccountName) {
      const googleAccount = accountList.find(account => account.accountName === selectedAccountName)
      if (googleAccount) {
        setSelectedAccount(googleAccount)
        googleRepository.getLocations(googleAccount).then(setLocationList)
      }
    }
  }, [selectedAccountName])

  useEffect(() => {
    if (selectedLocationTitle) {
      const googleLocation = locationList.find(location => location.title === selectedLocationTitle)
      if (googleLocation) setGoogleSelectedLocation(googleLocation)
    }
  }, [selectedLocationTitle])

  const handleNextClick = () => {
    if (selectedService === ServiceName.GBP && selectedAccount && googleSelectedLocation) {
      navigate(`/edit/gbp/accounts/${selectedAccount.name}/location/${googleSelectedLocation.name}`)
    }
  }

  return (
    <Wrapper direction="col" align="align-center" justify="justify-center" className={styles.root}>
      <Wrapper direction="col" gap="32px" padding="40px 32px 32px 32px" className={styles.card}>
        <LayoutLabeledFormItem label="サービス名">
          <PhotoPullDownMenu
            placeholder="サービスを選択"
            selectedContent={selectedService}
            setSelectedContent={setSelectedService}
            options={[
              ServiceName.GBP
              // TODO: 後々実装
              // ServiceName.TABELOG,
              // ServiceName.RETTY
            ]}
          />
        </LayoutLabeledFormItem>
        {selectedService === ServiceName.GBP && (
          <>
            <LayoutLabeledFormItem label="アカウントを選択">
              <PhotoPullDownMenu
                placeholder="アカウントを選択"
                selectedContent={selectedAccountName}
                setSelectedContent={setSelectedAccountName}
                options={accountList.map(account => account.accountName)}
              />
            </LayoutLabeledFormItem>
            <LayoutLabeledFormItem label="店舗を選択">
              <PhotoPullDownMenu
                placeholder="店舗を選択"
                selectedContent={selectedLocationTitle}
                setSelectedContent={setSelectedLocationTitle}
                options={locationList.map(location => location.title)}
              />
            </LayoutLabeledFormItem>
            <Wrapper justify="justify-end">
              <Button
                bgColor="primary"
                padding="3px 24px"
                onClick={handleNextClick}
              >
                <Typography content="次へ" size="normal" color="primary" />
              </Button>
            </Wrapper>
          </>
        )}
      </Wrapper>
    </Wrapper>
  )
}
