import { useState, useEffect } from 'react'
import styles from '@/main/components/stores/Review/Modal/SearchDetailModal.module.scss'
import Wrapper from '@/main/common/Wrapper'
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem'
import Modal from '@/main/common/Modal/Modal'
import PhotoPullDownMenu from '@/main/components/editPage/PhotoPullDownMenu'
import DatePicker from '@/main/common/DatePicker/DatePicker'
import RadioButton from '@/main/common/RadioButton'
import Button from '@/main/common/Button'
import Typography from '@/main/common/Typography'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext'
import { GoogleAccount, GoogleLocation } from '@/types/apiModel'

export type SearchCriteria = {
  accountId: string;
  locationId: string;
  accountName: string;
  locationTitle: string;
  startDate: Date | null;
  endDate: Date | null;
  replyStatus: string;
  ratingOrder: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (criteria: SearchCriteria) => void;
};

export default function SearchDetailModal({ isOpen, onClose, onSearch }: Props) {
  const googleRepository = useGoogleRepository()
  const [selectedAccountName, setSelectedAccountName] = useState<string>('')
  const [selectedLocationTitle, setSelectedLocationTitle] = useState<string>('')
  const [accountList, setAccountList] = useState<GoogleAccount[]>([])
  const [locationList, setLocationList] = useState<GoogleLocation[]>([])
  const [selectedAccount, setSelectedAccount] = useState<GoogleAccount | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<GoogleLocation | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [replyStatus, setReplyStatus] = useState<string>('指定なし')
  const [ratingOrder, setRatingOrder] = useState<string>('指定なし')

  const replyOptions = [
    { label: '未返信', value: '未返信' },
    { label: '返信済み', value: '返信済み' },
    { label: '指定なし', value: '指定なし' }
  ]

  const ratingOptions = [
    { label: '高評価', value: '高評価' },
    { label: '低評価', value: '低評価' },
    { label: '指定なし', value: '指定なし' }
  ]

  // Googleアカウント一覧を取得
  useEffect(() => {
    if (isOpen) {
      googleRepository.getAccounts().then(setAccountList)
    }
  }, [isOpen, googleRepository])

  // 選択されたアカウント名から店舗一覧を取得
  useEffect(() => {
    if (selectedAccountName) {
      const googleAccount = accountList.find(account => account.accountName === selectedAccountName)
      if (googleAccount) {
        setSelectedAccount(googleAccount)
        googleRepository.getLocations(googleAccount).then(setLocationList)
      }
    } else {
      setLocationList([])
      setSelectedAccount(null)
    }
  }, [selectedAccountName, accountList, googleRepository])

  // 選択された店舗名からGoogleLocationを設定
  useEffect(() => {
    if (selectedLocationTitle) {
      const googleLocation = locationList.find(location => location.title === selectedLocationTitle)
      if (googleLocation) {
        setSelectedLocation(googleLocation)
      }
    } else {
      setSelectedLocation(null)
    }
  }, [selectedLocationTitle, locationList])

  const handleSearch = () => {
    if (selectedAccount && selectedLocation) {
      onSearch({
        accountId: selectedAccount.name,
        locationId: selectedLocation.name,
        accountName: selectedAccount.accountName,
        locationTitle: selectedLocation.title,
        startDate,
        endDate,
        replyStatus,
        ratingOrder
      })
      onClose()
    }
  }

  return (
    <Modal headerContent="詳細を指定" isOpen={isOpen} onClose={onClose} contentRender={() => (
      <Wrapper direction="col" gap="3rem">
        <Wrapper gap="10rem">
          <LayoutLabeledFormItem label="Googleアカウント" className={styles.input_wrapper}>
            <PhotoPullDownMenu
              placeholder="Googleアカウントを選択"
              selectedContent={selectedAccountName}
              setSelectedContent={setSelectedAccountName}
              options={accountList.map(account => account.accountName)}
            />
          </LayoutLabeledFormItem>
          <LayoutLabeledFormItem label="開始日">
            <DatePicker defaultValue={startDate} onChange={(date) => setStartDate(date)} />
          </LayoutLabeledFormItem>
        </Wrapper>
        <Wrapper gap="10rem">
          <LayoutLabeledFormItem label="店舗名" className={styles.input_wrapper}>
            <PhotoPullDownMenu
              placeholder="店舗を選択"
              selectedContent={selectedLocationTitle}
              setSelectedContent={setSelectedLocationTitle}
              options={locationList.map(location => location.title)}
            />
          </LayoutLabeledFormItem>
          <LayoutLabeledFormItem label="終了日">
            <DatePicker defaultValue={endDate} onChange={(date) => setEndDate(date)} />
          </LayoutLabeledFormItem>
        </Wrapper>
        <LayoutLabeledFormItem label="表示順番（返信）">
          <Wrapper direction="row" gap="1rem">
            {replyOptions.map(option => (
              <RadioButton
                key={option.value}
                label={option.label}
                value={option.value}
                name="replyStatus"
                checked={replyStatus === option.value}
                onChange={setReplyStatus}
              />
            ))}
          </Wrapper>
        </LayoutLabeledFormItem>
        <LayoutLabeledFormItem label="表示順番（評価）">
          <Wrapper direction="row" gap="1rem">
            {ratingOptions.map(option => (
              <RadioButton
                key={option.value}
                label={option.label}
                value={option.value}
                name="ratingOrder"
                checked={ratingOrder === option.value}
                onChange={setRatingOrder}
              />
            ))}
          </Wrapper>
        </LayoutLabeledFormItem>
        <Wrapper justify="justify-end" gap="4rem">
          <Button bgColor="secondary" padding="7px 20px" onClick={onClose}>
            <Typography content="戻る" color="primary" size="normal" weight="normal" />
          </Button>
          <Button bgColor="primary" padding="7px 10px" onClick={handleSearch}>
            <Typography content="検索する" color="primary" size="normal" weight="normal" />
          </Button>
        </Wrapper>
      </Wrapper>
    )}/>
  )
}
