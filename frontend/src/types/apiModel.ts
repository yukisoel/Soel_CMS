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
export type GoogleLocationAttributeService = components['schemas']['GoogleLocationAttributeService']
export type GoogleLocationAttributeServiceOption = components['schemas']['GoogleLocationAttributeServiceOption']
export type GoogleLocationAttributeUriValue = components['schemas']['GoogleLocationAttributeUriValue']
export type GoogleLocationStoreFrontAddressRequest = components['schemas']['GoogleLocationStoreFrontAddressRequest']
export type GoogleLocationBusinessHoursRequest = components['schemas']['GoogleLocationBusinessHoursRequest']
export type GoogleLocationTimePeriod = components['schemas']['GoogleLocationTimePeriod']
export type JsonNode = components['schemas']['JsonNode']
export type GooglePlacesAutoCompleteRequest = components['schemas']['GooglePlacesAutoCompleteRequest']
export type GooglePlacesAutoCompleteResponse = components['schemas']['GooglePlacesAutoCompleteResponse']
export type GoogleLocationLocalPostRequest = components['schemas']['GoogleLocationLocalPostModel']
export type GoogleLocationReviewModel = components['schemas']['GoogleLocationReviewCustom']
export type GoogleLocationReviewReviewer = components['schemas']['GoogleLocationReviewReviewer']
export type GoogleLocationReviewReply = components['schemas']['GoogleLocationReviewReply']
export type BrandWithStoresListResponse = components['schemas']['BrandWithStoresListResponse']
export type PrefectureListWithBrandListWithStoreListResponse = components['schemas']['PrefectureListWithBrandListWithStoreListResponse']
export type PrefectureWithBrandListWithStoreListResponse = components['schemas']['PrefectureWithBrandListWithStoreListResponse']
export type BrandWithStoresResponse = components['schemas']['BrandWithStoresResponse']
export type StoreResponse = components['schemas']['StoreResponse']
// export type GoogleLocationBusinessHours = paths['/api/google/location/profile']['get']['responses']['200']['content']['*/*']['regularHours']
// export type GoogleLocationTimePeriod = paths['/api/google/location/profile']['get']['responses']['200']['content']['*/*']['regularHours']['periods'][0]
// export type GoogleLocationTimeOfDay = paths['/api/google/location/profile']['get']['responses']['200']['content']['*/*']['regularHours']['periods'][0]['openTime']
// export type GoogleLocationPostalAddress = paths['/api/google/location/profile']['get']['responses']['200']['content']['*/*']['storefrontAddress']


export type GoogleLocationOffer = paths['/api/google/location/local_posts']['get']['responses']['200']['content']['*/*'][0]['offer']

export enum LocationButtonName {
    ACTION_TYPE_UNSPECIFIED = '未指定',
    BOOK = '予約',
    ORDER = 'オンライン注文',
    SHOP = '購入',
    LEARN_MORE = '詳細',
    SIGN_UP = '登録',
    // GET_OFFER = 'オファー',
    CALL = '今すぐ電話',
}

export enum LocalPostTopicType {
    LOCAL_POST_TOPIC_TYPE_UNSPECIFIED = 'LOCAL_POST_TOPIC_TYPE_UNSPECIFIED',
    STANDARD = 'STANDARD',
    EVENT = 'EVENT',
    OFFER = 'OFFER',
    ALERT = 'ALERT',
}

export enum GoogleLocationAttributeServiceType {
    ALCOHOL = "アルコール飲料あり",
    ORGANIC_FOOD = "オーガニック料理あり",
    COCKTAILS = "カクテルあり",
    COFFEE = "コーヒーあり",
    SALAD_BAR = "サラダバーあり",
    HAPPY_HOUR_DRINKS = "ドリンクのハッピーアワーあり",
    HARD_LIQUOR = "ハードリカーあり",
    HALAL_MENU = "ハラルメニューあり",
    VEGAN_MENU = "ビーガンメニューあり",
    BEER = "ビールあり",
    VEGETARIAN_MENU = "ベジタリアンメニューあり",
    WINE = "ワインあり",
    PRIVATE_ROOMS = "個室あり",
    SMALL_PLATES = "小皿料理を提供するお店",
    HAPPY_HOUR_FOOD = "食べ物のハッピーアワーあり",
    ALL_YOU_CAN_EAT = "食べ放題あり",
    LATE_NIGHT_DINING = "深夜の食事可",
    BRAILLE_MENU = "点字メニューあり"
}

export enum GoogleLocationAttributeServiceOptionType {
    OUTDOOR_SEATING = "テラス席あり",
    CURBSIDE_PICKUP = "店先受取可",
    NO_CONTACT_DELIVERY = "非接触宅配可",
    DELIVERY = "宅配可",
    DRIVE_THROUGH = "ドライブスルーあり",
    DINE_IN = "実店舗の営業あり",
    TAKEOUT = "テイクアウト可",
    EAT_IN = "イートイン利用可"
}

// サービス属性名のマッピング（フロントエンドのenumキーからバックエンドのenumキーへ）
export const SERVICE_ATTRIBUTE_MAPPING: Record<string, string> = {
    ALCOHOL: 'SERVICE_ALCOHOL',
    ORGANIC_FOOD: 'SERVES_ORGANIC',
    COCKTAILS: 'SERVES_COCKTAILS',
    COFFEE: 'SERVES_COFFEE',
    SALAD_BAR: 'HAS_SALAD_BAR',
    HAPPY_HOUR_DRINKS: 'SERVES_HAPPY_HOUR_DRINKS',
    HARD_LIQUOR: 'SERVES_LIQUOR',
    HALAL_MENU: 'SERVES_HALAL_FOOD',
    VEGAN_MENU: 'SERVES_VEGAN',
    BEER: 'SERVES_BEER',
    VEGETARIAN_MENU: 'SERVES_VEGETARIAN',
    WINE: 'SERVES_WINE',
    PRIVATE_ROOMS: 'HAS_PRIVATE_DINING_ROOM',
    SMALL_PLATES: 'SERVES_SMALL_PLATES',
    HAPPY_HOUR_FOOD: 'SERVES_HAPPY_HOUR_FOOD',
    ALL_YOU_CAN_EAT: 'HAS_ALL_YOU_CAN_EAT_ALWAYS',
    LATE_NIGHT_DINING: 'SERVES_LATE_NIGHT_FOOD',
    BRAILLE_MENU: 'HAS_BRAILLE_MENU'
}

// サービスオプション属性名のマッピング（フロントエンドのenumキーからバックエンドのenumキーへ）
export const SERVICE_OPTION_ATTRIBUTE_MAPPING: Record<string, string> = {
    OUTDOOR_SEATING: 'HAS_SEATING_OUTDOORS',
    CURBSIDE_PICKUP: 'HAS_CURBSIDE_PICKUP',
    NO_CONTACT_DELIVERY: 'HAS_NO_CONTACT_DELIVERY',
    DELIVERY: 'HAS_DELIVERY',
    DRIVE_THROUGH: 'HAS_DRIVE_THROUGH',
    DINE_IN: 'HAS_ONSITE_SERVICES',
    TAKEOUT: 'HAS_TAKEOUT',
    EAT_IN: 'SERVES_DINE_IN'
}
