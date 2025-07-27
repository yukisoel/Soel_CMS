// TODO: 一旦形骸化してるのでコメントアウト
// import { GoogleRepository } from "@/main/repositories/GoogleRepository";
// import {
//     GoogleLocationFoodMenusModel,
//     GoogleLocationLocalPostModel,
//     GoogleLocationPhotoModel,
// } from "@/main/model/LocationModel";
// import {
//     GoogleAccount,
//     GoogleLocation,
//     GoogleLocationCategory,
//     GoogleLocationProfileModel,
//     GoogleLocationAttributesModel,
//     GoogleLocationStoreFrontAddressRequest,
//     GoogleLocationBusinessHoursRequest,
//     GoogleLocationDate,
//     GoogleLocationAttributeSnsLinkRequest,
// } from "@/types/apiModel";

// export default class SpyGoogleRepository implements GoogleRepository {
//     getAccounts_isCalled = false;
//     getAccounts_returnValue: Promise<GoogleAccount[]> = Promise.resolve([]);
//     getAccounts(): Promise<GoogleAccount[]> {
//         this.getAccounts_isCalled = true;
//         return this.getAccounts_returnValue;
//     }

//     getAccount_isCalled = false;
//     getAccount_returnValue: Promise<GoogleAccount> = Promise.resolve({ name: "", accountName: "" });
//     getAccount(accountId: string): Promise<GoogleAccount> {
//         this.getAccount_isCalled = true;
//         return this.getAccount_returnValue;
//     }

//     getLocations_isCalled = false;
//     getLocations_returnValue: Promise<GoogleLocation[]> = Promise.resolve([]);
//     getLocations(googleAccount: GoogleAccount): Promise<GoogleLocation[]> {
//         this.getLocations_isCalled = true;
//         return this.getLocations_returnValue;
//     }

//     getLocation_isCalled = false;
//     getLocation_returnValue: Promise<GoogleLocation> = Promise.resolve({ name: "", title: "" });
//     getLocation(locationId: string): Promise<GoogleLocation> {
//         this.getLocation_isCalled = true;
//         return this.getLocation_returnValue;
//     }

//     getLocationProfile_isCalled = false;
//     getLocationProfile_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     getLocationProfile(locationId: string): Promise<GoogleLocationProfileModel> {
//         this.getLocationProfile_isCalled = true;
//         return this.getLocationProfile_returnValue;
//     }

//     getLocationPhotos_isCalled = false;
//     getLocationPhotos_returnValue: Promise<GoogleLocationPhotoModel[]> = Promise.resolve([]);
//     getLocationPhotos(accountId: string, locationId: string): Promise<GoogleLocationPhotoModel[]> {
//         this.getLocationPhotos_isCalled = true;
//         return this.getLocationPhotos_returnValue;
//     }

//     getLocationFoodMenus_isCalled = false;
//     getLocationFoodMenus_returnValue: Promise<GoogleLocationFoodMenusModel> = Promise.resolve({ name: "dummy", menus: [] });
//     getLocationFoodMenus(accountId: string, locationId: string): Promise<GoogleLocationFoodMenusModel> {
//         this.getLocationFoodMenus_isCalled = true;
//         return this.getLocationFoodMenus_returnValue;
//     }

//     getLocationAttributes_isCalled = false;
//     getLocationAttributes_returnValue: Promise<GoogleLocationAttributesModel> = Promise.resolve({ name: "dummy" });
//     getLocationAttributes(locationId: string): Promise<GoogleLocationAttributesModel> {
//         this.getLocationAttributes_isCalled = true;
//         return this.getLocationAttributes_returnValue;
//     }

//     getCategories_isCalled = false;
//     getCategories_returnValue: Promise<GoogleLocationCategory[]> = Promise.resolve([]);
//     getCategories(): Promise<GoogleLocationCategory[]> {
//         this.getCategories_isCalled = true;
//         return this.getCategories_returnValue;
//     }

//     postLocationPhoto_isCalled = false;
//     postLocationPhoto_returnValue: Promise<void> = Promise.resolve();
//     postLocationPhoto(accountId: string, locationId: string, photos: FileList): Promise<void> {
//         this.postLocationPhoto_isCalled = true;
//         return this.postLocationPhoto_returnValue;
//     }

//     postLocationLocalPost_isCalled = false;
//     postLocationLocalPost_returnValue: Promise<void> = Promise.resolve();
//     postLocationLocalPost(accountId: string, locationId: string, localPost: GoogleLocationLocalPostModel, photos: FileList): Promise<void> {
//         this.postLocationLocalPost_isCalled = true;
//         return this.postLocationLocalPost_returnValue;
//     }

//     updateLocationProfile_isCalled = false;
//     updateLocationProfile_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationProfile(locationId: string, updateMask: string, locationProfile: GoogleLocationProfileModel): Promise<GoogleLocationProfileModel> {
//         this.updateLocationProfile_isCalled = true;
//         return this.updateLocationProfile_returnValue;
//     }

