import { useState, useEffect } from 'react'
import { GoogleService } from '@/main/service/GoogleService.ts'
import { GoogleLocationFoodMenusModel } from '@/main/model/LocationModel'

export const useMenuFood = (googleService: GoogleService, accountId: string, locationId: string) => {
  const [foodMenu, setFoodMenu] = useState<GoogleLocationFoodMenusModel>()

  useEffect(() => {
    async function fetchData() {
      await getFoodMenus()
    }
    fetchData()
  }, [accountId, locationId])

  const getFoodMenus = async () => {
    return googleService.getLocationFoodMenus(accountId, locationId).then(data => {
      // Ensure menus is never null
      if (data && !data.menus) {
        data.menus = [{
          labels: [{
            displayName: 'メニュー',
            description: null,
            languageCode: null
          }],
          sections: [],
          sourceUrl: null,
          cuisines: null
        }]
      }
      setFoodMenu(data)
    })

  }

  const updateFoodMenus = async (foodMenu: GoogleLocationFoodMenusModel) => {
    return googleService.updateLocationFoodMenus(accountId, locationId, foodMenu).then(async () => {
      await getFoodMenus()
    })
  }

  return { foodMenu, updateFoodMenus }
}

