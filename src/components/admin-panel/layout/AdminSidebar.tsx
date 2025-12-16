"use client";

import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  CreditCard,
  Package,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin-panel/dashboard",
  },
  { icon: Users, label: "User Management", href: "/admin-panel/users" },
  {
    icon: ShieldCheck,
    label: "Supplier Verification",
    href: "/admin-panel/verification",
  },
  { icon: CreditCard, label: "Payments", href: "/admin-panel/payments" },
  { icon: Package, label: "Orders & Logistics", href: "/admin-panel/orders" },
  {
    icon: BarChart3,
    label: "Reports & Analytics",
    href: "/admin-panel/reports",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname?.startsWith(href);
  };

  return (
    <aside className="w-[250px] bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-[20px] font-bold text-black">Zeerostock</h1>
        <p className="text-[12px] text-gray-400">Admin Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-5 text-[14px] transition-colors ${
                active
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-gray-200">
        <Link
          href="/admin-panel/settings"
          className="flex items-center gap-3 px-4 py-3 text-[14px] text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
        <Link
          href="/admin-panel/login"
          className="flex items-center gap-3 px-4 py-3 text-[14px] text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </Link>
      </div>
    </aside>
  );
}
