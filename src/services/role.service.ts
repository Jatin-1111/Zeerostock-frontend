import { apiRequest } from "@/lib/api-client";
import {
  BuyerProfile,
  SupplierProfile,
  SupplierVerificationRequest,
  SupplierVerification,
  ApiResponse,
} from "@/types/api.types";

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
  ): Promise<ApiResponse<{ activeRole: string }>> {
    const response = await apiRequest<{ activeRole: string }>(
      "post",
      "/roles/switch-role",
      { role }
    );

    // Update stored user data with new active role
    if (response.success && typeof window !== "undefined") {
      const userData = localStorage.getItem(USER_DATA_KEY);
      if (userData) {
        const user = JSON.parse(userData);
        user.activeRole = role;
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
      }
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
