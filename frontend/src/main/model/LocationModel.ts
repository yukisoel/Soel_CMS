export type GoogleLocationProfileModel = {
  name: string
  title: string
  phoneNumbers: GoogleLocationPhoneNumbers
  categories: GoogleLocationCategories
  storefrontAddress: GoogleLocatiionPostalAddress
  websiteUri: string
  regularHours: GoogleLocationBusinessHours
  profile: GoogleLocationProfile
}

export type GoogleLocationPhoneNumbers = {
  primaryPhone: string
}

export type GoogleLocationCategories = {
  primaryCategory: GoogleLocationCategory
  additionalCategories: GoogleLocationCategory[]
}

export type GoogleLocationCategory = {
  name: string
  displayName: string
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
  description: string
}