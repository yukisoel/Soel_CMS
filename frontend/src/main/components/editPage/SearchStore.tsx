import styles from "@/main/components/editPage/SearchStore.module.scss";
import PullDownMenu from "@/main/components/PullDownMenu.tsx";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GoogleAccountsContext} from "@/main/contexts/GoogleAccountsContext.tsx";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {StoreContext} from "@/main/contexts/StoreContext.tsx";
import {ServiceName} from "@/main/model/ServiceName.ts";
import {GoogleService} from "@/main/service/GoogleService.ts";
import {GoogleAccount} from "@/main/model/GoogleAccount.ts";

type Props = {
  googleService: GoogleService
}

export default function SearchStore({googleService}: Props) {
  const [selectedAccountName, setSelectedAccountName] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedPullDownMenu, setSelectedPullDownMenu] = useState<string>("none")
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState<GoogleAccount>({name: '', accountName: ''})
  const navigate = useNavigate()

  const {accountList} = useContext(GoogleAccountsContext)
  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {storeName, setStoreName} = useContext(StoreContext)


  useEffect(() => {
    setPankuzuItemList([{name: 'ページ編集', path: '/edit'}])
  }, [])
  useEffect(() => {
    if (selectedAccountName) {
      const googleAccount = accountList.filter(account => account.accountName === selectedAccountName)[0]
      if (googleAccount) {
        setSelectedGoogleAccount(googleAccount)
        createLocationList(googleAccount)
      }
    }
  }, [selectedAccountName])

  const createLocationList = (googleAccount:GoogleAccount): string[] => {
    console.log(googleAccount)
    googleService.getLocations(googleAccount).then(locations => {
      console.log({locations})
    })
    return []
  }

  const createAccountNameList = (): string[] => {
    if (accountList) {
      return accountList?.map(account => account.accountName)
    } else {
      return []
    }
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
                    options={createAccountNameList()}
                  />
                </div>
                <div data-testid="store_select_container"
                     className={styles.pull_down_menu_container}
                     hidden={selectedPullDownMenu !== '店舗を選択' && selectedPullDownMenu !== 'none'}
                >
                  <PullDownMenu
                    title={'店舗を選択'}
                    selectedContent={storeName}
                    setSelectedContent={setStoreName}
                    selectedPullDownMenu={selectedPullDownMenu}
                    setSelectedPullDownMenu={setSelectedPullDownMenu}
                    options={createAccountNameList()}
                  />
                </div>
              </div>
              <div className={styles.search_button_container}>
                <button
                  data-testid='search_button'
                  className={styles.search_button}
                  onClick={() => {
                    if (selectedService === 'GBP') {
                      navigate('/edit/gbp/' + selectedGoogleAccount.name)
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