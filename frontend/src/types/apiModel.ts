import { components, paths } from '@/types/api'

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
export type GoogleLocationCategory = components['schemas']['GoogleLocationCategory']
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

// ビジネス所有者情報の型定義（バックエンドAPIに合わせてisOwnedByWomenのみ）
export type GoogleLocationBusinessOwnerInfo = boolean;
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
export type GoogleAttributeMetadata = components['schemas']['GoogleAttributeMetadata']
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
    ALCOHOL = 'アルコール飲料あり',
    ORGANIC_FOOD = 'オーガニック料理あり',
    COCKTAILS = 'カクテルあり',
    COFFEE = 'コーヒーあり',
    SALAD_BAR = 'サラダバーあり',
    HAPPY_HOUR_DRINKS = 'ドリンクのハッピーアワーあり',
    HARD_LIQUOR = 'ハードリカーあり',
    HALAL_MENU = 'ハラルメニューあり',
    VEGAN_MENU = 'ビーガンメニューあり',
    BEER = 'ビールあり',
    VEGETARIAN_MENU = 'ベジタリアンメニューあり',
    WINE = 'ワインあり',
    PRIVATE_ROOMS = '個室あり',
    SMALL_PLATES = '小皿料理を提供するお店',
    HAPPY_HOUR_FOOD = '食べ物のハッピーアワーあり',
    ALL_YOU_CAN_EAT = '食べ放題あり',
    LATE_NIGHT_DINING = '深夜の食事可',
    BRAILLE_MENU = '点字メニューあり',
    BREAKFAST = '朝食'
}

export enum GoogleLocationAttributeServiceOptionType {
    OUTDOOR_SEATING = 'テラス席あり',
    CURBSIDE_PICKUP = '店先受取可',
    NO_CONTACT_DELIVERY = '非接触宅配可',
    DELIVERY = '宅配可',
    DRIVE_THROUGH = 'ドライブスルーあり',
    DINE_IN = '実店舗の営業あり',
    TAKEOUT = 'テイクアウト可',
    EAT_IN = 'イートイン利用可',
    // バリアフリー
    AURACAST_BROADCAST_AUDIO = 'Auracast ブロードキャスト オーディオ',
    WHEELCHAIR_ACCESSIBLE_RESTROOM = '車椅子対応のトイレ',
    WHEELCHAIR_ACCESSIBLE_SEATING = '車椅子対応の座席',
    WHEELCHAIR_ACCESSIBLE_PARKING = '車椅子対応の駐車場',
    HEARING_LOOP = '集団補聴用のヒアリングループ',
    // 設備
    RESTROOM_UNISEX = '男女共用トイレ',
    // 客層
    TRANSGENDER_SAFESPACE = 'トランスジェンダー対応',
    LGBTQ_FRIENDLY = 'LGBTQ フレンドリー',
    // 駐車場
    ONSITE_PARKING = '敷地内駐車場',
    PARKING_GARAGE_FREE = '無料の屋内駐車場',
    PARKING_STREET_FREE = '無料の路上駐車場',
    PARKING_LOT_FREE = '無料駐車場',
    PARKING_GARAGE_PAID = '有料の屋内駐車場',
    PARKING_STREET_PAID = '有料の路上駐車場',
    PARKING_LOT_PAID = '有料駐車場',
    // プラン
    REQUIRES_APPOINTMENTS = '要予約',
    // 決済方法
    NFC_MOBILE_PAYMENT = 'NFC モバイル決済',
    CREDIT_CARD = 'クレジットカード',
    DEBIT_CARD = 'デビットカード',
    CASH_ONLY = '現金のみ',
    CHECK_PAYMENT = '小切手'
}

