import styles from "@/main/components/editPage/SearchStore.module.scss";
import PullDownMenu from "@/main/components/PullDownMenu.tsx";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GoogleAccount, GoogleAccountsContext} from "@/main/contexts/GoogleAccountsContext.tsx";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {StoreContext} from "@/main/contexts/StoreContext.tsx";

export default function SearchStore() {
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedPullDownMenu, setSelectedPullDownMenu] = useState<string>("none")
  const [selectedAccount, setSelectedAccount] = useState<GoogleAccount>({name: '', accountName: ''})
  const navigate = useNavigate()

  const useGoogleAccountsContext = useContext(GoogleAccountsContext)
  const {accountList} = useGoogleAccountsContext
  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {storeName, setStoreName} = useContext(StoreContext)

  useEffect(() => {
    setPankuzuItemList([{name: 'ページ編集', path: '/edit'}])
  }, [])

  useEffect(() => {
    if(storeName ) {
      setSelectedAccount(accountList.filter(account => account.accountName === storeName)[0])
    }
  }, [storeName])

  const createAccountStoreNameList = (): string[] => {
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
          <div className={styles.store_search_wrapper}>
            <div data-testid="brand_select_container"
                 className={styles.pull_down_menu_container}
                 hidden={selectedPullDownMenu !== 'ブランドを選択' && selectedPullDownMenu !== 'none'}
            >
              <PullDownMenu
                title={'ブランドを選択'}
                selectedContent={selectedBrand}
                setSelectedContent={setSelectedBrand}
                selectedPullDownMenu={selectedPullDownMenu}
                setSelectedPullDownMenu={setSelectedPullDownMenu}
                options={['ブランド1', 'ブランド2', 'ブランド3', 'ブランド4', 'ブランド5', 'ブランド6', 'ブランド7', 'ブランド8', 'ブランド9']}
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
                options={createAccountStoreNameList()}
              />
            </div>
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
                options={['GBP', '食べログ', 'Retty']}
              />
            </div>
          </div>
          <div className={styles.search_button_container}>
            <button
              data-testid='search_button'
              className={styles.search_button}
              onClick={() => {
                if (selectedService === 'GBP') {
                  navigate('/edit/gbp/' + selectedAccount.name)
                }
              }}
            >
              検索
            </button>
          </div>
        </div>
      </div>
    </>
  )
}