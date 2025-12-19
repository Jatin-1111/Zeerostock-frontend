"use client";

import BuyerSidebar from "@/components/shared/BuyerSidebar";
import RoleGuard from "@/components/guards/RoleGuard";

export const dynamic = "force-dynamic";

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
