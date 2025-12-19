/**
 * Settings Service
 * API service for managing user settings
 */

import { apiRequest } from "@/lib/api-client";
import type {
  ApiResponse,
  UserSettings,
  UpdateSettingsRequest,
  NotificationPreferences,
  PrivacySettings,
  AccountInfo,
  LanguagePreferences,
} from "@/types/buyer.types";

const BASE_URL = "/buyer/settings";

/**
 * Get all user settings
 */
export async function getSettings(): Promise<ApiResponse<UserSettings>> {
  return apiRequest<UserSettings>("get", BASE_URL);
}

/**
 * Update settings (generic endpoint with section parameter)
 */
export async function updateSettings(
  request: UpdateSettingsRequest
): Promise<ApiResponse<UserSettings>> {
  return apiRequest<UserSettings>("put", BASE_URL, request);
}

/**
 * Update notification preferences
 */
export async function updateNotificationPreferences(
  preferences: Partial<NotificationPreferences>
): Promise<ApiResponse<NotificationPreferences>> {
  return apiRequest<NotificationPreferences>(
    "put",
    `${BASE_URL}/notifications`,
    preferences
  );
}

/**
 * Update privacy settings
 */
export async function updatePrivacySettings(
  settings: Partial<PrivacySettings>
): Promise<ApiResponse<PrivacySettings>> {
  return apiRequest<PrivacySettings>("put", `${BASE_URL}/privacy`, settings);
}

/**
 * Update account information
 */
export async function updateAccountInfo(
  info: Partial<AccountInfo>
): Promise<ApiResponse<AccountInfo>> {
  return apiRequest<AccountInfo>("put", `${BASE_URL}/account`, info);
}

/**
 * Update language and regional preferences
 */
export async function updateLanguagePreferences(
  preferences: Partial<LanguagePreferences>
): Promise<ApiResponse<LanguagePreferences>> {
  return apiRequest<LanguagePreferences>(
    "put",
    `${BASE_URL}/language`,
    preferences
  );
}
