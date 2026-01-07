import { apiRequest } from "@/lib/api-client";
import {
  BuyerProfile,
  SupplierProfile,
  SupplierVerificationRequest,
  SupplierVerification,
  ApiResponse,
} from "@/types/api.types";

const TOKEN_KEY =
  process.env.NEXT_PUBLIC_JWT_TOKEN_KEY || "zeerostock_access_token";
const REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "zeerostock_refresh_token";
const USER_DATA_KEY =
  process.env.NEXT_PUBLIC_USER_DATA_KEY || "zeerostock_user";

export const roleService = {
  /**
   * Get user roles and profiles
   */
  async getUserRoles(): Promise<
    ApiResponse<{
      roles: string[];
      activeRole: string;
      buyerProfile?: BuyerProfile;
      supplierProfile?: SupplierProfile;
    }>
  > {
    return apiRequest("get", "/roles");
  },

  /**
   * Switch between buyer and supplier roles
   */
  async switchRole(
    role: "buyer" | "supplier"
  ): Promise<
    ApiResponse<{
      user: any;
      accessToken: string;
      refreshToken: string;
      activeRole: string;
    }>
  > {
    const response = await apiRequest<{
      user: any;
      accessToken: string;
      refreshToken: string;
      activeRole: string;
    }>("post", "/roles/switch-role", { role });

    // Backend returns new tokens and updated user object
    if (response.success && response.data && typeof window !== "undefined") {
      const { user, accessToken, refreshToken } = response.data;

      // Store new tokens
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      // Store updated user data with new active role
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

      console.log(
        "[RoleService] Updated localStorage with new role:",
        user.activeRole
      );
    }

    return response;
  },

  /**
   * Request supplier role verification
   */
  async requestSupplierRole(
    data: SupplierVerificationRequest
  ): Promise<ApiResponse<{ verificationId: string }>> {
    // If documents exist, use FormData
    if (data.documents && data.documents.length > 0) {
      const formData = new FormData();

      // Append all non-file fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "documents") {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });

      // Append files
      data.documents.forEach((file) => {
        formData.append(`documents`, file);
      });

      return apiRequest("post", "/roles/request-supplier-role", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    return apiRequest("post", "/roles/request-supplier-role", data);
  },

  /**
   * Get supplier verification status
   */
  async getSupplierVerificationStatus(): Promise<
    ApiResponse<SupplierVerification>
  > {
    return apiRequest("get", "/roles/supplier-verification-status");
  },

  /**
   * Update buyer profile
   */
  async updateBuyerProfile(
    profile: BuyerProfile
  ): Promise<ApiResponse<{ buyerProfile: BuyerProfile }>> {
    return apiRequest("put", "/roles/buyer-profile", profile);
  },

  /**
   * Update supplier profile
   */
  async updateSupplierProfile(
    profile: Partial<SupplierProfile>
  ): Promise<ApiResponse<{ supplierProfile: SupplierProfile }>> {
    return apiRequest("put", "/roles/supplier-profile", profile);
  },
};
