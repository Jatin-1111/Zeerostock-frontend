"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  discountPercent?: number;
}

export default function ProductImageGallery({
  images = [],
  title,
  discountPercent,
}: ProductImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const productImages =
    images.length > 0 ? images : ["/placeholder-product.svg"];

  return (
    <div className="space-y-4">
      {/* Discount Badge */}
      {discountPercent && discountPercent > 0 && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded z-10">
          -{discountPercent}% OFF
        </div>
      )}

      {/* Main Image */}
      <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden relative">
        <Image
          src={productImages[activeImage]}
          alt={`${title} - Image ${activeImage + 1}`}
          fill
          className="object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder-product.svg";
          }}
        />
      </div>

      {/* Thumbnail Images */}
      {productImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {productImages.slice(0, 4).map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`h-24 bg-gray-100 rounded-lg overflow-hidden border-2 relative ${
                activeImage === index ? "border-gray-900" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-product.svg";
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button className="py-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          Description
        </button>
        <button className="py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          Specification
        </button>
        <button className="py-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          Images & Videos
        </button>
      </div>
    </div>
  );
}
