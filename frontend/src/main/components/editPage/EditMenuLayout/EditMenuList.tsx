import styles from "@/main/components/editPage/EditMenuLayout/EditMenuList.module.scss";
import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";
import Button from "@/main/common/Button";

type Props = {
  menuSectionItems: MenuSectionItemProps[]
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

export default function EditMenuList({menuSectionItems}: Props) {
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
