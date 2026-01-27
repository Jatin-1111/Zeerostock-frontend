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

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      // Allow access to public admin pages without auth check
      const publicPaths = [
        "/admin-panel/login",
        "/admin-panel/change-password",
      ];
      if (publicPaths.includes(pathname || "")) {
        setLoading(false);
        return;
      }

      const isAuthenticated = await checkAuth();

      if (
        !isAuthenticated &&
        pathname?.startsWith("/admin-panel") &&
        !publicPaths.includes(pathname)
      ) {
        router.push("/admin-panel/login");
      }

      setLoading(false);
    };

    initAuth();
  }, [pathname]);

  const value = {
    admin,
    isAuthenticated: !!admin,
    loading,
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
