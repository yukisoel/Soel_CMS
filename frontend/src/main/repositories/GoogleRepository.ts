import {AxiosResponse} from "axios";
import {axiosApiClient} from "@/main/client/axiosClient.ts";
import {
  GoogleLocationFoodMenusModel,
  GoogleLocationLocalPostModel,
  GoogleLocationPhotoModel,
} from "@/main/model/LocationModel.ts";
import {GoogleAccount, GoogleLocation, GoogleLocationProfileModel, GoogleLocationDate, GoogleLocationCategory, GoogleLocationAttributeSnsLinkRequest, GoogleLocationAttributesModel, GoogleLocationStoreFrontAddressRequest, GoogleLocationBusinessHoursRequest, GooglePlacesAutoCompleteResponse, GoogleLocationLocalPostRequest, GoogleLocationReviewModel, BrandWithStoresListResponse, PrefectureListWithBrandListWithStoreListResponse } from "@/types/apiModel.ts";

export interface GoogleRepository {
  getAccounts(): Promise<GoogleAccount[]>

  getAccount(accountId: string): Promise<GoogleAccount>

  getLocations(googleAccount: GoogleAccount): Promise<GoogleLocation[]>

  getLocation(locationId: string): Promise<GoogleLocation>

  getLocationProfile(locationId: string): Promise<GoogleLocationProfileModel>

  getLocationPhotos(accountId: string, locationId: string): Promise<LocationPhotoListResponse>

  getLocationFoodMenus(accountId: string,locationId: string): Promise<GoogleLocationFoodMenusModel>

  getLocationAttributes(locationId: string): Promise<GoogleLocationAttributesModel>

  getCategories(): Promise<GoogleLocationCategory[]>

  getLocationReviews(accountId: string, locationId: string): Promise<GoogleLocationReviewModel[]>

  getBrandList(): Promise<BrandWithStoresListResponse>

  getStoreListByPrefecture(): Promise<PrefectureListWithBrandListWithStoreListResponse>

  postLocationPhoto(accountId: string, locationId: string, photos: FileList): Promise<void>

  updateLocationProfile(locationId: string, updateMask: string, locationProfile: GoogleLocationProfileModel): Promise<GoogleLocationProfileModel>

  updateLocationProfileTitle(locationId: string, title: string): Promise<GoogleLocationProfileModel>

  updateLocationProfileDescription(locationId: string, description: string): Promise<GoogleLocationProfileModel>

  updateLocationProfilePrimaryCategories(locationId: string, category: GoogleLocationCategory): Promise<GoogleLocationProfileModel>

  updateLocationProfileAdditionalCategories(locationId: string, categories: GoogleLocationCategory[]): Promise<GoogleLocationProfileModel>

  updateLocationProfileOpeningDate(locationId: string, openingDate: GoogleLocationDate): Promise<GoogleLocationProfileModel>

  updateLocationProfilePhoneNumber(locationId: string, phoneNumbers: string): Promise<GoogleLocationProfileModel>

  updateLocationProfileWebsiteUri(locationId: string, websiteUri: string): Promise<GoogleLocationProfileModel>

  updateLocationAttributeMenuLink(locationId: string, menuLink: string): Promise<GoogleLocationProfileModel>

  updateLocationAttributeSnsLink(locationId: string, snsLink: GoogleLocationAttributeSnsLinkRequest): Promise<GoogleLocationProfileModel>

  updateLocationFoodMenus(accountId: string, locationId: string, foodMenus: GoogleLocationFoodMenusModel): Promise<void>

  updateLocationProfileStorefrontAddress(locationId: string, storefrontAddress: GoogleLocationStoreFrontAddressRequest): Promise<GoogleLocationProfileModel>

  updateLocationProfileServiceArea(locationId: string, serviceArea: string[]): Promise<GoogleLocationProfileModel>

  updateLocationProfileBusinessHours(locationId: string, businessHours: GoogleLocationBusinessHoursRequest): Promise<GoogleLocationProfileModel>

  postPlacesAutoComplete(input: string): Promise<GooglePlacesAutoCompleteResponse>

  postLocationLocalPosts(accountId: string, locationId: string, localPost: GoogleLocationLocalPostRequest, photos: FileList): Promise<void>

  postLocationReviewReply(accountId: string, locationId: string, reviewId: string, content: string): Promise<void>

  deleteLocationReviewReply(accountId: string, locationId: string, reviewId: string): Promise<void>
}

type AccountListResponse = GoogleAccount[]
type LocationListResponse = GoogleLocation[]
type LocationResponse = GoogleLocation
type LocationPhotoListResponse = GoogleLocationPhotoModel[]

