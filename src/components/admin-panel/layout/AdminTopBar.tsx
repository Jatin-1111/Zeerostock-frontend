"use client";

import { Bell, User } from "lucide-react";

export default function AdminTopBar() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-end items-center gap-4">
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <Bell className="w-5 h-5 text-gray-600" />
      </button>
      <button className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
      </button>
    </header>
  );
}
