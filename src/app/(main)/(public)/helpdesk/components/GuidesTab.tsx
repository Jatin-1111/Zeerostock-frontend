"use client";

import { useState } from "react";
import { MessageSquare, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import GettingStartedGuide from "./GettingStartedGuide";
import VideoTutorialsLibrary from "./VideoTutorialsLibrary";

export default function GuidesTab() {
  const [showGettingStarted, setShowGettingStarted] = useState(false);
  const [showVideoLibrary, setShowVideoLibrary] = useState(false);

  return (
    <>
      <div className="w-full">
        {/* Title Section */}
        <div className="mb-[16px]">
          <h2 className="mb-[4px] text-base font-semibold leading-none text-[#0d1b2a]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs font-medium leading-none text-[#9c9c9c]">
            Find answers to common questions about using Zeerotock
          </p>
        </div>

        {/* Guide Cards Grid */}
        <div className="flex gap-[16px]">
          {/* Getting Started Guide Card */}
          <motion.div
            whileHover={{
              y: -5,
              boxShadow: "0px 8px 16px 0px rgba(24,181,34,0.35)",
            }}
            transition={{ duration: 0.2 }}
            className="flex w-[200px] flex-col items-center overflow-hidden rounded-[10px] bg-white p-[15px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)]"
          >
            {/* Icon */}
            <div className="mb-[8px] flex h-[24px] w-[24px] items-center justify-center">
              <MessageSquare className="h-[24px] w-[24px] stroke-[1.5] text-[#1e3a8a]" />
            </div>

            {/* Title */}
            <h3 className="mb-[4px] text-center text-xs font-medium leading-none text-[#0d1b2a]">
              Getting started Guide
            </h3>

            {/* Subtitle */}
            <p className="mb-[16px] text-center text-xs font-medium leading-none text-[#9c9c9c]">
              Complete setup guide
            </p>

            {/* Description */}
            <p className="mb-[16px] w-[170px] text-center text-xs font-medium leading-normal text-[#9c9c9c]">
              Learn how to set up your account, complete verification, and make
              your first transaction.
            </p>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGettingStarted(true)}
              className="h-[25px] w-[100px] rounded-[10px] bg-[#1e3a8a] px-[6px] py-[5px] text-xs font-medium leading-tight text-white transition-colors hover:bg-[#1e3a8a]/90"
            >
              Read Guide
            </motion.button>
          </motion.div>

          {/* Video Tutorials Card */}
          <motion.div
            whileHover={{
              y: -5,
              boxShadow: "0px 8px 16px 0px rgba(24,181,34,0.35)",
            }}
            transition={{ duration: 0.2 }}
            className="flex w-[200px] flex-col items-center overflow-hidden rounded-[10px] bg-white p-[15px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)]"
          >
            {/* Icon */}
            <div className="mb-[8px] flex h-[24px] w-[24px] items-center justify-center">
              <PlayCircle className="h-[24px] w-[24px] stroke-[1.5] text-[#1e3a8a]" />
            </div>

            {/* Title */}
            <h3 className="mb-[4px] text-center text-xs font-medium leading-none text-[#0d1b2a]">
              Video Tutorials
            </h3>

            {/* Subtitle */}
            <p className="mb-[16px] text-center text-xs font-medium leading-none text-[#9c9c9c]">
              Step-by-step videos.
            </p>

            {/* Description */}
            <p className="mb-[16px] w-[170px] text-center text-xs font-medium leading-normal text-[#9c9c9c]">
              Watch detailed video tutorials covering all platform features and
              best practices.
            </p>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVideoLibrary(true)}
              className="h-[25px] w-[100px] rounded-[10px] bg-[#1e3a8a] px-[6px] py-[5px] text-xs font-medium leading-tight text-white transition-colors hover:bg-[#1e3a8a]/90"
            >
              Watch Videos
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Getting Started Guide Modal */}
      <GettingStartedGuide
        isOpen={showGettingStarted}
        onClose={() => setShowGettingStarted(false)}
      />

      {/* Video Tutorials Library Modal */}
      <VideoTutorialsLibrary
        isOpen={showVideoLibrary}
        onClose={() => setShowVideoLibrary(false)}
      />
    </>
  );
}
