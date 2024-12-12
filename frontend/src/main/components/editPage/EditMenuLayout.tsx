import styles from "@/main/components/editPage/EditMenuLayout.module.scss";
import {GoogleService} from "@/main/service/GoogleService.ts";
import {useContext, useEffect} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {useParams} from "react-router-dom";
import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";
import Button from "@/main/common/Button";

type Props = {
  googleService: GoogleService
}

type MenuSectionItemProps = {
    sectionTitle: string
    items: {title: string, price: string}[]
}

function MenuSectionItem({sectionTitle, items}: MenuSectionItemProps) {
   return (
    <Wrapper direction="col" className={styles.menu_section_container}>
        <Wrapper align="align-center" className={styles.menu_section_title_container}>
            <Typography content={sectionTitle} size="xlarge" color="primary" />
            <Button bgColor="primary" px="small" py="large">
                <Typography content="編集" size="small" color="black" />
            </Button>
        </Wrapper>
        <Wrapper direction="col" className={styles.menu_section_items_wrapper}>
            {items.map(item => (
                <Wrapper align="align-center" className={styles.menu_section_item_container}>
                    <Typography content={item.title} size="large" color="primary" />
                    <Typography content={item.price} size="medium" color="secondary" />

                </Wrapper>
            ))}
        </Wrapper>
    </Wrapper>
   )
}

export default function EditMenuLayout({googleService}: Props) {
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
  }, [])

  const menuSectionItems = [
     {
        sectionTitle: "ランチメニューセット",
        items: [
            {title: "鰻うどん定食", price: "1000円"},
            {title: "鰻うどん定食", price: "1200円"},
            {title: "鰻うどん定食", price: "1500円"},
        ]
     },
     {
        sectionTitle: "ランチメニューセット",
        items: [
            {title: "鰻うどん定食", price: "1000円"},
            {title: "鰻うどん定食", price: "1200円"},
            {title: "鰻うどん定食", price: "1500円"},
        ]
     }
  ]

  return (
    <Wrapper direction="col" className={styles.edit_menu_container}>
        <Wrapper justify="justify-center" className={styles.header_container}>
            <Button bgColor="primary" px="xlarge" py="xlarge">
                <Typography content="セクションを追加" size="medium" color="primary" />
            </Button>
        </Wrapper>

        <Wrapper direction="col" className={styles.menu_container}>
            {menuSectionItems.map(sectionItem => (
                <MenuSectionItem sectionTitle={sectionItem.sectionTitle} items={sectionItem.items} />
            ))}
        </Wrapper>
    </Wrapper>
  )
}
