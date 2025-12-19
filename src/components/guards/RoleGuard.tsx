"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRole: "buyer" | "supplier" | "admin";
  redirectTo?: string;
}

export default function RoleGuard({
  children,
  allowedRole,
  redirectTo,
}: RoleGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated || !user) {
      toast.error("Please login to access this page");
      router.push("/login");
      return;
    }

    if (user.activeRole !== allowedRole) {
      toast.error(
        `This page is only accessible for ${allowedRole}s. Please logout and login with a ${allowedRole} account.`
      );

      // Redirect based on user's current role
      const redirectPath = redirectTo || `/${user.activeRole}/dashboard`;
      router.push(redirectPath);
    }
  }, [isAuthenticated, user, loading, allowedRole, router, redirectTo]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing if not authenticated or wrong role (will redirect)
  if (!isAuthenticated || !user || user.activeRole !== allowedRole) {
    return null;
  }

  return <>{children}</>;
}
