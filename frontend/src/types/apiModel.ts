import {components, paths} from "@/types/api";

export type GoogleAccount = paths['/api/google/account']['get']['responses']['200']['content']['*/*']

export type GoogleLocation = paths['/api/google/location']['get']['responses']['200']['content']['*/*']

// /api/google/location/profile
export type GoogleLocationProfileModel = paths['/api/google/location/profile']['get']['responses']['200']['content']['*/*']

// /api/google/location/photos
export type GoogleLocationPhotoModel = paths['/api/google/location/photos']['get']['responses']['200']['content']['*/*'][0]

// /api/google/location/food_menus
export type GoogleLocationFoodMenusModel = paths['/api/google/location/food_menus']['get']['responses']['200']['content']['*/*']

// /api/google/location/local_posts
export type GoogleLocationLocalPostModel = paths['/api/google/location/local_posts']['get']['responses']['200']['content']['*/*'][0]


export type GoogleLocationPhoneNumbers = components['schemas']['GoogleLocationPhoneNumbers']
export type GoogleLocationCategories = components['schemas']['GoogleLocationCategories']
export type GoogleLocationCategory = components["schemas"]["GoogleLocationCategory"]
export type GoogleLocationProfile = components['schemas']['GoogleLocationProfile']
export type GoogleLocationOpenInfo = components['schemas']['GoogleLocationOpenInfo']
export type GoogleLocationDate = components['schemas']['GoogleLocationDate']
export type GoogleLocationServiceArea = components['schemas']['GoogleLocationServiceArea']
export type GoogleLocationPlaceInfos = components['schemas']['GoogleLocationPlaceInfos']
export type GoogleLocationPlaceInfo = components['schemas']['GoogleLocationPlaceInfo']
export type GoogleLocationAssociation = components['schemas']['GoogleLocationAssociation']
export type GoogleLocationPhotoDataRef = components['schemas']['GoogleLocationPhotoDataRef']
export type GoogleLocationCallToAction = components['schemas']['GoogleLocationCallToAction']
export type GoogleLocationEvent = components['schemas']['GoogleLocationEvent']
export type GoogleLocationTimeInterval = components['schemas']['GoogleLocationTimeInterval']
export type GoogleLocationTimeOfDay = components['schemas']['GoogleLocationTimeOfDay']
export type GoogleLocationFoodMenu = components['schemas']['GoogleLocationFoodMenu']
export type GoogleLocationMenuLabel = components['schemas']['GoogleLocationMenuLabel']
export type GoogleLocationFoodMenuSection = components['schemas']['GoogleLocationFoodMenuSection']
export type GoogleLocationFoodMenuItem = components['schemas']['GoogleLocationFoodMenuItem']
export type GoogleLocationFoodMenuItemAttributes = components['schemas']['GoogleLocationFoodMenuItemAttributes']
export type GoogleLocationFoodMenuItemOption = components['schemas']['GoogleLocationFoodMenuItemOption']
export type GoogleLocationMoney = components['schemas']['GoogleLocationMoney']
export type GoogleLocationAttributeSnsLinkRequest = components['schemas']['GoogleLocationAttributeSnsLinkRequest']
export type GoogleLocationAttributesModel = components['schemas']['GoogleLocationAttributesModel']
export type GoogleLocationAttribute = components['schemas']['GoogleLocationAttribute']
export type GoogleLocationAttributeUriValue = components['schemas']['GoogleLocationAttributeUriValue']
export type JsonNode = components['schemas']['JsonNode']
// export type GoogleLocationBusinessHours = paths['/api/google/location/profile']['get']['responses']['200']['content']['*/*']['regularHours']
// export type GoogleLocationTimePeriod = paths['/api/google/location/profile']['get']['responses']['200']['content']['*/*']['regularHours']['periods'][0]
// export type GoogleLocationTimeOfDay = paths['/api/google/location/profile']['get']['responses']['200']['content']['*/*']['regularHours']['periods'][0]['openTime']
// export type GoogleLocationPostalAddress = paths['/api/google/location/profile']['get']['responses']['200']['content']['*/*']['storefrontAddress']


export type GoogleLocationOffer = paths['/api/google/location/local_posts']['get']['responses']['200']['content']['*/*'][0]['offer']

