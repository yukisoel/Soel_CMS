import {LocationAssociationName} from "@/main/model/LocationAssociationName.ts";

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
  openingDate?: GoogleLocationOpenDate
}

export type GoogleLocationOpenDate = {
  year?: string
  month?: string
  day?: string
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
  locationAssociation?:GoogleLocationAssociation
}

export type GoogleLocationAssociation = {
  category?: LocationAssociationName
}