import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '@/main/components/editPage/SearchStore.module.scss'
import PullDownMenu from '@/main/components/PullDownMenu.tsx'
import { PankuzuItemListContext } from '@/main/contexts/PankuzuItemListContext.tsx'
import { ServiceName } from '@/main/model/ServiceName.ts'
import { GoogleAccountsContext } from '@/main/contexts/GoogleAccountsContext.tsx'
import { GoogleSelectedLocationContext } from '@/main/contexts/GoogleSelectedLocationContext.tsx'
import { GoogleAccount, GoogleLocation } from '@/types/apiModel.ts'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext'


export default function SearchStore() {
  const googleRepository = useGoogleRepository()
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedAccountName, setSelectedAccountName] = useState<string>('')
  const [selectedLocationTitle, setSelectedLocationTitle] = useState<string>('')
  const [accountList, setAccountList] = useState<GoogleAccount[]>([])
  const [locationList, setLocationList] = useState<GoogleLocation[]>([])
  const [selectedPullDownMenu, setSelectedPullDownMenu] = useState<string>('none')
  const navigate = useNavigate()

  const { selectedAccount,setSelectedAccount } = useContext(GoogleAccountsContext)
  const { googleSelectedLocation, setGoogleSelectedLocation } = useContext(GoogleSelectedLocationContext)
  const { setPankuzuItemList } = useContext(PankuzuItemListContext)

  useEffect(() => {
    setPankuzuItemList([{ name: 'ページ編集', path: '/edit' }])
  }, [])

  useEffect(() => {
    if (selectedService === ServiceName.GBP) {
      createAccountList()
    }
  }, [selectedService])

  useEffect(() => {
    if (selectedAccountName) {
      const googleAccount = accountList.filter(account => account.accountName === selectedAccountName)[0]
      if (googleAccount) {
        setSelectedAccount(googleAccount)
        createLocationList(googleAccount)
      }
    }
  }, [selectedAccountName])

  useEffect(() => {
    if (selectedLocationTitle) {
      const googleLocation = locationList.filter(location => location.title === selectedLocationTitle)[0]
      setGoogleSelectedLocation(googleLocation)
    }
  }, [selectedLocationTitle])

  const createAccountList = () => {
    googleRepository.getAccounts().then(accounts => {
      setAccountList(accounts)
    })
  }

  const createLocationList = (googleAccount:GoogleAccount) => {
    googleRepository.getLocations(googleAccount).then(locations => {
      setLocationList(locations)
    })
  }

  return (
    <>
      <div data-testid="window_store_search_container" className={styles.window_store_search_container}>
        <div className={styles.window_store_search_wrapper}>
          {selectedService !== ServiceName.GBP &&
            <div className={styles.store_search_wrapper}>

              <div data-testid="service_select_container"
                className={styles.pull_down_menu_container}
                hidden={selectedPullDownMenu !== '対象サービスを選択' && selectedPullDownMenu !== 'none'}
              >
                <PullDownMenu
                  title={'対象サービスを選択'}
                  selectedContent={selectedService}
                  setSelectedContent={setSelectedService}
                  selectedPullDownMenu={selectedPullDownMenu}
                  setSelectedPullDownMenu={setSelectedPullDownMenu}
                  options={[ServiceName.GBP, ServiceName.TABELOG, ServiceName.RETTY]}
                />
              </div>
            </div>
          }
          {selectedService === ServiceName.GBP &&
            <>
              <div className={styles.store_search_wrapper}>
                <div data-testid="service_select_container"
                  className={styles.pull_down_menu_container}
                  hidden={selectedPullDownMenu !== '対象サービスを選択' && selectedPullDownMenu !== 'none'}
                >
                  <PullDownMenu
                    title={'対象サービスを選択'}
                    selectedContent={selectedService}
                    setSelectedContent={setSelectedService}
                    selectedPullDownMenu={selectedPullDownMenu}
                    setSelectedPullDownMenu={setSelectedPullDownMenu}
                    options={[ServiceName.GBP, ServiceName.TABELOG, ServiceName.RETTY]}
                  />
                </div>
                <div data-testid="brand_select_container"
                  className={styles.pull_down_menu_container}
                  hidden={selectedPullDownMenu !== 'アカウントを選択' && selectedPullDownMenu !== 'none'}
                >
                  <PullDownMenu
                    title={'アカウントを選択'}
                    selectedContent={selectedAccountName}
                    setSelectedContent={setSelectedAccountName}
                    selectedPullDownMenu={selectedPullDownMenu}
                    setSelectedPullDownMenu={setSelectedPullDownMenu}
                    options={accountList.map(account => account.accountName)}
                  />
                </div>
                <div data-testid="store_select_container"
                  className={styles.pull_down_menu_container}
                  hidden={selectedPullDownMenu !== '店舗を選択' && selectedPullDownMenu !== 'none'}
                >
                  <PullDownMenu
                    title={'店舗を選択'}
                    selectedContent={selectedLocationTitle}
                    setSelectedContent={setSelectedLocationTitle}
                    selectedPullDownMenu={selectedPullDownMenu}
                    setSelectedPullDownMenu={setSelectedPullDownMenu}
                    options={locationList.map(location => location.title)}
                  />
                </div>
              </div>
              <div className={styles.search_button_container}>
                <button
                  data-testid='search_button'
                  className={styles.search_button}
                  onClick={() => {
                    if (selectedService === 'GBP') {
                      navigate('/edit/gbp/accounts/' + selectedAccount?.name + '/location/'+ googleSelectedLocation.name)
                    }
                  }}
                >
                  検索
                </button>
              </div>
            </>
          }
        </div>
      </div>
    </>
  )
}
