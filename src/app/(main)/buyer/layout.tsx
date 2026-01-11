"use client";

import RoleGuard from "@/components/guards/RoleGuard";

export default function BuyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGuard allowedRole="buyer">
      <div className="flex-1 bg-[#EEFBF6]">{children}</div>
    </RoleGuard>
  );
}
