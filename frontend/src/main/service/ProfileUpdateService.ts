import { GoogleLocationProfileModel, GoogleLocationBusinessHours, GoogleLocationAddress, GoogleLocationServiceArea } from "@/main/model/LocationModel";
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
    value: string | object | undefined
  ): Promise<ProfileUpdateResult> {
    if (!this.currentProfile) {
      return {
        success: false,
        error: '店舗情報が見つかりません'
      };
    }

    if (value === undefined) {
      return {
        success: false,
        error: '値が入力されていません'
      };
    }

    try {
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
        const date = value as Date;
        return {
          openInfo: {
            openingDate: {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate()
            }
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

