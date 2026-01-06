"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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
  const { user, isAuthenticated, loading, refreshUser } = useAuth();
  const isVerifyingRef = useRef(false);

  useEffect(() => {
    // Skip if already verifying or still loading
    if (loading || isVerifyingRef.current) return;

    if (!isAuthenticated || !user) {
      toast.error("Please login to access this page");
      router.push("/login");
      return;
    }

    // If role doesn't match, refresh user data from backend before blocking
    // This prevents false positives from stale data
    if (user.activeRole !== allowedRole && !isVerifyingRef.current) {
      isVerifyingRef.current = true;

      refreshUser()
        .catch(() => {
          toast.error("Failed to verify access. Please login again.");
          router.push("/login");
        })
        .finally(() => {
          isVerifyingRef.current = false;
        });
      return;
    }

    // After refresh, if still wrong role, redirect
    if (user.activeRole !== allowedRole && isVerifyingRef.current === false) {
      toast.error(
        `This page is only accessible for ${allowedRole}s. Please logout and login with a ${allowedRole} account.`
      );
      const redirectPath = redirectTo || `/${user.activeRole}/dashboard`;
      router.push(redirectPath);
    }
  }, [
    isAuthenticated,
    user,
    loading,
    allowedRole,
    router,
    redirectTo,
    refreshUser,
  ]);

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
