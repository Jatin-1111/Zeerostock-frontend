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
  const isLoginPage = pathname === "/admin-panel/login";

  return (
    <AdminAuthProvider>
      {isLoginPage ? (
        children
      ) : (
        <AdminProtectedRoute>{children}</AdminProtectedRoute>
      )}
    </AdminAuthProvider>
  );
}
