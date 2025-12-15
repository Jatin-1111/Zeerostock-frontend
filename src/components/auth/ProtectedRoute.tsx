"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "buyer" | "supplier" | "admin";
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not authenticated - redirect to login
      if (!isAuthenticated) {
        router.push(`${redirectTo}?redirect=${window.location.pathname}`);
        return;
      }

      // Check role if specified
      if (requiredRole && user) {
        const hasRole = user.roles.includes(requiredRole);
        const isActiveRole = user.activeRole === requiredRole;

        if (!hasRole) {
          router.push("/unauthorized");
          return;
        }

        // Optionally switch to required role if user has it but it's not active
        if (!isActiveRole && hasRole) {
          // You could auto-switch or redirect to role selection
          console.log("User has role but not active, consider switching");
        }
      }
    }
  }, [loading, isAuthenticated, user, requiredRole, router, redirectTo]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated but wrong role
  if (requiredRole && user && !user.roles.includes(requiredRole)) {
    return null;
  }

  // All checks passed - render children
  return <>{children}</>;
}
