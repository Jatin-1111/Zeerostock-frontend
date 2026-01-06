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
      <label className="mb-[9px] block text-[12px] font-medium text-[#0d1b2a]">
        Upload Product images*
      </label>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative flex h-[210px] cursor-pointer flex-col items-center justify-center rounded-[11px] border-2 border-dashed border-[#9c9c9c] hover:border-[#2AAE7A] hover:bg-[#f0fdf4]"
      >
        <Upload className="mb-[19px] h-[38px] w-[38px] text-[#9c9c9c]" />
        <p className="mb-[8px] text-[12px] text-[#9c9c9c]">
          Drop & drag images here or click to select
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          disabled={uploading}
          className="mt-[11px] rounded-[8px] bg-[#f2f2f2] px-[31px] py-[8px] text-[12px] font-medium text-[#9c9c9c] hover:bg-gray-300 disabled:opacity-50"
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
          <div className="absolute bottom-[12px] left-[30px] right-[30px] flex flex-wrap gap-[8px]">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className="group relative h-[72px] w-[72px] cursor-pointer overflow-hidden rounded-[8px] border-2 border-[#2AAE7A]"
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
                  <Eye className="h-[18px] w-[18px] text-white opacity-0 group-hover:opacity-100" />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(index);
                  }}
                  className="absolute right-0 top-0 flex h-[18px] w-[18px] items-center justify-center rounded-bl-md bg-red-500 text-white hover:bg-red-600"
                >
                  <X className="h-[11px] w-[11px]" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-[#2AAE7A] py-[2px] text-center text-[8px] font-medium text-white">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-[4px] text-[10px] text-red-500">{error}</p>}
    </div>
  );
};
