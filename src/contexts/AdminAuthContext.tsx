"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminUser {
  adminId: string;
  email: string;
  role: string;
  name?: string;
  isSuperAdmin?: boolean;
  roles?: string[];
  firstName?: string;
  lastName?: string;
  id?: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (accessToken: string, refreshToken: string, user: AdminUser) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined,
);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false); // Track if we've done initial auth check
  const router = useRouter();
  const pathname = usePathname();

  const login = (
    accessToken: string,
    refreshToken: string,
    user: AdminUser,
  ) => {
    localStorage.setItem("admin_token", accessToken);
    localStorage.setItem("admin_refresh_token", refreshToken);
    localStorage.setItem("admin_user", JSON.stringify(user));
    setAdmin(user);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_refresh_token");
    localStorage.removeItem("admin_user");
    setAdmin(null);
    router.push("/admin-panel/login");
  };

  const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      return false;
    }

    try {
      // SECURITY: Fetch admin info from backend (source of truth) instead of trusting localStorage
      // This prevents users from editing localStorage to gain unauthorized access
      // The backend validates the JWT token and returns the actual permissions from the database
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        // Token is invalid or expired, clear storage
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_refresh_token");
        localStorage.removeItem("admin_user");
        setAdmin(null);
        return false;
      }

      const data = await response.json();

      if (data.success && data.data) {
        const user: AdminUser = {
          id: data.data.id,
          adminId: data.data.adminId,
          email: data.data.email,
          role: data.data.role,
          name: data.data.name,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          isSuperAdmin: data.data.isSuperAdmin,
          roles: data.data.roles,
        };

        // Update localStorage with fresh data from backend
        localStorage.setItem("admin_user", JSON.stringify(user));
        setAdmin(user);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Auth check failed:", error);
      // On error, clear storage and logout
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_refresh_token");
      localStorage.removeItem("admin_user");
      setAdmin(null);
      return false;
    }
  };

  // Initial auth check - runs only ONCE on app mount
  useEffect(() => {
    const initAuth = async () => {
      // Try to load cached user first
      const cachedUser = localStorage.getItem("admin_user");
      if (cachedUser) {
        try {
          setAdmin(JSON.parse(cachedUser));
        } catch (e) {
          console.error("Failed to parse cached user");
        }
      }

      // Verify token is still valid (quick check, no page blocking)
      const token = localStorage.getItem("admin_token");
      if (token) {
        // Verify in background without blocking UI
        checkAuth().catch(console.error);
      }

      setLoading(false);
      setAuthInitialized(true);
    };

    if (!authInitialized) {
      initAuth();
    }
  }, []);

  // Handle navigation with cached auth state
  useEffect(() => {
    if (!authInitialized) return;

    const publicPaths = ["/admin-panel/login", "/admin-panel/change-password"];

    // Redirect to login if not authenticated and trying to access protected page
    if (
      !admin &&
      pathname?.startsWith("/admin-panel") &&
      !publicPaths.includes(pathname)
    ) {
      router.push("/admin-panel/login");
    }
  }, [pathname, authInitialized, admin]);

  const value = {
    admin,
    isAuthenticated: !!admin,
    loading: !authInitialized, // Only show loading during initial mount
    login,
    logout,
    checkAuth,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
