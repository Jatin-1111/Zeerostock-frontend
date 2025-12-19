"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Package } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-medium text-gray-900">My Inventory</h1>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="border border-gray-300 p-8">
          <div className="grid grid-cols-1 gap-6">
            {/* Row 1: Product Title and Listing Type */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Product Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ex: Industrial Steel Pipes - Grade A36"
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Listing Type*
                </label>
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="">Please listing type</option>
                  <option value="fixed">Fixed Price</option>
                  <option value="auction">Auction</option>
                  <option value="negotiable">Negotiable</option>
                </select>
              </div>
            </div>

            {/* Row 2: Category, Condition, and Location */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Category*
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                  disabled={categoriesLoading}
                  className="w-full px-3 py-2 border border-gray-300 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 disabled:bg-gray-100"
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
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Condition*
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="">Select condition</option>
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="refurbished">Refurbished</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Location*
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Ex: Mumbai, Maharashtra"
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-black"
                />
              </div>
            </div>

            {/* Row 3: Quantity, Units, and Price */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Quantity*
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter qty"
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Units*
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-sm text-black focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="pieces">Pieces</option>
                  <option value="kg">Kilograms</option>
                  <option value="tons">Tons</option>
                  <option value="liters">Liters</option>
                  <option value="meters">Meters</option>
                  <option value="boxes">Boxes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Price*
                </label>
                <input
                  type="number"
                  name="priceAfter"
                  value={formData.priceAfter}
                  onChange={handleInputChange}
                  placeholder="Enter price per unit"
                  required
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-black"
                />
              </div>
            </div>

            {/* Row 4: Product Description and Product Images */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Product Description*
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={8}
                  placeholder="Detailed description of the product, specifications, material, quality etc"
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Product Images*
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center h-[calc(100%-2rem)] cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-600 mb-1">
                    Drag & drop images here, or click to select!
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    disabled={uploadingImages}
                    className="mt-3 px-4 py-2 bg-white border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-50"
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
                </div>
                {uploadedImages.length > 0 && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {uploadedImages.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-16 object-cover border border-gray-300"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Row 5: Listing Duration */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Listing Duration*
                </label>
                <input
                  type="date"
                  name="expiresAt"
                  value={formData.expiresAt}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-black"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading || uploadingImages}
                className="w-full px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" />
                {loading ? "Listing Product..." : "List Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
