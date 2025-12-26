"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, ChevronDown } from "lucide-react";
import { supplierService } from "@/services/supplier.service";
import { marketplaceService } from "@/services/marketplace.service";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

interface FormData {
  title: string;
  description: string;
  categoryId: string;
  priceBefore: string;
  priceAfter: string;
  discountPercent: string;
  imageUrl: string;
  galleryImages: string[];
  condition: string;
  quantity: string;
  unit: string;
  city: string;
  state: string;
  listingType: string;
  expiresAt: string;
  availableQuantity: string;
  minOrderQuantity: string;
}

interface Category {
  id: string;
  name: string;
}

export default function NewListing() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    categoryId: "",
    priceBefore: "",
    priceAfter: "",
    discountPercent: "",
    imageUrl: "",
    galleryImages: [],
    condition: "good",
    quantity: "1",
    unit: "pieces",
    city: "",
    state: "",
    listingType: "fixed",
    expiresAt: "",
    availableQuantity: "",
    minOrderQuantity: "1",
  });

  useEffect(() => {
    // Check if user is supplier
    if (user && user.activeRole !== "supplier") {
      toast.error("Supplier access required");
      router.push("/supplier/listings");
      return;
    }
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await marketplaceService.getCategories();

      if (response.success && response.data?.categories) {
        setCategories(response.data.categories);
      } else {
        console.warn("No categories data received:", response);
        // Use fallback categories
        setCategories(getFallbackCategories());
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories. Using default categories.");
      // Use fallback categories
      setCategories(getFallbackCategories());
    } finally {
      setCategoriesLoading(false);
    }
  };

  const getFallbackCategories = (): Category[] => {
    return [
      { id: "1", name: "Machinery & Equipment" },
      { id: "2", name: "Electrical Components" },
      { id: "3", name: "Electronics & IT Hardware" },
      { id: "4", name: "Tools & Spares" },
      { id: "5", name: "Industrial Supplies" },
      { id: "6", name: "Chemicals & Raw Materials" },
      { id: "7", name: "Packaging Material" },
      { id: "8", name: "Material" },
      { id: "9", name: "Automotive Parts" },
      { id: "10", name: "Metals & Alloys" },
      { id: "11", name: "Plastics & Polymers" },
      { id: "12", name: "Textile & Fabrics" },
      { id: "13", name: "Office Supplies" },
      { id: "14", name: "Furniture & Fixtures" },
      { id: "15", name: "Safety & PPE" },
      { id: "16", name: "Consumer Goods" },
      { id: "17", name: "HVAC & Refrigeration" },
      { id: "18", name: "Solar & Renewable Equipment" },
      { id: "19", name: "Medical & Lab Equipment" },
      { id: "20", name: "Agriculture & Irrigation" },
    ];
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-calculate discount percentage
    if (name === "priceBefore" || name === "priceAfter") {
      const before = parseFloat(
        name === "priceBefore" ? value : formData.priceBefore
      );
      const after = parseFloat(
        name === "priceAfter" ? value : formData.priceAfter
      );
      if (before > 0 && after > 0) {
        const discount = ((before - after) / before) * 100;
        setFormData((prev) => ({
          ...prev,
          discountPercent: discount.toFixed(2),
        }));
      }
    }
  };

  const uploadToCloudinary = async (files: FileList) => {
    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    // Check if Cloudinary is configured
    if (!cloudName || !uploadPreset) {
      toast.error(
        "Cloudinary not configured. Using placeholder images for testing."
      );

      // Use placeholder images for testing
      const placeholders = Array.from(files).map(
        (_, index) =>
          `https://placehold.co/600x400/e2e8f0/1e293b?text=Product+Image+${
            uploadedImages.length + index + 1
          }`
      );

      setUploadedImages((prev) => [...prev, ...placeholders]);

      if (!formData.imageUrl && placeholders.length > 0) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: placeholders[0],
          galleryImages: placeholders.slice(1),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, ...placeholders],
        }));
      }

      setUploadingImages(false);
      toast.success(
        `${placeholders.length} placeholder image(s) added. Configure Cloudinary for real uploads.`
      );
      return;
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Upload failed");
        }

        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        }
      }

      setUploadedImages((prev) => [...prev, ...uploadedUrls]);

      // Set first image as main image if not set
      if (!formData.imageUrl && uploadedUrls.length > 0) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: uploadedUrls[0],
          galleryImages: uploadedUrls.slice(1),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, ...uploadedUrls],
        }));
      }

      toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error(
        `Upload failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Check Cloudinary settings.`
      );
    } finally {
      setUploadingImages(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadToCloudinary(files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadToCloudinary(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      toast.error("Please upload at least one product image");
      return;
    }

    setLoading(true);

    try {
      // Prepare expires_at: if date is set, set to end of day (23:59:59)
      let expiresAt = null;
      if (formData.expiresAt) {
        const expiryDate = new Date(formData.expiresAt);
        expiryDate.setHours(23, 59, 59, 999); // Set to end of day
        expiresAt = expiryDate.toISOString();
      }

      // Prepare data for submission - only send fields from the form
      const submitData = {
        title: formData.title,
        description: formData.description,
        categoryId: formData.categoryId,
        priceAfter: parseFloat(formData.priceAfter),
        imageUrl: formData.imageUrl,
        galleryImages: formData.galleryImages,
        condition: formData.condition as
          | "new"
          | "like-new"
          | "good"
          | "fair"
          | "refurbished"
          | undefined,
        quantity: parseInt(formData.quantity) || 1,
        unit: formData.unit,
        city: formData.city,
        state: "",
        listingType: formData.listingType as
          | "auction"
          | "fixed"
          | "negotiable"
          | undefined,
        expiresAt: expiresAt || undefined,
      };

      const response = await supplierService.createListing(submitData);

      if (response.success) {
        toast.success("Listing created successfully!");
        router.push("/supplier/listings");
      } else {
        toast.error(response.message || "Failed to create listing");
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error("Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEFBF6]">
      <div className="max-w-[1440px] mx-auto px-20 py-8">
        {/* Page Title */}
        <h1
          className="text-[27px] font-semibold text-[#0d1b2a] mb-5"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          My Inventory
        </h1>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[15px] p-[23px] relative w-full"
          style={{
            boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.25)",
            minHeight: "791px",
          }}
        >
          {/* Product Title */}
          <div className="absolute left-[23px] top-[22px]">
            <label
              className="text-[17px] font-medium text-[#0d1b2a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Product Title<span className="text-red-600">*</span>
            </label>
          </div>
          <div
            className="absolute left-[23px] top-[52px]"
            style={{ width: "calc(50% - 33px)" }}
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="eg., Industrial Electronic Components"
              required
              className="w-full h-[42px] px-3 py-2 border border-[#bebebe] rounded-[8px] text-sm text-black placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:border-[#0d1b2a]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>

          {/* Listing Type */}
          <div
            className="absolute top-[22px]"
            style={{ left: "calc(50% + 10px)" }}
          >
            <label
              className="text-[17px] font-medium text-[#0d1b2a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Listing Type<span className="text-red-600">*</span>
            </label>
          </div>
          <div
            className="absolute top-[52px]"
            style={{ left: "calc(50% + 10px)", width: "calc(50% - 33px)" }}
          >
            <div className="relative">
              <select
                name="listingType"
                value={formData.listingType}
                onChange={handleInputChange}
                required
                className="w-full h-[42px] px-3 py-2 border border-[#bebebe] rounded-[8px] text-sm appearance-none text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:border-[#0d1b2a]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <option value="">Select Type</option>
                <option value="fixed">Fixed Price</option>
                <option value="negotiable">Negotiable</option>
                <option value="auction">Auction</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9c9c9c] pointer-events-none" />
            </div>
          </div>

          {/* Category */}
          <div className="absolute left-[23px] top-[124px]">
            <label
              className="text-[17px] font-medium text-[#0d1b2a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Category<span className="text-red-600">*</span>
            </label>
          </div>
          <div
            className="absolute left-[23px] top-[154px]"
            style={{ width: "calc(50% - 33px)" }}
          >
            <div className="relative">
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
                disabled={categoriesLoading}
                className="w-full h-[42px] px-3 py-2 border border-[#bebebe] rounded-[8px] text-sm appearance-none text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:border-[#0d1b2a] disabled:bg-gray-100"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <option value="">
                  {categoriesLoading ? "Loading..." : "Select category"}
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9c9c9c] pointer-events-none" />
            </div>
          </div>

          {/* Condition */}
          <div
            className="absolute top-[124px]"
            style={{ left: "calc(50% + 10px)" }}
          >
            <label
              className="text-[17px] font-medium text-[#0d1b2a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Condition<span className="text-red-600">*</span>
            </label>
          </div>
          <div
            className="absolute top-[154px]"
            style={{ left: "calc(50% + 10px)", width: "calc(50% - 33px)" }}
          >
            <div className="relative">
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                required
                className="w-full h-[42px] px-3 py-2 border border-[#bebebe] rounded-[8px] text-sm appearance-none text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:border-[#0d1b2a]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="refurbished">Refurbished</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9c9c9c] pointer-events-none" />
            </div>
          </div>

          {/* Location */}
          <div className="absolute left-[23px] top-[226px]">
            <label
              className="text-[17px] font-medium text-[#0d1b2a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Location<span className="text-red-600">*</span>
            </label>
          </div>
          <div
            className="absolute left-[23px] top-[256px]"
            style={{ width: "calc(33.33% - 30px)" }}
          >
            <div className="relative">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Select Location"
                required
                className="w-full h-[42px] px-3 py-2 border border-[#bebebe] rounded-[8px] text-sm text-black placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:border-[#0d1b2a]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9c9c9c] pointer-events-none" />
            </div>
          </div>

          {/* Quantity */}
          <div
            className="absolute top-[226px]"
            style={{ left: "calc(33.33% + 3px)" }}
          >
            <label
              className="text-[17px] font-medium text-[#0d1b2a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Quantity<span className="text-red-600">*</span>
            </label>
          </div>
          <div
            className="absolute top-[256px]"
            style={{ left: "calc(33.33% + 3px)", width: "calc(33.33% - 20px)" }}
          >
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="eg., 20,000 - 50,000"
              required
              min="1"
              className="w-full h-[42px] px-3 py-2 border border-[#bebebe] rounded-[8px] text-sm text-black placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:border-[#0d1b2a]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>

          {/* Units */}
          <div
            className="absolute top-[226px]"
            style={{ left: "calc(66.66% - 7px)" }}
          >
            <label
              className="text-[17px] font-medium text-[#0d1b2a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Units<span className="text-red-600">*</span>
            </label>
          </div>
          <div
            className="absolute top-[256px]"
            style={{ left: "calc(66.66% - 7px)", width: "calc(33.33% - 16px)" }}
          >
            <div className="relative">
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                required
                className="w-full h-[42px] px-3 py-2 border border-[#bebebe] rounded-[8px] text-sm appearance-none text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:border-[#0d1b2a]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <option value="">Select Units</option>
                <option value="pieces">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="tons">Tons</option>
                <option value="liters">Liters</option>
                <option value="meters">Meters</option>
                <option value="units">Units</option>
                <option value="boxes">Boxes</option>
                <option value="pallets">Pallets</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9c9c9c] pointer-events-none" />
            </div>
          </div>

          {/* Price */}
          <div className="absolute left-[23px] top-[328px]">
            <label
              className="text-[17px] font-medium text-[#0d1b2a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Price<span className="text-red-600">*</span>
            </label>
          </div>
          <div
            className="absolute left-[23px] top-[358px]"
            style={{ width: "calc(50% - 33px)" }}
          >
            <input
              type="number"
              name="priceAfter"
              value={formData.priceAfter}
              onChange={handleInputChange}
              placeholder="e.g., $20000-$50000"
              required
              step="0.01"
              className="w-full h-[42px] px-3 py-2 border border-[#bebebe] rounded-[8px] text-sm text-black placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:border-[#0d1b2a]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>

          {/* Product Images */}
          <div
            className="absolute top-[328px]"
            style={{ left: "calc(50% + 10px)" }}
          >
            <label
              className="text-[17px] font-medium text-[#0d1b2a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Product images<span className="text-red-600">*</span>
            </label>
          </div>
          <div
            className="absolute top-[360px] h-[314px]"
            style={{ left: "calc(50% + 10px)", width: "calc(50% - 33px)" }}
          >
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="w-full h-full border-2 border-dashed border-[#9c9c9c] rounded-[15px] flex flex-col items-center justify-center cursor-pointer hover:border-[#2aae7a] transition-colors relative"
            >
              <Upload className="w-[38px] h-[38px] text-[#9c9c9c] mb-9" />
              <p
                className="text-[13px] font-medium text-[#2aae7a] mb-3"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Drop & drag images here or click to select
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                disabled={uploadingImages}
                className="px-4 py-2 bg-[#f2f2f2] text-[#9c9c9c] text-base font-medium rounded-[11px] hover:bg-gray-300 transition-colors disabled:opacity-50"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {uploadingImages ? "Uploading..." : "Choose Files"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Display uploaded images */}
              {uploadedImages.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap">
                  {uploadedImages.map((url, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 rounded-lg overflow-hidden border-2 border-[#2aae7a]"
                    >
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div className="absolute left-[23px] top-[430px]">
            <label
              className="text-[17px] font-medium text-[#0d1b2a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Product description
            </label>
          </div>
          <div
            className="absolute left-[23px] top-[460px]"
            style={{ width: "calc(50% - 33px)" }}
          >
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              placeholder="Describe your specific requirements, quality standards, certifications needed etc."
              required
              className="w-full h-[113px] px-3 py-2 border border-[#bebebe] rounded-[8px] text-sm text-black placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:border-[#0d1b2a] resize-none"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>

          {/* Listing Duration */}
          <div className="absolute left-[23px] top-[602px]">
            <label
              className="text-[17px] font-medium text-[#0d1b2a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Listing Duration<span className="text-red-600">*</span>
            </label>
          </div>
          <div
            className="absolute left-[23px] top-[632px]"
            style={{ width: "calc(50% - 33px)" }}
          >
            <div className="relative">
              <input
                type="date"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleInputChange}
                placeholder="Select duration"
                className="w-full h-[42px] px-3 py-2 border border-[#bebebe] rounded-[8px] text-sm text-black placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:border-[#0d1b2a]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9c9c9c] pointer-events-none" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="absolute left-[23px] top-[724px] w-[191px]">
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="w-full h-[45px] px-4 py-3 bg-[#1e3a8a] text-white text-base font-semibold rounded-[11px] hover:bg-[#1e40af] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {loading ? "Creating..." : "List Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
