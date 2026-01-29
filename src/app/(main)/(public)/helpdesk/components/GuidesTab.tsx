"use client";

import { useState } from "react";
import { MessageSquare, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import GettingStartedGuide from "./GettingStartedGuide";
import VideoTutorialsLibrary from "./VideoTutorialsLibrary";

export default function GuidesTab() {
  const [showGettingStarted, setShowGettingStarted] = useState(false);
  const [showVideoLibrary, setShowVideoLibrary] = useState(false);

  const handleToggleGettingStarted = () => {
    if (showVideoLibrary) setShowVideoLibrary(false);
    setShowGettingStarted(!showGettingStarted);
  };

  const handleToggleVideoLibrary = () => {
    if (showGettingStarted) setShowGettingStarted(false);
    setShowVideoLibrary(!showVideoLibrary);
  };

  return (
    <div className="w-full px-2 sm:px-3 md:px-4 lg:px-5">
      {/* Title Section */}
      <div className="mb-4 sm:mb-5 md:mb-[16px]">
        <h2 className="mb-1 sm:mb-2 md:mb-[4px] text-base sm:text-lg md:text-[15px] font-semibold leading-none text-[#0d1b2a]">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm md:text-[11px] font-medium leading-none text-[#9c9c9c]">
          Find answers to common questions about using Zeerotock
        </p>
      </div>

      {/* Guide Cards Grid */}
      <div className="flex flex-col sm:flex-col md:flex-row gap-3 sm:gap-4 md:gap-[16px]">
        {/* Getting Started Guide Card */}
        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "0px 8px 16px 0px rgba(24,181,34,0.35)",
          }}
          transition={{ duration: 0.2 }}
          className="flex w-full sm:w-full md:w-[200px] flex-col items-center overflow-hidden rounded-[10px] bg-white p-3 sm:p-4 md:p-[15px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)]"
        >
          {/* Icon */}
          <div className="mb-2 sm:mb-2.5 md:mb-[8px] flex h-6 w-6 sm:h-6 sm:w-6 md:h-[24px] md:w-[24px] items-center justify-center">
            <MessageSquare className="h-6 w-6 sm:h-6 sm:w-6 md:h-[24px] md:w-[24px] stroke-[1.5] text-[#1e3a8a]" />
          </div>

          {/* Title */}
          <h3 className="mb-1 sm:mb-1.5 md:mb-[4px] text-center text-sm sm:text-base md:text-[11px] font-medium leading-none text-[#0d1b2a]">
            Getting started Guide
          </h3>

          {/* Subtitle */}
          <p className="mb-3 sm:mb-4 md:mb-[16px] text-center text-[8px] sm:text-[9px] md:text-[9px] font-medium leading-none text-[#9c9c9c]">
            Complete setup guide
          </p>

          {/* Description */}
          <p className="mb-3 sm:mb-4 md:mb-[16px] text-center text-[8px] sm:text-[9px] md:text-[9px] font-medium leading-normal text-[#9c9c9c]">
            Learn how to set up your account, complete verification, and make
            your first transaction.
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleGettingStarted}
            className="h-6 sm:h-7 md:h-[25px] w-24 sm:w-28 md:w-[100px] rounded-[10px] bg-[#1e3a8a] px-1.5 sm:px-2 md:px-[6px] py-1 sm:py-1.5 md:py-[5px] text-[8px] sm:text-[9px] md:text-[9px] font-medium leading-[11px] text-white transition-colors hover:bg-[#1e3a8a]/90"
          >
            {showGettingStarted ? "Close Guide" : "Read Guide"}
          </motion.button>
        </motion.div>

        {/* Video Tutorials Card */}
        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "0px 8px 16px 0px rgba(24,181,34,0.35)",
          }}
          transition={{ duration: 0.2 }}
          className="flex w-full sm:w-full md:w-[200px] flex-col items-center overflow-hidden rounded-[10px] bg-white p-3 sm:p-4 md:p-[15px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)]"
        >
          {/* Icon */}
          <div className="mb-2 sm:mb-2.5 md:mb-[8px] flex h-6 w-6 sm:h-6 sm:w-6 md:h-[24px] md:w-[24px] items-center justify-center">
            <PlayCircle className="h-6 w-6 sm:h-6 sm:w-6 md:h-[24px] md:w-[24px] stroke-[1.5] text-[#1e3a8a]" />
          </div>

          {/* Title */}
          <h3 className="mb-1 sm:mb-1.5 md:mb-[4px] text-center text-sm sm:text-base md:text-[11px] font-medium leading-none text-[#0d1b2a]">
            Video Tutorials
          </h3>

          {/* Subtitle */}
          <p className="mb-3 sm:mb-4 md:mb-[16px] text-center text-[8px] sm:text-[9px] md:text-[9px] font-medium leading-none text-[#9c9c9c]">
            Step-by-step videos.
          </p>

          {/* Description */}
          <p className="mb-3 sm:mb-4 md:mb-[16px] text-center text-[8px] sm:text-[9px] md:text-[9px] font-medium leading-normal text-[#9c9c9c]">
            Watch detailed video tutorials covering all platform features and
            best practices.
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleVideoLibrary}
            className="h-6 sm:h-7 md:h-[25px] w-24 sm:w-28 md:w-[100px] rounded-[10px] bg-[#1e3a8a] px-1.5 sm:px-2 md:px-[6px] py-1 sm:py-1.5 md:py-[5px] text-[8px] sm:text-[9px] md:text-[9px] font-medium leading-[11px] text-white transition-colors hover:bg-[#1e3a8a]/90"
          >
            {showVideoLibrary ? "Close Videos" : "Watch Videos"}
          </motion.button>
        </motion.div>
      </div>

      {/* Expandable Sections */}
      <GettingStartedGuide
        isOpen={showGettingStarted}
        onClose={() => setShowGettingStarted(false)}
      />

      <VideoTutorialsLibrary
        isOpen={showVideoLibrary}
        onClose={() => setShowVideoLibrary(false)}
      />
    </div>
  );
}
