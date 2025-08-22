import styles from "@/main/components/editPage/EditLocalPostLayout.module.scss";
import {useContext, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import LocalPostButtonPullDownMenu from "@/main/components/editPage/LocalPostButtonPullDownMenu.tsx";
import {LocationButtonName} from "@/main/model/LocationButtonName.ts";
import { useGoogleRepository } from "@/main/contexts/GoogleRepositoryContext";

enum Tabs {
  STANDARD = "最新情報の追加",
  OFFER = "特典の追加",
  EVENT = "イベントの追加",
}


export default function EditLocalPostLayout() {
  const googleRepository = useGoogleRepository();
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.STANDARD)
  const [selectedContent, setSelectedContent] = useState<string>('')
  const fileUploadInputRef = useRef<HTMLInputElement>(null)

  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {googleSelectedLocation, setGoogleSelectedLocation} = useContext(GoogleSelectedLocationContext)


  const {accountId, locationId} = useParams()

  useEffect(() => {
    setPankuzuItemList([
      {name: 'ページ編集', path: '/edit'},
      {name: 'GBP', path: '/edit/gbp'},
      {name: '最新情報の追加', path: '/edit/local_post'}
    ])
    if (googleSelectedLocation.name === "" && locationId) {
      googleRepository.getLocation(locationId).then(location => {
        setGoogleSelectedLocation(location)
      })
    }
    if (accountId && locationId) {
      console.log({accountId})
    }
  }, []);


  const getTabClassName = (tab: Tabs) => {
    if (selectedTab === tab) {
      return styles.tab_selected
    } else {
      return styles.tab
    }
  }

  const handleClickTab = (tab: Tabs) => {
    setSelectedTab(tab)
  }

  const onDivDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("onDivDragOver")
    event.preventDefault()
  }

  const onDivDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("onDivDrop")
    event.preventDefault()
    event.stopPropagation()
    if (event.dataTransfer.files.length > 0) {
      const files = event.dataTransfer.files
      handleFileUpload(files)
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) handleFileUpload(event.target.files)
  }

  const handleFileUpload = (files: FileList) => {
    const urls = []
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]))
    }
  }

  const clickSelectFileButton = () => {
  }
  return (
    <div className={styles.edit_local_post_container}>
      <div className={styles.tab_container}>
        <div className={styles.tab_wrapper}>
          <div className={getTabClassName(Tabs.STANDARD)} onClick={() => handleClickTab(Tabs.STANDARD)}>最新情報の追加
          </div>
          <div className={getTabClassName(Tabs.OFFER)} onClick={() => handleClickTab(Tabs.OFFER)}>特典の追加</div>
          <div className={getTabClassName(Tabs.EVENT)} onClick={() => handleClickTab(Tabs.EVENT)}>イベントの追加</div>
        </div>
      </div>
      <div className={styles.tab_content_container}>
        {selectedTab === Tabs.STANDARD &&
          <>
            <div className={styles.file_upload_area}
                 onDragEnter={onDivDragOver}
                 onDragOver={onDivDragOver}
                 onDrop={onDivDrop}
            >
              <input
                type="file"
                multiple
                hidden
                ref={fileUploadInputRef}
                onChange={onInputChange}
              />
              <div className={styles.file_upload_text}>
                <div>写真をドラッグアンドドロップ または</div>
              </div>
              <button className={styles.select_file_button}
                      onClick={clickSelectFileButton}
              >
                ファイルを選択
              </button>
            </div>
            <div className={styles.description_area}>
              <div className={styles.description_text}>説明を追加</div>
              <textarea className={styles.description_text_area} placeholder={"最新の情報を入力"}/>
            </div>
            <div className={styles.select_button_area}>
              <div className={styles.select_button_text}>ボタンの追加（省略可）</div>
              <div className={styles.button__container}>
                <div className={styles.pull_down_menu_container}>
                <LocalPostButtonPullDownMenu selectedContent={selectedContent} setSelectedContent={setSelectedContent}
                                             options={Object.values(LocationButtonName)}/>
                </div>
                <div className={styles.submit_button_container}>
                  <button className={styles.submit_button}>投稿</button>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}
