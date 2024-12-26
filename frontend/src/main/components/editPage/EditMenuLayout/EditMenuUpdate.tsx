import styles from "@/main/components/editPage/EditMenuLayout/EditMenuUpdate.module.scss";
import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";
import Button from "@/main/common/Button";
import Input from "@/main/common/Input";
import CloseButton from "@/main/common/CloseButton";
import { useEffect, useState } from "react";
import { GoogleLocationFoodMenuSection } from "@/main/model/LocationModel";
import cloneDeep from "lodash.clonedeep";

type Props = {
    menuSectionItem: GoogleLocationFoodMenuSection
    onClickCancel: () => void
    onClickSave: (menuSectionItem: GoogleLocationFoodMenuSection) => void
}

export default function EditMenuUpdate({menuSectionItem: item, onClickCancel, onClickSave}: Props) {
    const [menuSectionItem, setMenuSectionItem] = useState<GoogleLocationFoodMenuSection>(cloneDeep(item))

    const handleAddItem = () => {
        menuSectionItem.items.push({
            labels: [{
                displayName: '',
                description: null,
                languageCode: 'ja'
            }],
            attributes: {
                price: {
                    units: '',
                    currencyCode: 'JPY',
                    nanos: null
                },
                spiciness: null,
                allergen: null,
                dietaryRestriction: null,
                nutritionFacts: undefined,
                ingredients: null,
                servesNumPeople: null,
                portionSize: undefined,
                mediaKeys: null
            },
            options: null
        })
        setMenuSectionItem({...menuSectionItem})
    };

    const handleRemoveItem = (index: number) => {
        menuSectionItem.items.splice(index, 1)
        setMenuSectionItem({...menuSectionItem})
    };

    const handleChangeItemDisplayName = (index: number, value: string) => {
        menuSectionItem.items[index].labels[0].displayName = value
        setMenuSectionItem({...menuSectionItem})
    }

    const handleChangeItemPriceUnits = (index: number, value: string) => {
        const price = menuSectionItem.items[index].attributes.price
        if (price) {
            if (value) {
                price.units = value
            } else {
                menuSectionItem.items[index].attributes.price = null
            }
        } else {
            menuSectionItem.items[index].attributes.price = {
                units: value,
                currencyCode: 'JPY',
                nanos: null
            }
        }
        setMenuSectionItem({...menuSectionItem})
    }

    const handleChangeSectionDisplayName = (section: string) => {
        const label = menuSectionItem.labels[0]
        if (label) {
            label.displayName = section
        } else {
            menuSectionItem.labels.push({
                displayName: section,
                description: null,
                languageCode: 'ja'
            })
        }
        setMenuSectionItem({...menuSectionItem})
    }

    useEffect(() => {
        setMenuSectionItem(cloneDeep(item))
    }, [])

  return (
    <Wrapper direction="col" className={styles.edit_menu_container}>
        <Wrapper justify="justify-center" gap="2rem" className={styles.header_container}>
            <Button bgColor="secondary" padding="2rem 3.2rem 2.1rem 3.1rem" onClick={onClickCancel}>
                <Typography content="キャンセル" size="medium" color="primary"/>
            </Button>
            <Button bgColor="primary" padding="2rem 6.9rem 2.1rem" onClick={() => onClickSave(menuSectionItem)}>
                <Typography content="保存" size="medium" color="primary" />
            </Button>
        </Wrapper>
        <Wrapper direction="col" gap="3.9rem" padding="9.1rem 26rem 9rem" className={styles.menu_container}>
            <Wrapper direction="col" gap="1rem">
                <Wrapper padding="0 0 0 3.8rem">
                    <Typography content="セクション" size="medium" color="primary" />
                </Wrapper>
                <Input placeholder="セクション名を入力" width="1066px" padding="2.3rem 0 2.3rem 3.8rem" value={menuSectionItem.labels[0]?.displayName ?? ''} onChange={(e) => handleChangeSectionDisplayName(e.target.value)} onClear={() => {handleChangeSectionDisplayName('')}} />
            </Wrapper>
            <Wrapper direction="col" gap="1rem">
                <Wrapper padding="0 0 0 3.8rem">
                    <Typography content="内容" size="medium" color="primary" />
                </Wrapper>
                <Wrapper direction="col" gap="2rem">
                    {menuSectionItem.items.map((item, index) => (
                    <Wrapper gap="1.5rem" key={index}>
                        <Input placeholder="商品名を入力" width="787px" padding="2.3rem 0 2.3rem 3.8rem" value={item.labels[0].displayName} onChange={(e) => handleChangeItemDisplayName(index, e.target.value)} />
                        <Wrapper gap="3.1rem" align="align-center">
                            <Wrapper gap="1.2rem" align="align-center">
                                <Input placeholder="0" width="143px" padding="2.3rem 1rem 2.3rem 3.8rem" value={item.attributes.price?.units ?? ''} onChange={(e) => handleChangeItemPriceUnits(index, e.target.value)} />
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
