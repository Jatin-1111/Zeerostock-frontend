"use client";

import SupplierSidebar from "@/components/shared/SupplierSidebar";
import RoleGuard from "@/components/guards/RoleGuard";

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="supplier">
      <div className="flex min-h-screen bg-white">
        <SupplierSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </RoleGuard>
  );
}
