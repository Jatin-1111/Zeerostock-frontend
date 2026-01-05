"use client";

import AdminSidebar from "./AdminSidebar";
import AdminTopBar from "./AdminTopBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <AdminTopBar />
        <div>{children}</div>
      </main>
    </div>
  );
}