//     updateLocationProfileTitle_isCalled = false;
//     updateLocationProfileTitle_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationProfileTitle(locationId: string, title: string): Promise<GoogleLocationProfileModel> {
//         this.updateLocationProfileTitle_isCalled = true;
//         return this.updateLocationProfileTitle_returnValue;
//     }

//     updateLocationProfileDescription_isCalled = false;
//     updateLocationProfileDescription_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationProfileDescription(locationId: string, description: string): Promise<GoogleLocationProfileModel> {
//         this.updateLocationProfileDescription_isCalled = true;
//         return this.updateLocationProfileDescription_returnValue;
//     }

//     updateLocationProfilePrimaryCategories_isCalled = false;
//     updateLocationProfilePrimaryCategories_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationProfilePrimaryCategories(locationId: string, category: GoogleLocationCategory): Promise<GoogleLocationProfileModel> {
//         this.updateLocationProfilePrimaryCategories_isCalled = true;
//         return this.updateLocationProfilePrimaryCategories_returnValue;
//     }

//     updateLocationProfileAdditionalCategories_isCalled = false;
//     updateLocationProfileAdditionalCategories_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationProfileAdditionalCategories(locationId: string, categories: GoogleLocationCategory[]): Promise<GoogleLocationProfileModel> {
//         this.updateLocationProfileAdditionalCategories_isCalled = true;
//         return this.updateLocationProfileAdditionalCategories_returnValue;
//     }

//     updateLocationProfileOpeningDate_isCalled = false;
//     updateLocationProfileOpeningDate_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationProfileOpeningDate(locationId: string, openingDate: GoogleLocationDate): Promise<GoogleLocationProfileModel> {
//         this.updateLocationProfileOpeningDate_isCalled = true;
//         return this.updateLocationProfileOpeningDate_returnValue;
//     }

//     updateLocationProfilePhoneNumber_isCalled = false;
//     updateLocationProfilePhoneNumber_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationProfilePhoneNumber(locationId: string, phoneNumbers: string): Promise<GoogleLocationProfileModel> {
//         this.updateLocationProfilePhoneNumber_isCalled = true;
//         return this.updateLocationProfilePhoneNumber_returnValue;
//     }

//     updateLocationProfileWebsiteUri_isCalled = false;
//     updateLocationProfileWebsiteUri_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationProfileWebsiteUri(locationId: string, websiteUri: string): Promise<GoogleLocationProfileModel> {
//         this.updateLocationProfileWebsiteUri_isCalled = true;
//         return this.updateLocationProfileWebsiteUri_returnValue;
//     }

//     updateLocationAttributeMenuLink_isCalled = false;
//     updateLocationAttributeMenuLink_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationAttributeMenuLink(locationId: string, menuLink: string): Promise<GoogleLocationProfileModel> {
//         this.updateLocationAttributeMenuLink_isCalled = true;
//         return this.updateLocationAttributeMenuLink_returnValue;
//     }

//     updateLocationAttributeSnsLink_isCalled = false;
//     updateLocationAttributeSnsLink_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationAttributeSnsLink(locationId: string, snsLink: GoogleLocationAttributeSnsLinkRequest): Promise<GoogleLocationProfileModel> {
//         this.updateLocationAttributeSnsLink_isCalled = true;
//         return this.updateLocationAttributeSnsLink_returnValue;
//     }

//     updateLocationFoodMenus_isCalled = false;
//     updateLocationFoodMenus_returnValue: Promise<void> = Promise.resolve();
//     updateLocationFoodMenus(accountId: string, locationId: string, foodMenus: GoogleLocationFoodMenusModel): Promise<void> {
//         this.updateLocationFoodMenus_isCalled = true;
//         return this.updateLocationFoodMenus_returnValue;
//     }

//     updateLocationProfileStorefrontAddress_isCalled = false;
//     updateLocationProfileStorefrontAddress_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationProfileStorefrontAddress(locationId: string, storefrontAddress: GoogleLocationStoreFrontAddressRequest): Promise<GoogleLocationProfileModel> {
//         this.updateLocationProfileStorefrontAddress_isCalled = true;
//         return this.updateLocationProfileStorefrontAddress_returnValue;
//     }

//     updateLocationProfileServiceArea_isCalled = false;
//     updateLocationProfileServiceArea_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationProfileServiceArea(locationId: string, serviceArea: string[]): Promise<GoogleLocationProfileModel> {
//         this.updateLocationProfileServiceArea_isCalled = true;
//         return this.updateLocationProfileServiceArea_returnValue;
//     }

//     updateLocationProfileBusinessHours_isCalled = false;
//     updateLocationProfileBusinessHours_returnValue: Promise<GoogleLocationProfileModel> = Promise.resolve({ name: "dummy" });
//     updateLocationProfileBusinessHours(locationId: string, businessHours: GoogleLocationBusinessHoursRequest): Promise<GoogleLocationProfileModel> {
//         this.updateLocationProfileBusinessHours_isCalled = true;
//         return this.updateLocationProfileBusinessHours_returnValue;
//     }
// }