export class GoogleRepositoryImpl implements GoogleRepository {
  async getAccounts(): Promise<GoogleAccount[]> {
    try {
      const response: AxiosResponse<AccountListResponse> = await axiosApiClient.get('google/accounts', {
        headers: {
          'Accept': 'application/json; charset=utf-8',
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google get accounts failed")
    }
  }

  async getAccount(accountId: string): Promise<GoogleAccount> {
    try {
      const response: AxiosResponse<GoogleAccount> = await axiosApiClient.get('google/account', {
        params: {
          accountId: accountId
        },
        headers: {
          'Accept': 'application/json; charset=utf-8',
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google get account failed")
    }
  }

  async getLocations(googleAccount: GoogleAccount): Promise<GoogleLocation[]> {
    try {
      const response: AxiosResponse<LocationListResponse> = await axiosApiClient.get('google/locations', {
        params: {
          accountId: googleAccount.name
        },
        headers: {
          'Accept': 'application/json; charset=utf-8',
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google get locations failed")
    }
  }

  async getLocation(locationId: string): Promise<GoogleLocation> {
    try {
      const response: AxiosResponse<LocationResponse> = await axiosApiClient.get('google/location', {
        params: {
          locationId: locationId
        },
        headers: {
          'Accept': 'application/json; charset=utf-8',
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google get location failed")
    }
  }

  async getLocationProfile(locationId: string): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.get('google/location/profile', {
        params: {
          locationId: locationId
        },
        headers: {
          'Accept': 'application/json; charset=utf-8',
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google get location profile failed")
    }
  }

  async getLocationPhotos(accountId: string, locationId: string): Promise<LocationPhotoListResponse> {
    try {
      const response: AxiosResponse<LocationPhotoListResponse> = await axiosApiClient.get('google/location/photos', {
        params: {
          accountId: accountId,
          locationId: locationId
        },
        headers: {
          'Accept': 'application/json; charset=utf-8',
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google get location photos failed")
    }
  }

  async getLocationFoodMenus(accountId: string, locationId: string): Promise<GoogleLocationFoodMenusModel> {
    try {
      const response: AxiosResponse<GoogleLocationFoodMenusModel> =
        await axiosApiClient.get("google/location/food_menus", {
          params: {
            accountId: accountId,
            locationId: locationId,
          },
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        })
      return response.data;
    } catch (error) {
      console.error(error)
      throw new Error("google get location food menus failed")
    }
  }

  async getLocationAttributes(locationId: string): Promise<GoogleLocationAttributesModel> {
    try {
      const response: AxiosResponse<GoogleLocationAttributesModel> = await axiosApiClient.get('google/location/attributes', {
        params: {
          locationId: locationId
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google get location attributes failed")
    }
  }

  async getCategories(): Promise<GoogleLocationCategory[]> {
    try {
      const response: AxiosResponse<GoogleLocationCategory[]> = await axiosApiClient.get('google/categories')
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google get categories failed")
    }
  }

  async getLocationReviews(accountId: string, locationId: string): Promise<GoogleLocationReviewModel[]> {

    try {
      const response: AxiosResponse<GoogleLocationReviewModel[]> = await axiosApiClient.get('google/location/reviews', {
        params: {
          accountId: accountId,
          locationId: locationId
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google get location reviews failed")
    }
  }

  async getBrandList(): Promise<BrandWithStoresListResponse> {
    try {
      const response: AxiosResponse<BrandWithStoresListResponse> = await axiosApiClient.get('brand/list')
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google get brand list failed")
    }
  }

  async getStoreListByPrefecture(): Promise<PrefectureListWithBrandListWithStoreListResponse> {

    try {
      const response: AxiosResponse<PrefectureListWithBrandListWithStoreListResponse> = await axiosApiClient.get('store/list/prefecture')
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google get store list by prefecture failed")
    }
  }

  async postLocationPhoto(accountId: string, locationId: string, photos: FileList): Promise<void> {
    try {
      const formData = new FormData()
      for (let i = 0; i < photos.length; i++) {
        formData.append('files', photos[i])
      }

      const response: AxiosResponse<void> = await axiosApiClient.post(
        'google/location/photos',
        formData,
        {
          params: {
            accountId: accountId,
            locationId: locationId
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      console.log(response)
    } catch (error) {
      console.error(error)
      throw new Error("google post location photo failed")
    }
  }

  async updateLocationProfile(locationId: string, updateMask: string, locationProfile: GoogleLocationProfileModel): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/profile',
        locationProfile,
        {
          params: {
            locationId: locationId,
            updateMask: updateMask
          },
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
        })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile failed")
    }
  }

  async updateLocationProfileTitle(locationId: string, title: string): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/profile/title',
        title,
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile title failed")
    }
  }

  async updateLocationProfileDescription(locationId: string, description: string): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/profile/description',
        description,
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile description failed")
    }
  }

  async updateLocationProfilePrimaryCategories(locationId: string, category: GoogleLocationCategory): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/profile/primary_category',
        category,
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile categories failed")
    }
  }

  async updateLocationProfileAdditionalCategories(locationId: string, categories: GoogleLocationCategory[]): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/profile/additional_categories',
        categories,
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile categories failed")
    }
  }

  async updateLocationProfileOpeningDate(locationId: string, openingDate: GoogleLocationDate): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/profile/opening_date',
        openingDate,
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile opening date failed")
    }
  }

  async updateLocationProfilePhoneNumber(locationId: string, phoneNumber: string): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/profile/phone_number',
        {phoneNumber},
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile phone number failed")
    }
  }

  async updateLocationProfileWebsiteUri(locationId: string, websiteUri: string): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/profile/website_uri',
        websiteUri,
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile website failed")
    }
  }

  async updateLocationAttributeMenuLink(locationId: string, menuLink: string): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/attributes/menu_link',
        menuLink,
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile menu link failed")
    }
  }

  async updateLocationAttributeSnsLink(locationId: string, snsLink: GoogleLocationAttributeSnsLinkRequest): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/attributes/sns_link',
        snsLink,
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile sns link failed")
    }
  }


  async updateLocationFoodMenus(accountId: string, locationId: string, foodMenus: GoogleLocationFoodMenusModel): Promise<void> {
    try {
      const response: AxiosResponse<void> = await axiosApiClient.patch(
        'google/location/food_menus',
        foodMenus,
        {
          params: {
            accountId: accountId,
            locationId: locationId,
          },
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
        })
        return response.data
    } catch (error) {
      throw new Error("google update location food menus failed")
    }
  }

  async updateLocationProfileStorefrontAddress(locationId: string, storefrontAddress: GoogleLocationStoreFrontAddressRequest): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/profile/store_front_address',
        storefrontAddress,
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile storefront address failed")
    }
  }

  async updateLocationProfileServiceArea(locationId: string, serviceArea: string[]): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/profile/service_area',
        serviceArea,
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile service area failed")
    }
  }

