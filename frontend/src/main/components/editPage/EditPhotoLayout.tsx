import styles from "@/main/components/editPage/EditPhotoLayout.module.scss";
import {GoogleService} from "@/main/service/GoogleService.ts";
import {useContext, useEffect, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {useParams} from "react-router-dom";
import PhotoPullDownMenu from "@/main/components/editPage/PhotoPullDownMenu.tsx";

type Props = {
  googleService: GoogleService
}

export default function EditPhotoLayout({googleService}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
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
    }
  }, [])

  return (
    <div className={styles.edit_photo_container}>
      <div className={styles.header_container}>
        <div className={styles.category}>
          <PhotoPullDownMenu
            selectedContent={selectedCategory}
            setSelectedContent={setSelectedCategory}
            options={["aaa", "bbb"]}
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
        <img src={"https://lh5.googleusercontent.com/p/AF1QipPhqtSwgLVhhp7m_K_poeu3ysXxJuhZes-sktA=w203-h114-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
        <img src={"https://lh5.googleusercontent.com/p/AF1QipMb8_oelVox9uRJQHVO4c5qc3B5ASNfjX6f3XY=s902-k-no"}
             className={styles.photo} alt={"photo"}/>
      </div>
    </div>
  )
}