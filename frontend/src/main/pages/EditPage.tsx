import styles from '@/main/pages/EditPage.module.scss'
import {useState} from "react";
import PullDownMenu from "@/main/components/PullDownMenu.tsx";
import ButtonBackIcon from "@/main/assets/Button_Back.svg";
import SidebarMenu from "@/main/common/SidebarMenu.tsx";

export default function EditPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>("入力して検索")
  const [selectedStore, setSelectedStore] = useState<string>("入力して検索")
  const [selectedService, setSelectedService] = useState<string>("入力して検索")

  return (
    <>
      <div className={styles.page_container}>
        <SidebarMenu
          email={'dummyEmail@sample.jp'}
        />
        <div className={styles.main_container}>
          <div className={styles.main_header}>
            <div className={styles.pankuzu}>ページ編集 /</div>
            <div className={styles.button_back_container}>
              <img src={ButtonBackIcon} alt={'button_back'}/>
            </div>
          </div>
          <div data-testid="window_store_search_container" className={styles.window_store_search_container}>
            <div className={styles.window_store_search_wrapper}>
              <div data-testid="brand_select_container" className={styles.pull_down_menu_container}>
                <PullDownMenu
                  title={'ブランドを選択'}
                  selectedContent={selectedBrand}
                  setSelectedContent={setSelectedBrand}
                  options={['ブランド1', 'ブランド2', 'ブランド3']}
                />
              </div>
              <div data-testid="store_select_container" className={styles.pull_down_menu_container}>
                <PullDownMenu
                  title={'店舗を選択'}
                  selectedContent={selectedStore}
                  setSelectedContent={setSelectedStore}
                  options={['SOELプレミアム秋葉原店', 'SOELプレミアム南青山店', 'SOELプレミアム吉祥寺店']}
                />
              </div>
              <div data-testid="service_select_container" className={styles.pull_down_menu_container}>
                <PullDownMenu
                  title={'対象サービスを選択'}
                  selectedContent={selectedService}
                  setSelectedContent={setSelectedService}
                  options={['GBP', '食べログ', 'Retty']}
                />
              </div>
              <div className={styles.search_button_container}>
                <button className={styles.search_button}>
                  検索
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}