import { GoogleLocationProfileModel, GoogleLocationBusinessHours, GoogleLocationAddress, DayOfWeek, GoogleLocationServiceArea, GoogleLocationDate } from "@/main/model/LocationModel";
import { GoogleService } from "@/main/service/GoogleService";

export type ProfileField =
  | 'title'
  | 'phoneNumbers.primaryPhone'
  | 'websiteUri'
  | 'profile.description'
  | 'regularHours'
  | 'storefrontAddress'
  | 'categories'
  | 'openInfo'
  | 'menuUri'
  | 'serviceArea'
  | 'businessOwnerInfo'
  | 'serviceInfo'
  | 'serviceOptionInfo'
  | 'openInfo.openingDate';

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export type ProfileUpdateResult = {
  success: boolean;
  data?: GoogleLocationProfileModel;
  error?: string;
};

export class ProfileUpdateService {
  private currentProfile: GoogleLocationProfileModel | null = null;

  constructor(private googleService: GoogleService) {}

  async fetchLocationProfile(locationId: string): Promise<GoogleLocationProfileModel> {
    try {
      const profile = await this.googleService.getLocationProfile(locationId);
      this.currentProfile = profile;
      return profile;
    } catch (error) {
      throw new Error('店舗情報の取得に失敗しました');
    }
  }

  getCurrentProfile(): GoogleLocationProfileModel | null {
    return this.currentProfile;
  }

  async updateProfile(
    locationId: string,
    field: ProfileField,
    value: string | object
  ): Promise<ProfileUpdateResult> {
    if (!this.currentProfile) {
      return {
        success: false,
        error: '店舗情報が取得されていません'
      };
    }

    try {
      const validation = this.validateProfileUpdate(field, value);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.message || '入力値が不正です'
        };
      }

      let updateMask: string = field;
      if (field === 'categories') {
        updateMask = 'categories.primaryCategory.displayName';
      } else if (field === 'phoneNumbers.primaryPhone') {
        updateMask = 'phoneNumbers';
      } else if (field === 'regularHours') {
        updateMask = 'regularHours,specialHours';
      }

      const updateData = this.makeGoogleLocationProfileModel(field, value, this.currentProfile);

      const result = await this.googleService.updateLocationProfile(
        locationId,
        updateMask,
        updateData as GoogleLocationProfileModel
      );

      // 更新が成功したら現在のプロファイルを更新
      this.currentProfile = result;

      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '予期せぬエラーが発生しました'
      };
    }
  }

  validateProfileUpdate(field: ProfileField, value: string | object): ValidationResult {
    if (value === null || value === undefined) {
      return { isValid: false, message: '値が入力されていません' };
    }

    switch (field) {
      case "title":
        return {
          isValid: typeof value === 'string' && value.length > 0,
          message: '店舗名を入力してください'
        };
      case "phoneNumbers.primaryPhone": {
        if (typeof value !== 'string') return { isValid: false, message: '電話番号は文字列で入力してください' };
        const phoneNumber = value.replace(/\D/g, '');
        return {
          isValid: phoneNumber.length >= 10 && phoneNumber.length <= 11,
          message: '有効な電話番号を入力してください'
        };
      }
      case "websiteUri":
      case "menuUri": {
        if (typeof value !== 'string') return { isValid: false, message: 'URLは文字列で入力してください' };
        try {
          new URL(value);
          return { isValid: true };
        } catch {
          return { isValid: false, message: '有効なURLを入力してください' };
        }
      }
      case "regularHours": {
        const hours = value as GoogleLocationBusinessHours;
        if (!hours.periods || !Array.isArray(hours.periods)) {
          return { isValid: false, message: '営業時間の形式が不正です' };
        }
        return { isValid: true };
      }
      case "storefrontAddress": {
        const address = value as GoogleLocationAddress;
        if (!address.addressLines || !address.locality || !address.regionCode) {
          return { isValid: false, message: '住所の必須項目が入力されていません' };
        }
        return { isValid: true };
      }
      case "openInfo.openingDate": {
        const openingDate = (value as { openInfo: { openingDate: GoogleLocationDate } }).openInfo?.openingDate;
        if (!openingDate || !openingDate.year || !openingDate.month || !openingDate.day) {
          return { isValid: false, message: '開業日の形式が不正です' };
        }
        return { isValid: true };
      }
      default:
        return { isValid: true };
    }
  }

  private makeGoogleLocationProfileModel(
    field: ProfileField,
    value: string | object,
    currentProfile: GoogleLocationProfileModel
  ): Partial<GoogleLocationProfileModel> {
    switch (field) {
      case "title":
        return { title: value as string };
      case "phoneNumbers.primaryPhone": {
        const phoneNumber = (value as string).replace(/[-ー]/g, '');
        return {
          phoneNumbers: {
            primaryPhone: phoneNumber,
            ...currentProfile.phoneNumbers
          }
        };
      }
      case "websiteUri":
        return { websiteUri: value as string };
      case "profile.description":
        return { profile: { description: value as string } };
      case "regularHours": {
        const regularHours = value as GoogleLocationBusinessHours;
        return {
          regularHours,
          specialHours: currentProfile.specialHours || undefined
        };
      }
      case "storefrontAddress":
        return { storefrontAddress: value as GoogleLocationAddress };
      case "categories": {
        return {
          categories: {
            primaryCategory: {
              displayName: value as string,
              categoryId: currentProfile.categories?.primaryCategory.categoryId || ''
            }
          }
        };
      }
      case "openInfo.openingDate": {
        const openingDateValue = value as { openInfo: { openingDate: GoogleLocationDate } };
        return {
          openInfo: {
            openingDate: openingDateValue.openInfo.openingDate
          }
        };
      }
      case "openInfo":
        return { openInfo: { status: value as string } };
      case "menuUri":
        return { menuUri: value as string };
      case "serviceArea":
        return { serviceArea: value as GoogleLocationServiceArea };
      case "businessOwnerInfo":
        return { businessOwnerInfo: value as string };
      case "serviceInfo":
        return { serviceInfo: value as string };
      case "serviceOptionInfo":
        return { serviceOptionInfo: value as string };
      default:
        return {};
    }
  }
}

