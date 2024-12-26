import styles from "@/main/components/editPage/EditMenuLayout/EditMenuList.module.scss";
import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";
import Button from "@/main/common/Button";
import type { MenuSectionItem } from "@/main/components/editPage/EditMenuLayout/EditMenuLayout";
import { GoogleLocationFoodMenuSection } from "@/main/model/LocationModel";

type Props = {
  menuSectionItems: GoogleLocationFoodMenuSection[]
  onClickCreate: () => void
  onClickEdit: (item: GoogleLocationFoodMenuSection & { index: number}) => void
}

function MenuSectionItem({labels, items, index, onClickEdit}: GoogleLocationFoodMenuSection & { index: number } & Pick<Props, 'onClickEdit'>) {
   return (
    <Wrapper direction="col" gap="1.6rem" padding="0 0 2.7rem" className={styles.menu_section_container}>
        <Wrapper align="align-center" gap="1.1rem">
            <Typography content={labels[0].displayName} size="xlarge" color="primary" />
            <Button bgColor="primary" padding="1rem 2.2rem 1.2rem" onClick={() => onClickEdit({labels, items, index})}>
                <Typography content="編集" size="small" color="black" />
            </Button>
        </Wrapper>
        <Wrapper direction="col" gap="0.7rem">
            {items.map((item, i) => (
                <Wrapper align="align-center" gap="3.8rem" key={i}>
                    <Typography content={item.labels[0]?.displayName ?? ''} size="large" color="primary" />
                    {item.attributes.price && (
                    <Wrapper>
                        <Typography content={item.attributes.price?.units ?? ''} size="medium" color="secondary" />
                        <Typography content="円" size="medium" color="secondary" />
                    </Wrapper>
                    )}
                </Wrapper>
            ))}
        </Wrapper>
    </Wrapper>
   )
}

export default function EditMenuList({menuSectionItems, onClickCreate, onClickEdit}: Props) {
  return (
    <Wrapper direction="col" className={styles.edit_menu_container}>
        <Wrapper justify="justify-center" padding="0 0 2.2rem" className={styles.header_container}>
            <Button bgColor="primary" padding="2.2rem 4.5rem 2.4rem" onClick={onClickCreate}>
                <Typography content="セクションを追加" size="medium" color="primary" />
            </Button>
        </Wrapper>
        <Wrapper direction="col" gap="2.3rem" padding="7.7rem 18.3rem 0" className={styles.menu_container}>
            {menuSectionItems.map((sectionItem, index) => (
                <MenuSectionItem labels={sectionItem.labels} items={sectionItem.items} index={index} onClickEdit={onClickEdit} key={index} />
            ))}
        </Wrapper>
    </Wrapper>
  )
}
