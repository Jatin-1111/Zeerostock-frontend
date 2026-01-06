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
        // Optionally fetch fresh user data
        await refreshUser();
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
    try {
      const response = await authService.login(data);

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

      toast.error(response.message || "Login failed");
      return false;
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
      return false;
    }
  }, []);

  // Signup
  const signup = useCallback(
    async (
      data: SignupFormData
    ): Promise<{ success: boolean; identifier?: string }> => {
      try {
        const response = await authService.signup(data);

        if (response.success) {
          toast.success("Verification code sent to your email");
          return {
            success: true,
            identifier: data.businessEmail || data.mobile,
          };
        }

        toast.error(response.message || "Signup failed");
        return { success: false };
      } catch (error: unknown) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Signup failed. Please try again."
        );
        return { success: false };
      }
    },
    []
  );

  // Verify OTP
  const verifyOTP = useCallback(
    async (data: OTPVerifyData): Promise<boolean> => {
      try {
        const response = await authService.verifyOTP(data);

        if (response.success && response.data) {
          setUser(response.data.user);
          toast.success("Your account has been verified successfully");
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
