"use client";

import BuyerSidebar from "@/components/shared/BuyerSidebar";
import RoleGuard from "@/components/guards/RoleGuard";

export default function BuyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGuard allowedRole="buyer">
      <div className="flex min-h-screen">
        <BuyerSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </RoleGuard>
  );
}
