import styles from "@/main/components/editPage/EditPhotoLayout.module.scss";
import {GoogleService} from "@/main/service/GoogleService.ts";
import {useContext, useEffect, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {useParams} from "react-router-dom";
import PhotoPullDownMenu from "@/main/components/editPage/PhotoPullDownMenu.tsx";
import {GoogleAccountsContext} from "@/main/contexts/GoogleAccountsContext.tsx";
import {GoogleLocationPhotoModel} from "@/main/model/LocationModel.ts";
import {LocationAssociationName} from "@/main/model/LocationAssociationName.ts";

type Props = {
  googleService: GoogleService
}

export default function EditPhotoLayout({googleService}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(LocationAssociationName.CATEGORY_UNSPECIFIED)
  const [photoList, setPhotoList] = useState<GoogleLocationPhotoModel[]>([])

  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {selectedAccount} = useContext(GoogleAccountsContext)
  const {googleSelectedLocation, setGoogleSelectedLocation} = useContext(GoogleSelectedLocationContext)

  const {locationId} = useParams()

  useEffect(() => {
    setPankuzuItemList([
      {name: 'ページ編集', path: '/edit'},
      {name: 'GBP', path: '/edit/gbp'},
      {name: '写真', path: '/edit/photo'}])
    if (googleSelectedLocation.name === "" && locationId) {
      googleService.getLocation(locationId).then(location => {
        setGoogleSelectedLocation(location)
      })
    } else if (selectedAccount) {
      googleService.getLocationPhotos(selectedAccount.name, googleSelectedLocation.name).then(photos => {
        setPhotoList(photos)
      })
    }
  }, [])

  return (
    <div className={styles.edit_photo_container}>
      <div className={styles.header_container}>
        <div className={styles.category}>
          <PhotoPullDownMenu
            selectedContent={selectedCategory}
            setSelectedContent={setSelectedCategory}
            options={Object.values(LocationAssociationName)}
          />
        </div>
        <div className={styles.add_button_container}>
          <button
            data-testid='search_button'
            className={styles.add_button}
            onClick={() => {
              console.log("写真追加")
            }}
          >
            写真追加
          </button>
        </div>
      </div>
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
    </div>
  )
}