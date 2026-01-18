"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CategorySection() {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to marketplace with category filter
    router.push(`/marketplace?category=${encodeURIComponent(categoryName)}`);
  };

  const handleImageError = (categoryName: string) => {
    setImageErrors((prev) => new Set(prev).add(categoryName));
  };

  // Presigned URLs (expire in 7 days - regenerate if needed)
  const categories = [
    {
      name: "Electronics",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Electronics.png",
    },
    {
      name: "Industrial",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Industrial.png",
    },
    {
      name: "Construction",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Construction.png",
    },
    {
      name: "Agriculture",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Agriculture.png",
    },
    {
      name: "Cosmetics",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Cosmetics.png",
    },
    {
      name: "Appliances",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Appliances.png",
    },
    {
      name: "Hand Tools",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Hand Tools.png",
    },
    {
      name: "Decor",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Decor.png",
    },
    {
      name: "Cleaning items",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Cleaning items.png",
    },
    {
      name: "Fasteners",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Fasteners.png",
    },
    {
      name: "Plumbing Materials",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Plumbing Materials.png",
    },
    {
      name: "Electricals",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Electricals.png",
    },
    {
      name: "Power Tools",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Power Tools.png",
    },
    {
      name: "PPE",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/PPE.png",
    },
    {
      name: "Abrasives",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Abrasives.png",
    },
    {
      name: "Chisels & Drill bits",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Chisels & Drill bits.png",
    },
    {
      name: "Food Containers",
      iconUrl:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Category Icons/Food Containers.png",
    },
  ];

  const displayedCategories = showAll ? categories : categories.slice(0, 6);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1, // Reverse order for exit
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -15,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.25,
      },
    },
  };

  return (
    <motion.div
      className="max-w-[900px] mx-auto py-9 px-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-[21px] text-[#1a1a1a] m-0">
          Shop by Category
        </h2>
        <motion.button
          onClick={() => setShowAll(!showAll)}
          className="font-medium text-[12px] text-gray-600 bg-transparent border-none cursor-pointer hover:text-[#2D4A9A] transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showAll ? "Show less" : "View all categories"}
        </motion.button>
      </div>

      <motion.div
        className="grid grid-cols-6 gap-3 overflow-hidden py-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        transition={{
          layout: {
            type: "spring",
            stiffness: 300,
            damping: 30,
          },
        }}
      >
        <AnimatePresence mode="popLayout">
          {displayedCategories.map((category, index) => {
            const hasError = imageErrors.has(category.name);

            return (
              <motion.button
                key={category.name}
                layout
                variants={itemVariants}
                onClick={() => handleCategoryClick(category.name)}
                className="bg-white rounded-xl shadow-md p-[18px] flex flex-col items-center gap-3 border-none cursor-pointer relative overflow-hidden"
                whileHover={{
                  y: -4,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="w-12 h-12 relative flex items-center justify-center text-gray-700"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {!hasError && category.iconUrl ? (
                    <Image
                      src={category.iconUrl}
                      alt={category.name}
                      width={48}
                      height={48}
                      className="object-contain"
                      onError={() => handleImageError(category.name)}
                      priority={index < 6}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl text-gray-400">📦</span>
                    </div>
                  )}
                </motion.div>
                <span className="font-medium text-[10.5px] text-[#1a1a1a] text-center leading-tight">
                  {category.name}
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
