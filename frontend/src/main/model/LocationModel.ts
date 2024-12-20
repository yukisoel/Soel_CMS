import { LocationAssociationName } from "@/main/model/LocationAssociationName.ts"

export type GoogleLocationProfileModel = {
  name?: string
  title?: string
  phoneNumbers?: GoogleLocationPhoneNumbers
  categories?: GoogleLocationCategories
  storefrontAddress?: GoogleLocatiionPostalAddress
  websiteUri?: string
  regularHours?: GoogleLocationBusinessHours
  profile?: GoogleLocationProfile
  openInfo?: GoogleLocationOpenInfo
  serviceArea?: GoogleLocationServiceArea
}

export type GoogleLocationPhoneNumbers = {
  primaryPhone: string
}

export type GoogleLocationCategories = {
  primaryCategory?: GoogleLocationCategory
  additionalCategories?: GoogleLocationCategory[]
}

export type GoogleLocationCategory = {
  name?: string
  displayName?: string
}

export type GoogleLocatiionPostalAddress = {
  postalCode: string
  administrativeArea: string
  addressLines: string[]
}

export type GoogleLocationBusinessHours = {
  periods: GoogleLocationTimePeriod[]
}

export type GoogleLocationTimePeriod = {
  openDay: DayOfWeek
  openTime: GoogleLocationTimeOfDay
  closeDay: DayOfWeek
  closeTime: GoogleLocationTimeOfDay
}

export type GoogleLocationTimeOfDay = {
  hours: number
  minutes: number
  seconds: number
  nanos: number
}

export enum DayOfWeek {
  DAY_OF_WEEK_UNSPECIFIED = "The day of the week is unspecified.",
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

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
  businessType?: string
  regionCode?: string
  places?: GoogleLocationPlaceInfos
}

export type GoogleLocationPlaceInfos = {
  placeInfos?: GoogleLocationPlaceInfo[]
}

export type GoogleLocationPlaceInfo = {
  placeName?: string
  placeId?: string
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
  price?: GoogleLocationMoeny
  spiciness?: string
  allergen?: string[]
  dietaryRestriction?: string[]
  nutritionFacts?: any
  ingredients?: any[]
  servesNumPeople?: any[]
  preparationMethods?: any[]
  portionSize?: any
  mediaKeys?: string[]
}

export type GoogleLocationMoeny = {
  units?: string | null
  currencyCode?: string | null
  nanos?: number | null
}

export type GoogleLocationFoodMenuItemOption = {
  labels: GoogleLocationMenuLabel[]
  attributes: GoogleLocationFoodMenuItemAttributes
}
