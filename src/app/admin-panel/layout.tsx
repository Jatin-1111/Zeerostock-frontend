"use client";

import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import AdminProtectedRoute from "@/components/admin-panel/AdminProtectedRoute";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPage =
    pathname === "/admin-panel/login" ||
    pathname === "/admin-panel/change-password";

  return (
    <AdminAuthProvider>
      {isPublicPage ? (
        children
      ) : (
        <AdminProtectedRoute>{children}</AdminProtectedRoute>
      )}
    </AdminAuthProvider>
  );
}
