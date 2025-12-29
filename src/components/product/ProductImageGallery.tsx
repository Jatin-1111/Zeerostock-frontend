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
  
  // Debug: log what images we receive
  console.log('ProductImageGallery received images:', images);
  
  const productImages =
    images.length > 0 ? images : ["/placeholder-product.svg"];

  return (
    <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] p-4.5 space-y-3">
      {/* Discount Badge */}
      {discountPercent && discountPercent > 0 && (
        <div className="absolute top-7.5 left-7.5 bg-red-500 text-white text-[10.5px] font-bold px-2.25 py-1.5 rounded-[3.75px] z-10">
          -{discountPercent}% OFF
        </div>
      )}

      {/* Main Image */}
      <div className="w-full aspect-[1.4] bg-gray-50 rounded-[15px] overflow-hidden relative">
        <Image
          src={productImages[activeImage]}
          alt={`${title} - Image ${activeImage + 1}`}
          fill
          className="object-contain p-4"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder-product.svg";
          }}
        />
      </div>

      {/* Thumbnail Images */}
      {productImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2.25">
          {productImages.slice(0, 4).map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`aspect-square bg-gray-50 rounded-[7.5px] overflow-hidden border-2 relative transition-all ${
                activeImage === index ? "border-[#2aae7a]" : "border-gray-200"
              }`}
            >
              <Image
                src={img}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-contain p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-product.svg";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