  async updateLocationProfileBusinessHours(locationId: string, businessHours: GoogleLocationBusinessHoursRequest): Promise<GoogleLocationProfileModel> {
    try {
      const response: AxiosResponse<GoogleLocationProfileModel> = await axiosApiClient.patch(
        'google/location/profile/business_hours',
        businessHours,
        {
          params: {
            locationId: locationId,
          },
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google update location profile business hours failed")
    }
  }

  async postPlacesAutoComplete(input: string): Promise<GooglePlacesAutoCompleteResponse> {
    try {
      const response: AxiosResponse<GooglePlacesAutoCompleteResponse> = await axiosApiClient.post(
        'google/places/autocomplete',
        {input},
        {
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google post places auto complete failed")
    }
  }

  async postLocationLocalPosts(accountId: string, locationId: string, localPost: GoogleLocationLocalPostRequest, photos: FileList): Promise<void> {
    try {
      const formData = new FormData()
      Array.from(photos).forEach((file) => {
        formData.append('files', file)
      })
      formData.append('localPost', new Blob([JSON.stringify(localPost)], {type: 'application/json'}))
      await axiosApiClient.post('google/location/local_post', formData, {
        params: {
          accountId: accountId,
          locationId: locationId
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      console.error('Error posting location local post:', error)
      throw error
    }
  }

  async postLocationReviewReply(accountId: string, locationId: string, reviewId: string, content: string): Promise<void> {
    try {
      const response: AxiosResponse<void> = await axiosApiClient.patch('google/location/reviews', {
        accountId: accountId,
        locationId: locationId,
        reviewId: reviewId,
        content: content
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google post location reviews failed")
    }
  }

  async deleteLocationReviewReply(accountId: string, locationId: string, reviewId: string): Promise<void> {
    try {
      const response: AxiosResponse<void> = await axiosApiClient.delete('google/location/reviews', {
        params: {
          accountId: accountId,
          locationId: locationId,
          reviewId: reviewId
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("google delete location review reply failed")
    }
  }
}
