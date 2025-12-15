import { apiRequest } from "@/lib/api-client";
import {
  SignupFormData,
  LoginFormData,
  OTPVerifyData,
  ResetPasswordData,
  UpdateProfileData,
  LoginResponse,
  OTPVerificationResponse,
  User,
  ApiResponse,
} from "@/types/api.types";

const TOKEN_KEY =
  process.env.NEXT_PUBLIC_JWT_TOKEN_KEY || "zeerostock_access_token";
const REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "zeerostock_refresh_token";
const USER_DATA_KEY =
  process.env.NEXT_PUBLIC_USER_DATA_KEY || "zeerostock_user";

export const authService = {
  /**
   * Sign up a new user
   */
  async signup(data: SignupFormData): Promise<ApiResponse<{ userId: string }>> {
    return apiRequest("post", "/auth/signup", data);
  },

  /**
   * Verify OTP after signup
   */
  async verifyOTP(
    data: OTPVerifyData
  ): Promise<ApiResponse<OTPVerificationResponse>> {
    const response = await apiRequest<OTPVerificationResponse>(
      "post",
      "/auth/verify-otp",
      data
    );

    if (response.success && response.data) {
      // Backend sends accessToken and refreshToken directly
      const { accessToken, refreshToken, user } = response.data;

      // Store tokens and user data
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    }

    return response;
  },

  /**
   * Resend OTP
   */
  async resendOTP(identifier: string): Promise<ApiResponse<void>> {
    return apiRequest("post", "/auth/resend-otp", { identifier });
  },

  /**
   * Login with email/phone + password
   */
  async login(data: LoginFormData): Promise<ApiResponse<LoginResponse>> {
    const response = await apiRequest<LoginResponse>(
      "post",
      "/auth/login",
      data
    );

    if (response.success && response.data) {
      const { accessToken, refreshToken, user } = response.data;

      // Store tokens and user data
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    }

    return response;
  },

  /**
   * Send OTP for login
   */
  async sendLoginOTP(mobile: string): Promise<ApiResponse<void>> {
    return apiRequest("post", "/auth/otp-login", { mobile });
  },

  /**
   * Verify login OTP
   */
  async verifyLoginOTP(
    data: OTPVerifyData
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await apiRequest<LoginResponse>(
      "post",
      "/auth/verify-login-otp",
      data
    );

    if (response.success && response.data) {
      const { accessToken, refreshToken, user } = response.data;

      // Store tokens and user data
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    }

    return response;
  },

  /**
   * Logout current session
   */
  async logout(): Promise<ApiResponse<void>> {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        await apiRequest("post", "/auth/logout", { refreshToken });
      }
    } finally {
      // Clear storage regardless of API response
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
    }

    return { success: true, message: "Logged out successfully" };
  },

  /**
   * Logout from all devices
   */
  async logoutAll(): Promise<ApiResponse<void>> {
    try {
      await apiRequest("post", "/auth/logout-all");
    } finally {
      // Clear storage
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
    }

    return { success: true, message: "Logged out from all devices" };
  },

  /**
   * Forgot password - Send reset link
   */
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiRequest("post", "/auth/forgot-password", { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordData): Promise<ApiResponse<void>> {
    return apiRequest("post", "/auth/reset-password", data);
  },

  /**
   * Change password (when logged in)
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    return apiRequest("post", "/auth/change-password", {
      currentPassword,
      newPassword,
    });
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await apiRequest<User>("get", "/auth/me");

    if (response.success && response.data) {
      // Update stored user data
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
    }

    return response;
  },

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileData): Promise<ApiResponse<User>> {
    const response = await apiRequest<User>("put", "/auth/me", data);

    if (response.success && response.data) {
      // Update stored user data
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
    }

    return response;
  },

  /**
   * Add/Update GST number
   */
  async addGST(gstNumber: string): Promise<ApiResponse<User>> {
    const response = await apiRequest<User>("put", "/auth/add-gst", {
      gstNumber,
    });

    if (response.success && response.data) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
    }

    return response;
  },

  /**
   * Set initial role (buyer or supplier)
   */
  async setRole(role: "buyer" | "supplier"): Promise<ApiResponse<User>> {
    const response = await apiRequest<User>("put", "/auth/set-role", { role });

    if (response.success && response.data) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
    }

    return response;
  },

  /**
   * Deactivate account
   */
  async deactivateAccount(): Promise<ApiResponse<void>> {
    const response = await apiRequest<void>("delete", "/auth/me");

    if (response.success) {
      // Clear storage after deactivation
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
    }

    return response;
  },

  /**
   * Get stored user data (from localStorage)
   */
  getStoredUser(): User | null {
    if (typeof window === "undefined") return null;

    const userData = localStorage.getItem(USER_DATA_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
};
