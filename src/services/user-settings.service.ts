/**
 * User Settings Service (Role-Agnostic)
 * API service for managing user-level settings that work for all roles
 */

import { apiRequest } from "@/lib/api-client";
import type { ApiResponse } from "@/types/buyer.types";
import type {
  NotificationPreferences,
  PrivacySettings,
} from "@/types/buyer.types";

export interface UserLanguagePreferences {
  language: string;
  region: string;
  dateFormat: string;
  timeFormat: string;
  currency: string;
}

export interface UserAccountInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  bio?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

/**
 * Get user settings based on active role
 * Uses the correct endpoint based on which role the user is currently using
 */
export async function getUserSettings(activeRole: string): Promise<
  ApiResponse<{
    account: UserAccountInfo;
    language: UserLanguagePreferences;
    notifications?: NotificationPreferences;
    privacy?: PrivacySettings;
  }>
> {
  console.log("[getUserSettings] Called with activeRole:", activeRole);

  // Use buyer endpoint if user is active as buyer
  if (activeRole === "buyer") {
    console.log("[getUserSettings] Using buyer endpoint");
    return apiRequest("get", "/buyer/settings");
  }

  // Use supplier endpoint if user is active as supplier
  if (activeRole === "supplier") {
    console.log("[getUserSettings] Using supplier endpoint");
    const profileResponse = await apiRequest("get", "/supplier/profile");

    if (profileResponse.success && profileResponse.data) {
      const profileData = profileResponse.data as any;

      // Transform supplier profile to settings format
      return {
        success: true,
        data: {
          account: {
            firstName:
              profileData.company_info?.company_name?.split(" ")[0] || "",
            lastName:
              profileData.company_info?.company_name?.split(" ")[1] || "",
            email: profileData.company_info?.business_email || "",
            phone: profileData.company_info?.phone || "",
            companyName: profileData.company_info?.company_name || "",
            bio: profileData.company_info?.description || "",
            street: "",
            city: "",
            state: "",
            zip: "",
          },
          language: {
            language: profileData.language || "English",
            region: profileData.region || "United States",
            dateFormat: profileData.date_format || "MM/DD/YYYY",
            timeFormat: profileData.time_format || "12-hour",
            currency: profileData.currency || "USD",
          },
          notifications: profileData.notifications || {
            email: true,
            sms: false,
            push: true,
            marketing: false,
            digest: false,
            alerts: true,
          },
          privacy: profileData.privacy || {
            dataSharing: true,
            analytics: true,
          },
        },
      };
    }
  }

  return {
    success: false,
    message: "Unable to load settings",
  };
}

/**
 * Update language preferences (role-agnostic)
 * Uses role-agnostic endpoint that updates users table directly
 */
/**
 * Update language preferences based on active role
 */
export async function updateUserLanguagePreferences(
  preferences: Partial<UserLanguagePreferences>,
  activeRole: string
): Promise<ApiResponse<UserLanguagePreferences>> {
  // Use buyer endpoint if user is active as buyer
  if (activeRole === "buyer") {
    return apiRequest("put", "/buyer/settings/language", preferences);
  }

  // For supplier users, use role-agnostic endpoint
  if (activeRole === "supplier") {
    return apiRequest("put", "/roles/supplier-profile", {
      language: preferences.language,
      region: preferences.region,
      dateFormat: preferences.dateFormat,
      timeFormat: preferences.timeFormat,
      currency: preferences.currency,
    });
  }

  return {
    success: false,
    message: "Unable to update language preferences",
  };
}

/**
 * Update account information based on active role
 */
export async function updateUserAccountInfo(
  info: Partial<UserAccountInfo>,
  activeRole: string
): Promise<ApiResponse<UserAccountInfo>> {
  // Use buyer endpoint if user is active as buyer
  if (activeRole === "buyer") {
    return apiRequest("put", "/buyer/settings/account", info);
  }

  // For supplier users, use role-agnostic endpoint
  if (activeRole === "supplier") {
    return apiRequest("put", "/roles/supplier-profile", {
      businessName: info.companyName,
      businessEmail: info.email,
      businessPhone: info.phone,
    });
  }

  return {
    success: false,
    message: "Unable to update account information",
  };
}

/**
 * Update notification preferences based on active role
 */
export async function updateUserNotificationPreferences(
  preferences: Partial<NotificationPreferences>,
  activeRole: string
): Promise<ApiResponse<NotificationPreferences>> {
  // Use buyer endpoint if user is active as buyer
  if (activeRole === "buyer") {
    return apiRequest("put", "/buyer/settings/notifications", preferences);
  }

  // For supplier users, use role-agnostic endpoint
  if (activeRole === "supplier") {
    return apiRequest("put", "/roles/supplier-profile", {
      notifications: preferences,
    });
  }

  return {
    success: false,
    message: "Unable to update notification preferences",
  };
}

/**
 * Update privacy settings based on active role
 */
export async function updateUserPrivacySettings(
  settings: Partial<PrivacySettings>,
  activeRole: string
): Promise<ApiResponse<PrivacySettings>> {
  // Use buyer endpoint if user is active as buyer
  if (activeRole === "buyer") {
    return apiRequest("put", "/buyer/settings/privacy", settings);
  }

  // For supplier users, use role-agnostic endpoint
  if (activeRole === "supplier") {
    return apiRequest("put", "/roles/supplier-profile", {
      privacy: settings,
    });
  }

  return {
    success: false,
    message: "Unable to update privacy settings",
  };
}
