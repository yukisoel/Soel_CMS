import { useState, useEffect } from 'react'
import { GoogleService } from '@/main/service/GoogleService.ts'
import { GoogleLocationFoodMenusModel } from '@/main/model/LocationModel'

export const useMenuFood = (googleService: GoogleService, accountId: string, locationId: string) => {
  const [foodMenu, setFoodMenu] = useState<GoogleLocationFoodMenusModel>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      await getFoodMenus()
      setIsLoading(false)
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
    setIsLoading(true)
    return googleService.updateLocationFoodMenus(accountId, locationId, foodMenu).then(async () => {
      await getFoodMenus()
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return { foodMenu, updateFoodMenus, isLoading }
}

