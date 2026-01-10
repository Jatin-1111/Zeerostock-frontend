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
}: ProductImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  // Debug: log what images we receive
  console.log("ProductImageGallery received images:", images);

  const productImages =
    images.length > 0 ? images : ["/placeholder-product.svg"];

  return (
    <div className="rounded-[2.5px]">
      {/* Main Image */}
      <div className="w-full aspect-[1.4] bg-white rounded-[2.5px] overflow-hidden relative border-2 border-gray-100">
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
        <div className="grid grid-cols-4 gap-[7.5px] p-3">
          {productImages.slice(0, 4).map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`aspect-square bg-white rounded-[2.5px] overflow-hidden relative transition-all ${
                activeImage === index
                  ? "border-[2.5px] border-[#2aae7a]"
                  : "border-[1.25px] border-gray-200"
              }`}
            >
              <Image
                src={img}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-contain p-1"
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
