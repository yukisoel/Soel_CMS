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
    <Wrapper direction="col" gap="1.6rem" padding="0 0 2.7rem" className={styles.menu_section_container}>
        <Wrapper align="align-center" gap="1.1rem">
            <Typography content={sectionTitle} size="xlarge" color="primary" />
            <Button bgColor="primary" padding="1rem 2.2rem 1.2rem">
                <Typography content="編集" size="small" color="black" />
            </Button>
        </Wrapper>
        <Wrapper direction="col" gap="0.7rem">
            {items.map(item => (
                <Wrapper align="align-center" gap="3.8rem">
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
        <Wrapper justify="justify-center" padding="0 0 2.2rem" className={styles.header_container}>
            <Button bgColor="primary" padding="2.2rem 4.5rem 2.4rem">
                <Typography content="セクションを追加" size="medium" color="primary" />
            </Button>
        </Wrapper>
        <Wrapper direction="col" gap="2.3rem" padding="0 18.3rem" className={styles.menu_container}>
            {menuSectionItems.map(sectionItem => (
                <MenuSectionItem sectionTitle={sectionItem.sectionTitle} items={sectionItem.items} />
            ))}
        </Wrapper>
    </Wrapper>
  )
}
