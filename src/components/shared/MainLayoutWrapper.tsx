"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import BuyerSidebar from "@/components/shared/BuyerSidebar";
import SupplierSidebar from "@/components/shared/SupplierSidebar";

interface MainLayoutWrapperProps {
  children: React.ReactNode;
}

export default function MainLayoutWrapper({
  children,
}: MainLayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when path changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine which sidebar to show based on the route
  const isBuyerRoute = pathname.startsWith("/buyer");
  const isSupplierRoute = pathname.startsWith("/supplier");
  const isPublicRoute = !isBuyerRoute && !isSupplierRoute;

  // Routes that should show a sidebar
  const shouldShowSidebar = isPublicRoute || isBuyerRoute || isSupplierRoute;

  return (
    <>
      <Header onSidebarToggle={handleSidebarToggle} />
      <div className="flex h-[calc(100vh-60px)] overflow-hidden">
        {/* Show appropriate sidebar based on route */}
        {shouldShowSidebar && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isSidebarOpen ? 220 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0 overflow-hidden h-full"
          >
            {isPublicRoute && (
              <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
            )}
            {isBuyerRoute && (
              <BuyerSidebar
                isOpen={isSidebarOpen}
                onToggle={setIsSidebarOpen}
              />
            )}
            {isSupplierRoute && (
              <SupplierSidebar
                isOpen={isSidebarOpen}
                onToggle={setIsSidebarOpen}
              />
            )}
          </motion.div>
        )}
        <motion.main
          animate={{
            marginLeft: 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-1 overflow-x-hidden"
        >
          {children}
        </motion.main>
      </div>
    </>
  );
}
