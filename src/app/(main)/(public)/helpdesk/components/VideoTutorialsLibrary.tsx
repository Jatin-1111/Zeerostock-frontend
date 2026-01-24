"use client";

import { useState, useMemo } from "react";
import { X, Search, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface VideoTutorialsLibraryProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VideoCard {
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
}

export default function VideoTutorialsLibrary({
  isOpen,
  onClose,
}: VideoTutorialsLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const videos: VideoCard[] = [
    {
      title: "Getting Started with Zeerostock",
      description: "Covers sign-up, account setup and navigation.",
      duration: "4:30 mins",
      thumbnail:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/placeholder-product.svg",
    },
    {
      title: "How to create an RFQ (Buyer Tutorial)",
      description: "Shows posting RFQs and reviewing quotes.",
      duration: "6:45 mins",
      thumbnail:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/placeholder-product.svg",
    },
    {
      title: "Using the ROI Calculator",
      description:
        "Learn how to calculate your potential return on investment.",
      duration: "4:30 mins",
      thumbnail:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/placeholder-product.svg",
    },
    {
      title: "Responding to Quotes (Supplier Guide)",
      description: "Includes Accept/Decline/Counter-Offer options.",
      duration: "5:15 mins",
      thumbnail:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/placeholder-product.svg",
    },
    {
      title: "Managing Orders & Shipments",
      description: "Learn to manage your sales orders and track shipments.",
      duration: "4:30 mins",
      thumbnail:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/placeholder-product.svg",
    },
    {
      title: "How to Verify Your Supplier Account",
      description:
        "A step-by-step guide to completing your supplier verification.",
      duration: "6:45 mins",
      thumbnail:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/placeholder-product.svg",
    },
  ];

  // Filter videos based on search query
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;

    const query = searchQuery.toLowerCase();
    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="mt-[16px] overflow-hidden"
        >
          <div className="rounded-[10px] bg-white p-[15px]">
            {/* Header */}
            <div className="mb-[15px] flex items-center justify-between px-5 py-3">
              <div>
                <h1 className="mb-[4px] text-[14px] font-semibold leading-none text-[#0d1b2a]">
                  Video Tutorial Library
                </h1>
                <p className="text-[9px] font-medium leading-normal text-[#9c9c9c]">
                  Step-by-step videos to help you maximize your Zeerostock
                  experience
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              >
                <X className="h-[12px] w-[12px] text-[#0d1b2a]" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-5">
              <div className="mb-[15px] flex h-[24px] items-center justify-between rounded-[8px] bg-[rgba(235,235,235,0.65)] px-[9px] shadow-[0px_0px_1.6875px_0px_rgba(0,0,0,0.4)]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tutorial videos.."
                  className="flex-1 bg-transparent text-[7px] font-medium text-[#374151] outline-none placeholder:text-[#374151] placeholder:opacity-80"
                />
                <div className="flex items-center gap-[4px]">
                  <div className="h-[17px] w-[1px] bg-gray-300"></div>
                  <Search className="h-[9px] w-[9px] text-[#374151] opacity-80" />
                  <p className="w-[32px] text-center text-[9px] font-medium text-[#374151] opacity-80">
                    Search
                  </p>
                </div>
              </div>
            </div>

            {/* Video Grid */}
            <div className="max-h-[500px] overflow-y-auto px-5 py-3">
              {filteredVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-[40px]">
                  <p className="text-[9px] font-medium text-[#9c9c9c]">
                    No videos found matching your search.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-[15px]">
                  {filteredVideos.map((video, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col overflow-hidden rounded-[8px] bg-[#f8f8f8] shadow-[0px_0px_2.25px_0px_rgba(0,0,0,0.35)]"
                    >
                      {/* Video Thumbnail */}
                      <div className="relative h-[125px] w-full overflow-hidden bg-gray-300">
                        {/* Play Button Overlay */}
                        <div className="absolute left-1/2 top-1/2 flex h-[27px] w-[27px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                          <PlayCircle className="h-full w-full text-white drop-shadow-lg" />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="flex flex-1 flex-col p-[8px]">
                        {/* Title */}
                        <h3 className="mb-[8px] text-[9px] font-semibold leading-[12px] text-[#0d1b2a]">
                          {video.title}
                        </h3>

                        {/* Description */}
                        <p className="mb-[9px] flex-1 text-[7px] font-medium leading-[8px] text-[#9c9c9c]">
                          {video.description}
                        </p>

                        {/* Duration Badge */}
                        <div className="mb-[5px] flex h-[13px] w-[36px] items-center justify-center rounded-[11px] bg-[#e2dfdf]">
                          <p className="text-[6px] font-medium leading-[8px] text-[#818080]">
                            {video.duration}
                          </p>
                        </div>

                        {/* Watch Video Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex h-[19px] w-[68px] items-center justify-center self-end rounded-[4px] bg-[#1e3a8a] transition-colors hover:bg-[#1e3a8a]/90"
                        >
                          <p className="text-[7px] font-medium leading-[8px] text-white">
                            Watch Video
                          </p>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
