import styles from "@/main/components/editPage/EditMenuLayout/EditMenuUpdate.module.scss";
import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";
import Button from "@/main/common/Button";
import Input from "@/main/common/Input";
import CloseButton from "@/main/common/CloseButton";
import { useEffect, useState } from "react";
import { MenuSectionItem } from "./EditMenuLayout";

type Props = {
    sectionTitle: string
    items: {title: string, price: string}[]
    onClickCancel: () => void
    onClickSave: (menuSectionItem: MenuSectionItem) => void
}

export default function EditMenuUpdate({sectionTitle, items: menuItems, onClickCancel, onClickSave}: Props) {
    const [section, setSection] = useState(sectionTitle)
    const [items, setItems] = useState([{ title: '', price: '' }])

    const handleAddItem = () => {
        setItems([...items, { title: '', price: '' }])
    };

    const handleRemoveItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index)
        setItems(newItems)
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newItems = items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setItems(newItems)
    };

    useEffect(() => {
        setSection(sectionTitle)
        setItems(menuItems)
    }, [])

  return (
    <Wrapper direction="col" className={styles.edit_menu_container}>
        <Wrapper justify="justify-center" gap="2rem" className={styles.header_container}>
            <Button bgColor="secondary" padding="2rem 3.2rem 2.1rem 3.1rem" onClick={onClickCancel}>
                <Typography content="キャンセル" size="medium" color="primary"/>
            </Button>
            <Button bgColor="primary" padding="2rem 6.9rem 2.1rem" onClick={() => onClickSave({sectionTitle: section, items})}>
                <Typography content="保存" size="medium" color="primary" />
            </Button>
        </Wrapper>
        <Wrapper direction="col" gap="3.9rem" padding="9.1rem 26rem 9rem" className={styles.menu_container}>
            <Wrapper direction="col" gap="1rem">
                <Wrapper padding="0 0 0 3.8rem">
                    <Typography content="セクション" size="medium" color="primary" />
                </Wrapper>
                <Input placeholder="セクション名を入力" width="1066px" padding="2.3rem 0 2.3rem 3.8rem" value={section} onChange={(e) => setSection(e.target.value)} onClear={() => {setSection('')}} />
            </Wrapper>
            <Wrapper direction="col" gap="1rem">
                <Wrapper padding="0 0 0 3.8rem">
                    <Typography content="内容" size="medium" color="primary" />
                </Wrapper>
                <Wrapper direction="col" gap="2rem">
                    {items.map((item, index) => (
                    <Wrapper gap="1.5rem" key={index}>
                        <Input placeholder="商品名を入力" width="787px" padding="2.3rem 0 2.3rem 3.8rem" value={item.title} onChange={(e) => handleChange(index, 'title', e.target.value)} />
                        <Wrapper gap="3.1rem" align="align-center">
                            <Wrapper gap="1.2rem" align="align-center">
                                <Input placeholder="0" width="143px" padding="2.3rem 1rem 2.3rem 3.8rem" value={item.price} onChange={(e) => handleChange(index, 'price', e.target.value)} />
                                <Typography content="円" size="medium" color="primary" />
                            </Wrapper>
                            <CloseButton onClick={() => handleRemoveItem(index)} color="primary"/>
                        </Wrapper>
                    </Wrapper>
                    ))}
                    <Button bgColor="secondary" padding="1rem 2rem" onClick={handleAddItem}>
                        <Typography content="商品を追加" size="medium" color="primary" />
                    </Button>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    </Wrapper>
  )
}
