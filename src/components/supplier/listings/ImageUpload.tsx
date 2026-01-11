"use client";

import React from "react";
import { Upload, Eye, X } from "lucide-react";

interface ImageUploadProps {
  uploadedImages: Array<{ url: string; fileKey: string }>;
  uploading: boolean;
  error?: string;
  onUpload: (files: FileList) => void;
  onRemove: (index: number) => void;
  onPreview: (url: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  uploadedImages,
  uploading,
  error,
  onUpload,
  onRemove,
  onPreview,
  fileInputRef,
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <div>
      <label className="mb-[6px] block text-[8px] font-medium text-[#0d1b2a]">
        Upload Product images*
      </label>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative flex h-[140px] cursor-pointer flex-col items-center justify-center rounded-[7.33px] border-2 border-dashed border-[#9c9c9c] hover:border-[#2AAE7A] hover:bg-[#f0fdf4]"
      >
        <Upload className="mb-[12.67px] h-[25.33px] w-[25.33px] text-[#9c9c9c]" />
        <p className="mb-[5.33px] text-[8px] text-[#9c9c9c]">
          Drop & drag images here or click to select
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          disabled={uploading}
          className="mt-[7.33px] rounded-[5.33px] bg-[#f2f2f2] px-[20.67px] py-[5.33px] text-[8px] font-medium text-[#9c9c9c] hover:bg-gray-300 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Choose Files"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Uploaded Images Grid */}
        {uploadedImages.length > 0 && (
          <div className="absolute bottom-[8px] left-[20px] right-[20px] flex flex-wrap gap-[5.33px]">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className="group relative h-[48px] w-[48px] cursor-pointer overflow-hidden rounded-[5.33px] border-2 border-[#2AAE7A]"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(image.url);
                }}
              >
                <img
                  src={image.url}
                  alt={`Upload ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50">
                  <Eye className="h-[12px] w-[12px] text-white opacity-0 group-hover:opacity-100" />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(index);
                  }}
                  className="absolute right-0 top-0 flex h-[12px] w-[12px] items-center justify-center rounded-bl-md bg-red-500 text-white hover:bg-red-600"
                >
                  <X className="h-[7.33px] w-[7.33px]" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-[#2AAE7A] py-[1.33px] text-center text-[5.33px] font-medium text-white">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-[2.67px] text-[6.67px] text-red-500">{error}</p>
      )}
    </div>
  );
};
