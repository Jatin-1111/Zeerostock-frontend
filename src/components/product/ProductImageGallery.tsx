"use client";

import { useState } from "react";

export default function ProductImageGallery() {
  const [activeImage, setActiveImage] = useState(0);
  const images = [1, 2, 3];

  return (
    <div className="space-y-4">
      {/* Discount Badge */}
      <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded z-10">
        -20% OFF
      </div>

      {/* Main Image */}
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center relative">
        <span className="text-gray-400">Product Image</span>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 ${
              activeImage === index ? "border-gray-900" : "border-transparent"
            }`}
          >
            <span className="text-xs text-gray-400">Image {img}</span>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button className="py-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-white transition-colors">
          Description
        </button>
        <button className="py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          Specification
        </button>
        <button className="py-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-white transition-colors">
          Images & Videos
        </button>
      </div>
    </div>
  );
}
