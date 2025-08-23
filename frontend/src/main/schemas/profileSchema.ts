import { z } from 'zod'

// 営業時間の時間帯のスキーマ
const timeRangeSchema = z.object({
  openDay: z.string(),
  closeDay: z.string(),
  openTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, '時間の形式が正しくありません'),
  closeTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, '時間の形式が正しくありません')
})

// プロフィールフォームのスキーマ
export const profileSchema = z.object({
  // 概要タブ
  title: z.string()
    .min(1, 'ビジネス名は必須です')
    .max(100, '100文字以内で入力してください'),
  description: z.string()
    .max(1000, '1000文字以内で入力してください')
    .optional(),
  openingDate: z.date()
    .optional()
    .refine(date => {
      if (!date) return true
      return date <= new Date()
    }, '開業日は今日以前の日付を指定してください'),
  categories: z.array(z.string())
    .optional(),

  // 連絡先タブ
  phoneNumbers: z.object({
    primaryPhone: z.string()
      .regex(/^[0-9-]+$/, '電話番号の形式が正しくありません')
      .min(10, '電話番号は10桁以上で入力してください')
      .max(13, '電話番号は13桁以内で入力してください')
  }),
  websiteUri: z.string()
    .url('URLの形式が正しくありません')
    .optional(),
  menuUri: z.string()
    .url('URLの形式が正しくありません')
    .optional(),

  // 所在地タブ
  storefrontAddress: z.object({
    addressLines: z.array(z.string())
      .min(1, '住所は必須です'),
    locality: z.string(),
    administrativeArea: z.string(),
    postalCode: z.string()
      .regex(/^\d{3}-?\d{4}$/, '郵便番号の形式が正しくありません'),
    regionCode: z.string()
  }),
  serviceArea: z.object({
    businessType: z.string(),
    places: z.object({
      placeInfos: z.array(z.object({
        placeId: z.string(),
        displayName: z.string(),
        placeName: z.string().optional()
      }))
    }).optional()
  }),

  // 営業時間タブ
  regularHours: z.object({
    periods: z.array(timeRangeSchema)
  }),
  specialHours: z.object({
    periods: z.array(timeRangeSchema)
  }).optional(),

  // その他タブ
  businessOwnerInfo: z.string()
    .max(500, '500文字以内で入力してください')
    .optional(),
  serviceInfo: z.string()
    .max(500, '500文字以内で入力してください')
    .optional(),
  serviceOptionInfo: z.string()
    .max(500, '500文字以内で入力してください')
    .optional(),
  services: z.array(z.object({
    id: z.string(),
    name: z.string(),
    isAvailable: z.boolean()
  }))
})

export type ProfileFormData = z.infer<typeof profileSchema>;
