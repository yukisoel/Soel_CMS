import { useState, useEffect } from 'react'
import { GoogleService } from '@/main/service/GoogleService.ts'
import { GoogleLocationFoodMenu, GoogleLocationFoodMenuSection, GoogleLocationMenuLabel, GoogleLocationFoodMenuItemAttributes, GoogleLocationFoodMenusModel, GoogleLocationMoeny } from '@/main/model/LocationModel'

export type MenuSectionItem = {
  sectionTitle: string
  items: { title: string, price: string }[]
}

export const toMenuSectionItems = (foodMenuSections: GoogleLocationFoodMenuSection[]): MenuSectionItem[] => {
    return foodMenuSections.map(section => {
      return {
        sectionTitle: section.labels[0].displayName,
        items: section.items.map(item => {
          return {
            title: item.labels[0].displayName,
            price: item.attributes.price?.units ?? ''
          }
        })
      }
    })
}

const createFoodMenuLabels = (sectionTitle: string, currentLabels?: GoogleLocationMenuLabel[]): GoogleLocationMenuLabel[] => {
    if (currentLabels) {
      return [{ ...currentLabels[0], displayName: sectionTitle }, ...currentLabels.slice(1)]
    }
    return [
      {
        displayName: sectionTitle,
        description: null,
        languageCode: null
      }
    ]
}

const createPrice = (price: string, currentPrice: GoogleLocationMoeny | null): GoogleLocationMoeny | null => {
    const p = () => {
      if (currentPrice) {
        return {
          ...currentPrice,
          currencyCode: currentPrice.currencyCode ?? 'JPY',
          units: price
        }
      }
      return {
        units: price,
        currencyCode: 'JPY',
        nanos: null
      }
    }
    const result = p()
    // unitsが空の場合はnullを返す
    return result.units === '' ? null : result
}

const createFoodMenuAttributes = (price: string, currentAttributes: GoogleLocationFoodMenuItemAttributes): GoogleLocationFoodMenuItemAttributes => {
    const defaultAttributes = {
      spiciness: null,
      allergen: null,
      dietaryRestriction: null,
      nutritionFacts: null,
      ingredients: null,
      servesNumPeople: null,
      preparationMethods: null,
      portionSize: null,
      mediaKeys: null
    }
    console.log('currentAttributes', currentAttributes)
    if (currentAttributes) {
      return {
        ...defaultAttributes,
        ...currentAttributes,
        price: createPrice(price, currentAttributes.price)
      }
    }
    return {
      ...defaultAttributes,
      price: createPrice(price, null)
    }
}

export const toFoodMenus = (menuSectionItems: MenuSectionItem[], foodMenu?: GoogleLocationFoodMenusModel): GoogleLocationFoodMenu[] => {
    const menu = foodMenu?.menus[0]
    const currentMenuSections = menu?.sections || []
    const newMenuSections = menuSectionItems.map((section, index) => {
      const currentItems = currentMenuSections[index]?.items || []
      return {
        labels: createFoodMenuLabels(section.sectionTitle, currentMenuSections[index]?.labels),
        items: section.items.map((item, j) => {
          return {
            labels: createFoodMenuLabels(item.title, currentItems[j]?.labels),
            attributes: createFoodMenuAttributes(item.price, currentItems[j]?.attributes),
            options: currentItems[j]?.options || null
          }
        })
      }
    })
    const newMenu = {
      labels: menu?.labels || [],
      sections: newMenuSections,
      cuisines: menu?.cuisines || null,
      sourceUrl: menu?.sourceUrl || null
    }
    return [newMenu, ...(foodMenu?.menus?.slice(1) || [])]
}

export const useMenuFood = (googleService: GoogleService, accountId: string | undefined, locationId: string | undefined) => {
  const [foodMenu, setFoodMenu] = useState<GoogleLocationFoodMenusModel>()
  const [menuSectionItems, setMenuSectionItems] = useState<MenuSectionItem[]>([])


  useEffect(() => {
    getFoodMenus()
  }, [accountId, locationId])

  const getFoodMenus = () => {
    if (accountId && locationId) {
      googleService.getLocationFoodMenus(accountId, locationId).then(data => {
        setFoodMenu(data)
        setMenuSectionItems(toMenuSectionItems(data.menus[0].sections))
      })
    }
  }

  const updateFoodMenus = (foodMenu: GoogleLocationFoodMenusModel) => {
    if (accountId && locationId) {
      googleService.updateLocationFoodMenus(accountId, locationId, foodMenu)
    }
  }

  return { foodMenu, menuSectionItems, updateFoodMenus }
}

