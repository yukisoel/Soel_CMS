import styles from "@/main/components/editPage/EditPhotoLayout.module.scss";
import {GoogleService} from "@/main/service/GoogleService.ts";
import {useContext, useEffect, useRef, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {useParams} from "react-router-dom";
import PhotoPullDownMenu from "@/main/components/editPage/PhotoPullDownMenu.tsx";
import {GoogleLocationPhotoModel} from "@/main/model/LocationModel.ts";
import {LocationAssociationName} from "@/main/model/LocationAssociationName.ts";

type Props = {
  googleService: GoogleService
}

export default function EditPhotoLayout({googleService}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(LocationAssociationName.CATEGORY_UNSPECIFIED)
  const [photoList, setPhotoList] = useState<GoogleLocationPhotoModel[]>([])
  const [uploadedPhotoList, setUploadedPhotoList] = useState<string[]>([])
  const [showAddPhotoPage, setShowAddPhotoPage] = useState<boolean>(false)
  const [showAddPhotoListPage, setShowAddPhotoListPage] = useState<boolean>(false)
  const fileUploadInputRef = useRef<HTMLInputElement>(null)

  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {googleSelectedLocation, setGoogleSelectedLocation} = useContext(GoogleSelectedLocationContext)

  const {accountId, locationId} = useParams()

  useEffect(() => {
    setPankuzuItemList([
      {name: 'ページ編集', path: '/edit'},
      {name: 'GBP', path: '/edit/gbp'},
      {name: '写真', path: '/edit/photo'}])
    if (googleSelectedLocation.name === "" && locationId) {
      googleService.getLocation(locationId).then(location => {
        console.log({locationId})
        console.log({location})
        setGoogleSelectedLocation(location)
      })
    }
    if (accountId && locationId) {
      googleService.getLocationPhotos(accountId, locationId).then(photos => {
        setPhotoList(photos)
      })
    }
  }, [])

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
    console.log("onInputChange")
    if (event.target.files) {
      const files = event.target.files
      handleFileUpload(files)
    }
  }

  const handleFileUpload = (files:FileList) => {
    if (fileUploadInputRef.current) {
      fileUploadInputRef.current.files = files

      const urls = []
      for (let i = 0; i < files.length; i++) {
        urls.push(URL.createObjectURL(files[i]))
      }
      setUploadedPhotoList(urls)
      setShowAddPhotoListPage(true)
    }
  }

  const clickSelectFileButton = () => {
    if (fileUploadInputRef.current) {
      fileUploadInputRef.current.click()
    }
  }

  return (
    <div className={styles.edit_photo_container}>
      <div className={styles.header_container}>
        {!showAddPhotoPage && (
          <>
            <div className={styles.header_wrapper}>
              <div className={styles.category}>
                <PhotoPullDownMenu
                  selectedContent={selectedCategory}
                  setSelectedContent={setSelectedCategory}
                  options={Object.values(LocationAssociationName)}
                />
              </div>
              <div className={styles.add_button_container}>
                <button
                  className={styles.add_button}
                  onClick={() => {
                    setShowAddPhotoPage(!showAddPhotoPage)
                  }}
                >
                  写真追加
                </button>
              </div>
            </div>
          </>
        )}
        {showAddPhotoPage && (
          <>
            <div className={styles.add_header_wrapper}>
              <button
                className={styles.cancel_button}
                onClick={() => {
                  setShowAddPhotoPage(!showAddPhotoPage)
                  setShowAddPhotoListPage(false)
                }}
              >
                キャンセル
              </button>
              <button
                className={styles.add_button}
                onClick={() => {
                  setShowAddPhotoPage(!showAddPhotoPage)
                  setShowAddPhotoListPage(false)

                }}
              >
                追加する
              </button>
            </div>
          </>
        )}
      </div>
      <div className={styles.main_container}>
        {!showAddPhotoPage && (
          <div className={styles.photo_list_container}>
            {photoList.map((photo, index) => {
              return (
                <img
                  key={index}
                  className={styles.photo}
                  src={photo.googleUrl}
                  alt={"photo"}
                  hidden={!(selectedCategory === LocationAssociationName.CATEGORY_UNSPECIFIED || selectedCategory === photo.locationAssociation?.category)}
                />
              )
            })}
          </div>
        )}
        {showAddPhotoPage && !showAddPhotoListPage && (
          <>
            <div className={styles.file_upload_area_container}>
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
                  <p>写真をドラッグアンドドロップ</p>
                  <p>または</p>
                </div>
                <button className={styles.select_file_button}
                        onClick={clickSelectFileButton}
                >
                  ファイルを選択
                </button>
              </div>
            </div>
          </>
        )}
        {showAddPhotoListPage && (
          <div className={styles.photo_list_container}>
            {uploadedPhotoList.map((url, index) => {
              return (
                <img
                  key={index}
                  className={styles.photo}
                  src={url}
                  alt={"photo"}
                />
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}