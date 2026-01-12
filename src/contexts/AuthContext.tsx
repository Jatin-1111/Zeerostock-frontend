"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { cartService } from "@/services/cart.service";
import {
  User,
  LoginFormData,
  SignupFormData,
  OTPVerifyData,
} from "@/types/api.types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginFormData) => Promise<boolean>;
  signup: (
    data: SignupFormData
  ) => Promise<{ success: boolean; identifier?: string }>;
  verifyOTP: (data: OTPVerifyData) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  loginWithOTP: (mobile: string) => Promise<boolean>;
  verifyLoginOTP: (data: OTPVerifyData) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Refresh user data from server
  const refreshUser = useCallback(async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
        return;
      }
      setUser(null);
    } catch {
      console.log("Failed to refresh user data");
      setUser(null);
    }
  }, []);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = authService.getStoredUser();
      const isAuth = authService.isAuthenticated();

      if (storedUser && isAuth) {
        setUser(storedUser);
        // Always fetch fresh user data from server to ensure role is up-to-date
        // This prevents stale activeRole after token expiration/refresh
        try {
          await refreshUser();
        } catch (error) {
          console.error("Failed to refresh user on init:", error);
          // If refresh fails and we have stored data, keep it
          // The api-client interceptor will handle token refresh on next API call
        }
      }

      setLoading(false);
    };

    initAuth();
  }, [refreshUser]);

  // Listen for user data updates from backend (e.g., after token refresh)
  useEffect(() => {
    const handleUserDataRefresh = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        // Update user state with fresh backend data
        setUser(customEvent.detail);
      }
    };

    // Listen for custom userDataRefreshed events
    window.addEventListener("userDataRefreshed", handleUserDataRefresh);

    return () => {
      window.removeEventListener("userDataRefreshed", handleUserDataRefresh);
    };
  }, []);

  // Login with email/phone + password
  const login = useCallback(async (data: LoginFormData): Promise<boolean> => {
    console.log("🔐 AuthContext: Starting login for", data.identifier);
    try {
      const response = await authService.login(data);
      console.log("📥 AuthContext: Login response:", {
        success: response.success,
        hasData: !!response.data,
        message: response.message,
      });

      if (response.success && response.data) {
        setUser(response.data.user);
        console.log(
          "✅ AuthContext: User set successfully",
          response.data.user.email
        );
        toast.success("Welcome back! Login successful");

        // Merge guest cart if exists
        try {
          await cartService.mergeCart();
        } catch (cartError) {
          console.log(
            "ℹ️ No guest cart to merge or cart merge failed:",
            cartError
          );
        }

        return true;
      }

      const errorMsg = response.message || "Login failed";
      console.error("❌ AuthContext: Login failed:", errorMsg, response);
      toast.error(errorMsg);
      return false;
    } catch (error: unknown) {
      console.error("❌ AuthContext: Login exception:", error);

      let errorMessage = "Login failed. Please try again.";

      if (error && typeof error === "object") {
        if ("message" in error) {
          errorMessage = error.message as string;
        }
        if ("errorCode" in error) {
          console.error("Error code:", error.errorCode);
        }
      }

      toast.error(errorMessage);
      return false;
    }
  }, []);

  // Signup
  const signup = useCallback(
    async (
      data: SignupFormData
    ): Promise<{ success: boolean; identifier?: string }> => {
      console.log("📝 AuthContext: Starting signup for", data.businessEmail);
      try {
        const response = await authService.signup(data);
        console.log("📥 AuthContext: Signup response:", {
          success: response.success,
          message: response.message,
        });

        if (response.success) {
          console.log("✅ AuthContext: Signup successful, OTP sent");
          toast.success("Verification code sent to your email");
          return {
            success: true,
            identifier: data.businessEmail || data.mobile,
          };
        }

        const errorMsg = response.message || "Signup failed";
        console.error("❌ AuthContext: Signup failed:", errorMsg, response);
        toast.error(errorMsg);
        return { success: false };
      } catch (error: unknown) {
        console.error("❌ AuthContext: Signup exception:", error);

        let errorMessage = "Signup failed. Please try again.";

        if (error && typeof error === "object") {
          if ("message" in error) {
            errorMessage = error.message as string;
          }
          if ("errors" in error && Array.isArray(error.errors)) {
            const validationErrors = (
              error.errors as Array<{ field: string; message: string }>
            )
              .map((e) => e.message)
              .join(", ");
            if (validationErrors) {
              errorMessage = validationErrors;
            }
          }
        }

        toast.error(errorMessage);
        return { success: false };
      }
    },
    []
  );

  // Verify OTP
  const verifyOTP = useCallback(
    async (data: OTPVerifyData): Promise<boolean> => {
      console.log(
        "🔢 AuthContext: Starting OTP verification for",
        data.identifier
      );
      try {
        const response = await authService.verifyOTP(data);
        console.log("📥 AuthContext: OTP verification response:", {
          success: response.success,
          hasData: !!response.data,
        });

        if (response.success && response.data) {
          setUser(response.data.user);
          console.log(
            "✅ AuthContext: OTP verified, user set successfully",
            response.data.user.email
          );
          toast.success("Your account has been verified successfully");
          return true;
        }

        const errorMsg = response.message || "OTP verification failed";
        console.error(
          "❌ AuthContext: OTP verification failed:",
          errorMsg,
          response
        );
        toast.error(errorMsg);
        return false;
      } catch (error: unknown) {
        console.error("❌ AuthContext: OTP verification exception:", error);

        let errorMessage = "OTP verification failed. Please try again.";

        if (error && typeof error === "object" && "message" in error) {
          errorMessage = error.message as string;
        }

        toast.error(errorMessage);
        return false;
      }
    },
    []
  );

  // Login with OTP - Send OTP
  const loginWithOTP = useCallback(async (mobile: string): Promise<boolean> => {
    try {
      const response = await authService.sendLoginOTP(mobile);

      if (response.success) {
        toast.success("Verification code sent to your mobile number");
        return true;
      }

      toast.error(response.message || "Failed to send OTP");
      return false;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send OTP. Please try again.";
      toast.error(message);
      return false;
    }
  }, []);

  // Verify Login OTP
  const verifyLoginOTP = useCallback(
    async (data: OTPVerifyData): Promise<boolean> => {
      try {
        const response = await authService.verifyLoginOTP(data);

        if (response.success && response.data) {
          setUser(response.data.user);
          toast.success("Welcome back! Login successful");

          // Merge guest cart if exists
          try {
            await cartService.mergeCart();
          } catch {
            console.log("No guest cart to merge");
          }

          return true;
        }

        toast.error(response.message || "OTP verification failed");
        return false;
      } catch (error: unknown) {
        toast.error(
          error instanceof Error
            ? error.message
            : "OTP verification failed. Please try again."
        );
        return false;
      }
    },
    []
  );

  // Logout
  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      cartService.clearGuestSession();
      toast.success("You have been logged out successfully");
      router.push("/");
    } catch (error: unknown) {
      console.error("Logout error:", error);
      // Clear state anyway
      setUser(null);
      router.push("/");
    }
  }, [router]);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    verifyOTP,
    logout,
    refreshUser,
    loginWithOTP,
    verifyLoginOTP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
