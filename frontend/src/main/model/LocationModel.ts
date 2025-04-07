import { LocationAssociationName } from "@/main/model/LocationAssociationName.ts"

export type GoogleLocationProfileModel = {
  name?: string
  title?: string
  phoneNumbers?: GoogleLocationPhoneNumbers
  categories?: GoogleLocationCategories
  storefrontAddress?: GoogleLocationAddress
  websiteUri?: string
  regularHours?: GoogleLocationBusinessHours
  profile?: GoogleLocationProfile
  openInfo?: GoogleLocationOpenInfo
  serviceArea?: GoogleLocationServiceArea
  menuUri?: string
  socialLinks?: GoogleLocationSocialLink[]
  specialHours?: GoogleLocationBusinessHours
  businessOwnerInfo?: string
  serviceInfo?: string
  serviceOptionInfo?: string
  services?: GoogleLocationService[]
}

export type GoogleLocationPhoneNumbers = {
  primaryPhone?: string
  additionalPhones?: {
    email?: string
  }
}

export type GoogleLocationCategories = {
  primaryCategory: GoogleLocationCategory
  additionalCategories?: GoogleLocationCategory[]
}

export type GoogleLocationCategory = {
  displayName: string
  categoryId: string
}

export type GoogleLocationAddress = {
  addressLines: string[]
  locality: string
  postalCode: string
  administrativeArea: string
  regionCode: string
}

export type GoogleLocationBusinessHours = {
  periods: BusinessHoursPeriod[]
}

export type BusinessHoursPeriod = {
  openDay: DayOfWeek
  closeDay: DayOfWeek
  openTime: string
  closeTime: string
}

export type GoogleLocationTimePeriod = {
  openDay: DayOfWeek
  closeDay: DayOfWeek
  openTime: string
  closeTime: string
}

export type GoogleLocationTimeOfDay = {
  hours: number
  minutes: number
  seconds: number
  nanos: number
}

export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

export type GoogleLocationProfile = {
  description?: string
}

export type GoogleLocationOpenInfo = {
  status?: string
  canReopen?: boolean
  openingDate?: GoogleLocationDate
}

export type GoogleLocationDate = {
  year?: number
  month?: number
  day?: number
}

export type GoogleLocationServiceArea = {
  businessType: BusinessType
  regionCode?: string
  places?: {
    placeInfos: GoogleLocationPlaceInfo[]
  }
}

export type BusinessType =
  | 'BUSINESS_TYPE_UNSPECIFIED'        // ビジネスタイプが指定されていません。
  | 'CUSTOMER_LOCATION_ONLY'           // ビジネスは顧客の場所でのみサービスを提供します。
  | 'CUSTOMER_AND_BUSINESS_LOCATION'   // ビジネスは顧客の場所とビジネスの場所の両方でサービスを提供します。

export type GoogleLocationPlaceInfos = {
  placeInfos?: GoogleLocationPlaceInfo[]
}

export type GoogleLocationPlaceInfo = {
  placeId: string;
  displayName: string;
  placeName?: string;
}

export type GoogleLocationPhotoModel = {
  name?: string
  googleUrl?: string
  thumbnailUrl?: string
  createTime?: string
  locationAssociation?: GoogleLocationAssociation
}

export type GoogleLocationAssociation = {
  category?: LocationAssociationName
}

export type GoogleLocationLocalPostModel = {
  name?: string
  languageCode?: string
  summary?: string
  callToAction?: GoogleLocationCallToAction
  createTime?: string
  updateTime?: string
  event?: GoogleLocationEvent
  media?: GoogleLocationPhotoModel[]
  searchUrl?: string
  topicType?: string
  alertType?: string
  offer?: GoogleLocationOffer
}

export type GoogleLocationCallToAction = {
  actionType?: string
  url?: string
}

export type GoogleLocationEvent = {
  title?: string
  schedule?: GoogleLocationTimeInterval
}

export type GoogleLocationTimeInterval = {
  startDate?: GoogleLocationDate
  endDate?: GoogleLocationDate
  startTime?: GoogleLocationTimeOfDay
  endTime?: GoogleLocationTimeOfDay
}

export type GoogleLocationOffer = {
  couponCode?: string
  redeemOnlineUrl?: string
  termsConditions?: string
}

export type GoogleLocationFoodMenusModel = {
  name: string | null
  menus: GoogleLocationFoodMenu[]
}

export type GoogleLocationFoodMenu = {
  labels: GoogleLocationMenuLabel[]
  sections: GoogleLocationFoodMenuSection[]
  sourceUrl: string | null
  cuisines: string | null
}

export type GoogleLocationMenuLabel = {
  description: string | null
  displayName: string
  languageCode: string | null
}

export type GoogleLocationFoodMenuSection = {
  labels: GoogleLocationMenuLabel[]
  items: GoogleLocationFoodMenuItem[]
}

export type GoogleLocationFoodMenuItem = {
  labels: GoogleLocationMenuLabel[]
  attributes: GoogleLocationFoodMenuItemAttributes,
  options: GoogleLocationFoodMenuItemOption[] | null
}

export type GoogleLocationFoodMenuItemAttributes = {
  price: GoogleLocationMoeny | null
  spiciness: string  | null
  allergen: string[] | null
  dietaryRestriction: string[] | null
  nutritionFacts: unknown | null
  ingredients: unknown[] | null
  servesNumPeople: unknown[] | null
  preparationMethods?: unknown[] | null
  portionSize: unknown | null
  mediaKeys: string[] | null
}

export type GoogleLocationMoeny = {
  units: string | null
  currencyCode: string | null
  nanos: number | null
}

export type GoogleLocationFoodMenuItemOption = {
  labels: GoogleLocationMenuLabel[]
  attributes: GoogleLocationFoodMenuItemAttributes
}

export type RegularHours = {
  periods: {
    openDay: string;
    closeDay: string;
    openTime: string;
    closeTime: string;
  }[];
};

export type StorefrontAddress = {
  addressLines: string[];
  locality: string;
  postalCode: string;
  administrativeArea: string;
  regionCode: string;
};

export type GoogleLocationSocialLink = {
  type: string
  url: string
}

export type GoogleLocationService = {
  id: string
  name: string
}

export type ServiceAreaInfo = {
  businessType: BusinessType;
  places?: {
    placeInfos: GoogleLocationPlaceInfo[];
  };
};