// サービス属性名のマッピング（フロントエンドのenumキーからバックエンドのenumキーへ）
export const SERVICE_ATTRIBUTE_MAPPING: Record<string, string> = {
  ALCOHOL: 'attributes/serves_alcohol',
  ORGANIC_FOOD: 'attributes/serves_organic',
  COCKTAILS: 'attributes/serves_cocktails',
  COFFEE: 'attributes/serves_coffee',
  SALAD_BAR: 'attributes/has_salad_bar',
  HAPPY_HOUR_DRINKS: 'attributes/serves_happy_hour_drinks',
  HARD_LIQUOR: 'attributes/serves_liquor',
  HALAL_MENU: 'attributes/serves_halal_food',
  VEGAN_MENU: 'attributes/serves_vegan',
  BEER: 'attributes/serves_beer',
  VEGETARIAN_MENU: 'attributes/serves_vegetarian',
  WINE: 'attributes/serves_wine',
  PRIVATE_ROOMS: 'attributes/has_private_dining_room',
  SMALL_PLATES: 'attributes/serves_small_plates',
  HAPPY_HOUR_FOOD: 'attributes/serves_happy_hour_food',
  ALL_YOU_CAN_EAT: 'attributes/has_all_you_can_eat_always',
  LATE_NIGHT_DINING: 'attributes/serves_late_night_food',
  BRAILLE_MENU: 'attributes/has_braille_menu',
  BREAKFAST: 'attributes/serves_breakfast'
}

// サービスオプション属性名のマッピング（フロントエンドのenumキーからバックエンドのenumキーへ）
export const SERVICE_OPTION_ATTRIBUTE_MAPPING: Record<string, string> = {
  OUTDOOR_SEATING: 'attributes/has_seating_outdoors',
  CURBSIDE_PICKUP: 'attributes/has_curbside_pickup',
  NO_CONTACT_DELIVERY: 'attributes/has_no_contact_delivery',
  DELIVERY: 'attributes/has_delivery',
  DRIVE_THROUGH: 'attributes/has_drive_through',
  DINE_IN: 'attributes/has_onsite_services',
  TAKEOUT: 'attributes/has_takeout',
  EAT_IN: 'attributes/serves_dine_in',
  // バリアフリー
  AURACAST_BROADCAST_AUDIO: 'attributes/has_auracast_broadcast_audio',
  WHEELCHAIR_ACCESSIBLE_RESTROOM: 'attributes/has_wheelchair_accessible_restroom',
  WHEELCHAIR_ACCESSIBLE_SEATING: 'attributes/has_wheelchair_accessible_seating',
  WHEELCHAIR_ACCESSIBLE_PARKING: 'attributes/has_wheelchair_accessible_parking',
  HEARING_LOOP: 'attributes/has_hearing_loop',
  // 設備
  RESTROOM_UNISEX: 'attributes/has_restroom_unisex',
  // 客層
  TRANSGENDER_SAFESPACE: 'attributes/is_transgender_safespace',
  LGBTQ_FRIENDLY: 'attributes/welcomes_lgbtq',
  // 駐車場
  ONSITE_PARKING: 'attributes/has_onsite_parking',
  PARKING_GARAGE_FREE: 'attributes/has_parking_garage_free',
  PARKING_STREET_FREE: 'attributes/has_parking_street_free',
  PARKING_LOT_FREE: 'attributes/has_parking_lot_free',
  PARKING_GARAGE_PAID: 'attributes/has_parking_garage_paid',
  PARKING_STREET_PAID: 'attributes/has_parking_street_paid',
  PARKING_LOT_PAID: 'attributes/has_parking_lot_paid',
  // プラン
  REQUIRES_APPOINTMENTS: 'attributes/requires_appointments',
  // 決済方法
  NFC_MOBILE_PAYMENT: 'attributes/pay_mobile_nfc',
  CREDIT_CARD: 'attributes/pay_credit_card',
  DEBIT_CARD: 'attributes/pay_debit_card',
  CASH_ONLY: 'attributes/requires_cash_only',
  CHECK_PAYMENT: 'attributes/pay_check'
}
