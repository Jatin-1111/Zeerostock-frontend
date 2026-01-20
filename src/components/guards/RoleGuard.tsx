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
    // This prevents false positives from stale data (e.g., after role switch)
    // If role doesn't match, refresh user data from backend before blocking
    if (user.activeRole !== allowedRole && !isVerifyingRef.current) {
      isVerifyingRef.current = true;

      refreshUser()
        .then(() => {
          isVerifyingRef.current = false;
        })
        .catch(() => {
          toast.error("Failed to verify access. Please login again.");
          router.push("/login");
          isVerifyingRef.current = false;
        });
      return;
    }

    // Safety check: Ensure user actually HAS the role they are trying to access
    // This handles the "Black Screen" case where activeRole=supplier but roles=['buyer']
    const userRoles = user.roles || [];
    if (!userRoles.includes(allowedRole) && !isVerifyingRef.current) {
      if (allowedRole === "supplier") {
        toast.error(
          "Access Restricted: Please complete verification (KYC) to get the supplier role."
        );
        router.push("/buyer/dashboard");
      } else {
        toast.error(`You do not have access to the ${allowedRole} area.`);
        router.push(userRoles.includes("buyer") ? "/buyer/dashboard" : "/");
      }
      return; // Stop execution
    }

    // Handle Active Role Mismatch (User has role, but in wrong mode)
    if (user.activeRole !== allowedRole && !isVerifyingRef.current) {
      // If user has the required role but it's not active, suggest switching
      if (userRoles.includes(allowedRole)) {
        toast.error(
          `This page requires ${allowedRole} mode. Please switch to ${allowedRole} mode from settings.`
        );
      }

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
  // Also check if user lacks the capability entirely
  if (
    !isAuthenticated ||
    !user ||
    user.activeRole !== allowedRole ||
    !user.roles?.includes(allowedRole)
  ) {
    return null;
  }

  return <>{children}</>;
}
