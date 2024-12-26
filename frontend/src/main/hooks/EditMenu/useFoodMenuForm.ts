import { GoogleLocationFoodMenuSection } from "@/main/model/LocationModel";
import cloneDeep from "lodash.clonedeep";
import { useEffect, useState } from "react";

export const useFoodMenuForm = (item: GoogleLocationFoodMenuSection) => {
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

    return {
        menuSectionItem,
        handleAddItem,
        handleRemoveItem,
        handleChangeItemDisplayName,
        handleChangeItemPriceUnits,
        handleChangeSectionDisplayName
    }
}
