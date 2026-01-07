/**
 * Supplier Settings Service
 * API service for managing supplier-specific settings
 */

import { apiRequest } from "@/lib/api-client";
import type { ApiResponse } from "@/types/buyer.types";

export interface SupplierAccountInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  bio?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface SupplierBusinessInfo {
  businessLegalName?: string;
  businessRegistrationNumber?: string;
  gstNumber?: string;
  businessType?: string;
  yearEstablished?: string;
}

export interface SupplierLanguagePreferences {
  language: string;
  region: string;
  dateFormat: string;
  timeFormat: string;
  currency: string;
}

export interface SupplierSettings {
  account: SupplierAccountInfo;
  business?: SupplierBusinessInfo;
  verificationStatus?: {
    status: string;
    percentage: number;
    completedSections: number;
    totalSections: number;
  };
}

/**
 * Get supplier profile/settings
 */
export async function getSupplierSettings(): Promise<
  ApiResponse<SupplierSettings>
> {
  const response = await apiRequest("get", "/supplier/profile");

  if (response.success && response.data) {
    // Transform supplier profile data to match our settings format
    const profileData = response.data as {
      company_info?: {
        company_name?: string;
        business_email?: string;
        phone?: string;
        description?: string;
        business_type?: string;
      };
      business_metrics?: {
        member_since?: number;
      };
    };

    return {
      success: true,
      data: {
        account: {
          firstName:
            profileData.company_info?.company_name?.split(" ")[0] || "",
          lastName: profileData.company_info?.company_name?.split(" ")[1] || "",
          email: profileData.company_info?.business_email || "",
          phone: profileData.company_info?.phone || "",
          companyName: profileData.company_info?.company_name || "",
          bio: profileData.company_info?.description || "",
          street: "",
          city: "",
          state: "",
          zip: "",
        },
        business: {
          businessLegalName: profileData.company_info?.company_name || "",
          businessType: profileData.company_info?.business_type || "",
          gstNumber: "",
          businessRegistrationNumber: "",
          yearEstablished:
            profileData.business_metrics?.member_since?.toString() || "",
        },
        verificationStatus: {
          status: "In Progress",
          percentage: 80,
          completedSections: 4,
          totalSections: 5,
        },
      },
    };
  }

  return response as ApiResponse<SupplierSettings>;
}

/**
 * Update supplier account information
 */
export async function updateSupplierAccountInfo(
  info: Partial<SupplierAccountInfo>
): Promise<ApiResponse<SupplierAccountInfo>> {
  // For suppliers, we use the role service to update profile
  return apiRequest("put", "/roles/supplier-profile", {
    businessName: info.companyName,
    businessEmail: info.email,
    businessPhone: info.phone,
    // businessAddress can be constructed from street, city, state, zip
  });
}

/**
 * Update supplier business information
 */
export async function updateSupplierBusinessInfo(
  info: Partial<SupplierBusinessInfo>
): Promise<ApiResponse<SupplierBusinessInfo>> {
  return apiRequest("put", "/roles/supplier-profile", {
    businessName: info.businessLegalName,
    businessType: info.businessType,
    gstNumber: info.gstNumber,
  });
}

/**
 * Update supplier language preferences
 * Note: Currently uses buyer endpoint as supplier-specific endpoint doesn't exist
 * This should work as language preferences are user-level, not role-specific
 */
export async function updateSupplierLanguagePreferences(
  preferences: Partial<SupplierLanguagePreferences>
): Promise<ApiResponse<SupplierLanguagePreferences>> {
  return apiRequest("put", "/buyer/settings/language", preferences);
}
