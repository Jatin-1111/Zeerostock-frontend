"use client";

import { useState } from "react";
import {
  Menu,
  Search,
  Globe,
  Moon,
  User,
  Package,
  CheckCircle,
  Lock,
  Clock,
  Truck,
  Home as HomeIcon,
} from "lucide-react";
import Link from "next/link";

export default function OrderDetailsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const orderItems = [
    {
      name: "Industrial Grade Steel Coils",
      supplier: "MetalCorp USA",
      qty: 100,
      price: 800.0,
      total: 80000,
      estDate: "2024-01-16",
      trackingId: "1Z998AA12123-213380",
    },
    {
      name: "Microcontrollers Bulk Lots",
      supplier: "SS Electronics Ldt.",
      qty: 100,
      price: 800.0,
      total: 80000,
      estDate: "2024-01-16",
      trackingId: "70931B3g12123-213H02",
    },
  ];

  const orderStatusSteps = [
    {
      title: "Order Placed",
      description: "Your order has been confirmed",
      timestamp: "2024-01-15 10:30 AM",
      icon: CheckCircle,
      completed: true,
    },
    {
      title: "Payment Secured",
      description: "Escrow payment secured successfully",
      timestamp: "2024-01-15 11:45 AM",
      icon: Lock,
      completed: true,
    },
    {
      title: "Processing",
      description: "Suppliers preparing your items",
      timestamp: "2024-01-16 Expected",
      icon: Clock,
      completed: false,
      current: true,
    },
    {
      title: "Shipped",
      description: "Items shipped from suppliers",
      timestamp: "2024-01-16 Expected",
      icon: Truck,
      completed: false,
    },
    {
      title: "Delivered",
      description: "Estimated delivery date",
      timestamp: "2024-01-20 Expected",
      icon: HomeIcon,
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-600 flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-black">Zeerostock</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium text-gray-700 hover:text-black"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium text-gray-700 hover:text-black"
                >
                  About Us
                </Link>
                <Link
                  href="/buyer"
                  className="text-sm font-medium text-gray-700 hover:text-black"
                >
                  Buyer
                </Link>
                <Link
                  href="/suppliers"
                  className="text-sm font-medium text-gray-700 hover:text-black"
                >
                  Suppliers
                </Link>
                <Link
                  href="/roi"
                  className="text-sm font-medium text-gray-700 hover:text-black"
                >
                  ROI
                </Link>
              </nav>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search listings of Suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Globe className="w-5 h-5 text-gray-700" />
                <span className="ml-1 text-xs font-medium text-gray-700">
                  EN
                </span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Moon className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <button className="p-2 hover:bg-gray-100 rounded">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/orders" className="text-gray-500 hover:text-black">
              My Orders
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Order ID: ORD-001</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-black">Orders details</h1>
          <p className="text-sm text-gray-500">Last Updated: Just now</p>
        </div>

        {/* Order Summary Card */}
        <div className="border border-gray-300 p-6 mb-6">
          <div className="grid grid-cols-[1fr,auto] gap-6">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">
                  ORDER ID
                </label>
                <p className="text-base font-medium text-black">ORD-001</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">
                  AMOUNT
                </label>
                <p className="text-base font-medium text-black">₹160,000.00</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">
                  ORDER DATE
                </label>
                <p className="text-base font-medium text-black">Jan 10, 2026</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">
                  EXPECTED DELIVERY
                </label>
                <p className="text-base font-medium text-black">Jan 20, 2026</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="px-6 py-2 border border-gray-300 text-sm font-medium text-black hover:bg-gray-50 whitespace-nowrap">
                Contact Us
              </button>
              <button className="px-6 py-2 border border-gray-300 text-sm font-medium text-black hover:bg-gray-50 whitespace-nowrap">
                Raise Complaint
              </button>
              <button className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-900 whitespace-nowrap">
                Invoice
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">
                Status
              </label>
              <p className="text-base font-medium text-black">Shipped</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">
                PAYMENT
              </label>
              <p className="text-base font-medium text-black">Paid</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">
                DELIVERY METHOD
              </label>
              <p className="text-base font-medium text-black">
                Standard Delivery
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="border border-gray-300 p-6 mb-6">
          <h2 className="text-lg font-semibold text-black mb-4">
            Order Items:
          </h2>
          <div className="space-y-4">
            {orderItems.map((item, index) => (
              <div key={index} className="border border-gray-200 p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 border border-gray-300 flex items-center justify-center flex-shrink-0 bg-gray-50">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-base font-semibold text-black mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          by {item.supplier}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Qty: {item.qty} / Price: ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-black">
                          ₹{item.total.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Est. Date: {item.estDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <p className="text-xs text-gray-600">
                        Tracking ID:{" "}
                        <span className="font-medium text-black">
                          {item.trackingId}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status */}
        <div className="border border-gray-300 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-black">Order Status</h2>
            <span className="px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Processing
            </span>
          </div>

          <div className="space-y-6">
            {orderStatusSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-black text-white"
                          : step.current
                          ? "bg-gray-400 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {index < orderStatusSteps.length - 1 && (
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-semibold text-black mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {step.description}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">{step.timestamp}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
