"use client";

import RoleGuard from "@/components/guards/RoleGuard";

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="supplier">
      <div className="flex-1 bg-[#EEFBF6]">{children}</div>
    </RoleGuard>
  );
}
