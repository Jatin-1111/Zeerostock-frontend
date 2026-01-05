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
      thumbnail: "/placeholder-video.jpg",
    },
    {
      title: "How to create an RFQ (Buyer Tutorial)",
      description: "Shows posting RFQs and reviewing quotes.",
      duration: "6:45 mins",
      thumbnail: "/placeholder-video.jpg",
    },
    {
      title: "Using the ROI Calculator",
      description:
        "Learn how to calculate your potential return on investment.",
      duration: "4:30 mins",
      thumbnail: "/placeholder-video.jpg",
    },
    {
      title: "Responding to Quotes (Supplier Guide)",
      description: "Includes Accept/Decline/Counter-Offer options.",
      duration: "5:15 mins",
      thumbnail: "/placeholder-video.jpg",
    },
    {
      title: "Managing Orders & Shipments",
      description: "Learn to manage your sales orders and track shipments.",
      duration: "4:30 mins",
      thumbnail: "/placeholder-video.jpg",
    },
    {
      title: "How to Verify Your Supplier Account",
      description:
        "A step-by-step guide to completing your supplier verification.",
      duration: "6:45 mins",
      thumbnail: "/placeholder-video.jpg",
    },
  ];

  // Filter videos based on search query
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;

    const query = searchQuery.toLowerCase();
    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Slide-in Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-[696.9375px] max-w-[90vw] overflow-y-auto bg-white shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-[16.875px] top-[16.875px] z-10 flex h-[25.3125px] w-[25.3125px] items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100"
            >
              <X className="h-[13.5px] w-[13.5px] text-[#0d1b2a]" />
            </button>

            {/* Content */}
            <div className="p-[22.5px]">
              {/* Header */}
              <h1 className="mb-[5.625px] text-[21.375px] font-semibold leading-none text-[#0d1b2a]">
                Video Tutorial Library
              </h1>

              <p className="mb-[16.875px] text-[13.5px] font-medium leading-normal text-[#9c9c9c]">
                Step-by-step videos to help you maximize your Zeerostock
                experience
              </p>

              {/* Search Bar */}
              <div className="mb-[22.5px] flex h-[36.5625px] items-center justify-between rounded-[11.25px] bg-[rgba(235,235,235,0.65)] px-[14.0625px] shadow-[0px_0px_1.6875px_0px_rgba(0,0,0,0.4)]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tutorial videos.."
                  className="flex-1 bg-transparent text-[10.6875px] font-medium text-[#374151] outline-none placeholder:text-[#374151] placeholder:opacity-80"
                />
                <div className="flex items-center gap-[5.625px]">
                  <div className="h-[25.3125px] w-[1.125px] bg-gray-300"></div>
                  <Search className="h-[13.5px] w-[13.5px] text-[#374151] opacity-80" />
                  <p className="w-[47.25px] text-center text-[13.5px] font-medium text-[#374151] opacity-80">
                    Search
                  </p>
                </div>
              </div>

              {/* Video Grid */}
              {filteredVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-[60px]">
                  <p className="text-[13.5px] font-medium text-[#9c9c9c]">
                    No videos found matching your search.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-[23.0625px]">
                  {filteredVideos.map((video, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-[246.375px] w-[210.9375px] flex-col overflow-hidden rounded-[11.25px] bg-[#f8f8f8] shadow-[0px_0px_2.25px_0px_rgba(0,0,0,0.35)]"
                    >
                      {/* Video Thumbnail */}
                      <div className="relative h-[110.8125px] w-full overflow-hidden bg-gray-300">
                        {/* Play Button Overlay */}
                        <div className="absolute left-1/2 top-1/2 flex h-[40.76325px] w-[39.96338px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                          <PlayCircle className="h-full w-full text-white drop-shadow-lg" />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="flex flex-1 flex-col p-[11.25px]">
                        {/* Title */}
                        <h3 className="mb-[11.25px] text-[12.9375px] font-semibold leading-[17.4375px] text-[#0d1b2a]">
                          {video.title}
                        </h3>

                        {/* Description */}
                        <p className="mb-[13.5px] flex-1 text-[10.125px] font-medium leading-[11.25px] text-[#9c9c9c]">
                          {video.description}
                        </p>

                        {/* Duration Badge */}
                        <div className="mb-[6.75px] flex h-[19.125px] w-[54.5625px] items-center justify-center rounded-[16.875px] bg-[#e2dfdf]">
                          <p className="text-[8.4375px] font-medium leading-[11.25px] text-[#818080]">
                            {video.duration}
                          </p>
                        </div>

                        {/* Watch Video Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex h-[28.125px] w-[101.25px] items-center justify-center self-end rounded-[5.625px] bg-[#1e3a8a] transition-colors hover:bg-[#1e3a8a]/90"
                        >
                          <p className="text-[10.125px] font-medium leading-[12.375px] text-white">
                            Watch Video
                          </p>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
