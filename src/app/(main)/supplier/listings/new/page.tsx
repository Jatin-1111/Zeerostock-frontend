"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, ChevronDown, X, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supplierService } from "@/services/supplier.service";
import { marketplaceService } from "@/services/marketplace.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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
  const [uploadedImages, setUploadedImages] = useState<
    Array<{ url: string; fileKey: string }>
  >([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
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

  const handleDropdownSelect = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".custom-dropdown")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const uploadToS3 = async (files: FileList) => {
    // Check if adding these files would exceed the limit
    const currentImageCount = uploadedImages.length;
    const newImageCount = files.length;
    const totalImages = currentImageCount + newImageCount;

    if (totalImages > 10) {
      toast.error(
        `You can only upload a maximum of 10 images. You currently have ${currentImageCount} image(s). You tried to add ${newImageCount} more.`
      );
      return;
    }

    // Validate file sizes (max 10MB per file)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    const invalidFiles: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        invalidFiles.push(`${file.name} (${fileSizeMB}MB)`);
      }
    });

    if (invalidFiles.length > 0) {
      toast.error(
        `The following file(s) exceed the 10MB size limit:\n${invalidFiles.join(
          ", "
        )}`
      );
      return;
    }

    setUploadingImages(true);

    try {
      const formDataToSend = new FormData();

      // Append all files to FormData
      Array.from(files).forEach((file) => {
        formDataToSend.append("images", file);
      });

      // Get auth token (same token key as api-client.ts)
      const TOKEN_KEY =
        process.env.NEXT_PUBLIC_JWT_TOKEN_KEY || "zeerostock_access_token";
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error("Authentication required. Please login again.");
      }

      // Upload to backend S3 endpoint
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"
        }/supplier/listings/upload-images`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        // Handle file size error specifically
        if (errorData.message && errorData.message.includes("File too large")) {
          throw new Error("One or more files exceed the 10MB size limit");
        }
        throw new Error(errorData.message || "Upload failed");
      }

      const data = await response.json();

      if (data.success && data.data.images) {
        // Store both URL and fileKey for each image
        interface S3Image {
          url: string;
          fileKey: string;
        }
        const images = data.data.images.map((img: S3Image) => ({
          url: img.url,
          fileKey: img.fileKey,
        }));

        setUploadedImages((prev) => [...prev, ...images]);

        // Set first image as main image if not set
        if (!formData.imageUrl && images.length > 0) {
          setFormData((prev) => ({
            ...prev,
            imageUrl: images[0].url,
            galleryImages: images.slice(1).map((img: S3Image) => img.url),
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            galleryImages: [
              ...prev.galleryImages,
              ...images.map((img: S3Image) => img.url),
            ],
          }));
        }

        toast.success(
          `${images.length} ${
            images.length === 1 ? "image" : "images"
          } uploaded successfully`
        );
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error(
        `Upload failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setUploadingImages(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadToS3(files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadToS3(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveImage = async (indexToRemove: number) => {
    const imageToRemove = uploadedImages[indexToRemove];

    try {
      // Get auth token
      const TOKEN_KEY =
        process.env.NEXT_PUBLIC_JWT_TOKEN_KEY || "zeerostock_access_token";
      const token = localStorage.getItem(TOKEN_KEY);

      if (token && imageToRemove.fileKey) {
        // Delete from S3 via backend
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"
          }/supplier/listings/delete-image`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ fileKey: imageToRemove.fileKey }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete image");
        }
      }

      // Remove from uploaded images array
      setUploadedImages((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );

      // Update formData
      setFormData((prev) => {
        // If removing the main image
        if (prev.imageUrl === imageToRemove.url) {
          const remainingImages = uploadedImages.filter(
            (_, index) => index !== indexToRemove
          );
          return {
            ...prev,
            imageUrl: remainingImages.length > 0 ? remainingImages[0].url : "",
            galleryImages: remainingImages.slice(1).map((img) => img.url),
          };
        } else {
          // If removing from gallery
          return {
            ...prev,
            galleryImages: prev.galleryImages.filter(
              (url) => url !== imageToRemove.url
            ),
          };
        }
      });

      toast.success("Image has been removed successfully");
    } catch (error) {
      console.error("Error removing image:", error);
      toast.error(
        `Failed to remove image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    // Client-side validations
    const errors: Record<string, string> = {};

    if (!formData.title || formData.title.trim().length < 10) {
      errors.title = "Product title must be at least 10 characters long";
    }
    if (formData.title.length > 500) {
      errors.title = "Product title cannot exceed 500 characters";
    }

    if (!formData.description || formData.description.trim().length < 50) {
      errors.description =
        "Product description must be at least 50 characters long";
    }

    if (!formData.categoryId) {
      errors.categoryId = "Please select a category";
    }

    if (!formData.priceAfter || parseFloat(formData.priceAfter) <= 0) {
      errors.priceAfter = "Please enter a valid price greater than 0";
    }

    if (!formData.imageUrl) {
      errors.imageUrl = "Please upload at least one product image";
    }

    if (uploadedImages.length > 10) {
      errors.imageUrl =
        "You can upload a maximum of 10 images (1 main + 9 gallery images)";
    }

    if (!formData.city) {
      errors.city = "Please specify the location";
    }

    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      errors.quantity = "Please enter a valid quantity greater than 0";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
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
        toast.success("Your listing has been created successfully");
        router.push("/supplier/listings");
      } else {
        toast.error(response.message || "Failed to create listing");
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      const err = error as {
        response?: {
          data?: {
            errors?: Array<{ field: string; message: string }>;
            message?: string;
          };
        };
        message?: string;
      };

      if (err?.response?.data?.errors) {
        const backendErrors: Record<string, string> = {};
        err.response.data.errors.forEach((validationError) => {
          backendErrors[validationError.field] = validationError.message;
        });
        setValidationErrors(backendErrors);
        toast.error(
          err.response.data.message ||
            "Validation failed. Please check your inputs."
        );
      } else if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(
          err?.message || "Failed to create listing. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEFBF6]">
      {/* Image Preview Modal with Framer Motion Animations */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              />
              <motion.button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
                whileHover={{ scale: 1.1, backgroundColor: "#dc2626" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                title="Close preview"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-[1440px] px-20 py-8">
        {/* Page Title */}
        <h1 className="mb-5 text-[27px] font-semibold text-[#0d1b2a]">
          My Inventory
        </h1>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="relative min-h-[791px] w-full rounded-[15px] bg-white p-[23px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)]"
        >
          {/* Product Title */}
          <div className="absolute left-[23px] top-[22px]">
            <label className="text-[17px] font-medium text-[#0d1b2a]">
              Product Title<span className="text-red-600">*</span>
              <span className="ml-2 text-xs text-[#6b7280]">
                (Min: 10 chars)
              </span>
            </label>
          </div>
          <div className="absolute left-[23px] top-[52px] w-[calc(50%-33px)]">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="eg., Industrial Electronic Components"
              required
              minLength={10}
              maxLength={500}
              className={`h-[42px] w-full rounded-[8px] border ${
                validationErrors.title ? "border-red-500" : "border-[#bebebe]"
              } px-3 py-2 text-sm text-black placeholder:text-[#9c9c9c] focus:border-[#0d1b2a] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a]`}
            />
            {validationErrors.title && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.title}
              </p>
            )}
            <p className="mt-1 text-xs text-[#6b7280]">
              {formData.title.length}/500 characters
            </p>
          </div>

          {/* Listing Type */}
          <div className="absolute left-[calc(50%+10px)] top-[22px]">
            <label className="text-[17px] font-medium text-[#0d1b2a]">
              Listing Type<span className="text-red-600">*</span>
            </label>
          </div>
          <div className="absolute left-[calc(50%+10px)] top-[52px] w-[calc(50%-33px)]">
            <div className="relative custom-dropdown">
              <button
                type="button"
                onClick={() => toggleDropdown("listingType")}
                className="h-[42px] w-full appearance-none rounded-[8px] border border-[#bebebe] px-3 py-2 text-left text-sm transition-all duration-300 hover:border-[#2aae7a] hover:shadow-md focus:border-[#0d1b2a] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:scale-[1.01] flex items-center justify-between"
              >
                <span
                  className={
                    formData.listingType ? "text-black" : "text-[#9c9c9c]"
                  }
                >
                  {formData.listingType === "fixed" && "Fixed Price"}
                  {formData.listingType === "negotiable" && "Negotiable"}
                  {formData.listingType === "auction" && "Auction"}
                  {!formData.listingType && "Select Type"}
                </span>
                <motion.div
                  animate={{ rotate: openDropdown === "listingType" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-[#9c9c9c] transition-colors duration-300" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openDropdown === "listingType" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute z-50 w-full overflow-hidden rounded-[8px] border border-[#bebebe] bg-white shadow-lg mt-1"
                  >
                    <div className="max-h-[200px] overflow-y-auto">
                      {[
                        { value: "fixed", label: "Fixed Price" },
                        { value: "negotiable", label: "Negotiable" },
                        { value: "auction", label: "Auction" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            handleDropdownSelect("listingType", option.value)
                          }
                          className="w-full px-3 py-2 text-left text-sm hover:bg-[#f0fdf4] transition-colors duration-200 text-black"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Category */}
          <div className="absolute left-[23px] top-[124px]">
            <label className="text-[17px] font-medium text-[#0d1b2a]">
              Category<span className="text-red-600">*</span>
            </label>
            {validationErrors.categoryId && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.categoryId}
              </p>
            )}
          </div>
          <div className="absolute left-[23px] top-[154px] w-[calc(50%-33px)]">
            <div className="relative custom-dropdown">
              <button
                type="button"
                onClick={() => !categoriesLoading && toggleDropdown("category")}
                disabled={categoriesLoading}
                className={`h-[42px] w-full appearance-none rounded-[8px] border ${
                  validationErrors.categoryId
                    ? "border-red-500"
                    : "border-[#bebebe]"
                } px-3 py-2 text-left text-sm transition-all duration-300 hover:border-[#2aae7a] hover:shadow-md focus:border-[#0d1b2a] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:scale-[1.01] disabled:bg-gray-100 disabled:hover:border-[#bebebe] disabled:hover:shadow-none flex items-center justify-between`}
              >
                <span
                  className={
                    formData.categoryId ? "text-black" : "text-[#9c9c9c]"
                  }
                >
                  {categoriesLoading
                    ? "Loading..."
                    : formData.categoryId
                    ? categories.find((c) => c.id === formData.categoryId)?.name
                    : "Select category"}
                </span>
                <motion.div
                  animate={{ rotate: openDropdown === "category" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-[#9c9c9c] transition-colors duration-300" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openDropdown === "category" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute z-50 w-full overflow-hidden rounded-[8px] border border-[#bebebe] bg-white shadow-lg mt-1"
                  >
                    <div className="max-h-[200px] overflow-y-auto">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() =>
                            handleDropdownSelect("categoryId", cat.id)
                          }
                          className="w-full px-3 py-2 text-left text-sm hover:bg-[#f0fdf4] transition-colors duration-200 text-black"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Condition */}
          <div className="absolute left-[calc(50%+10px)] top-[124px]">
            <label className="text-[17px] font-medium text-[#0d1b2a]">
              Condition<span className="text-red-600">*</span>
            </label>
          </div>
          <div className="absolute left-[calc(50%+10px)] top-[154px] w-[calc(50%-33px)]">
            <div className="relative custom-dropdown">
              <button
                type="button"
                onClick={() => toggleDropdown("condition")}
                className="h-[42px] w-full appearance-none rounded-[8px] border border-[#bebebe] px-3 py-2 text-left text-sm transition-all duration-300 hover:border-[#2aae7a] hover:shadow-md focus:border-[#0d1b2a] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:scale-[1.01] flex items-center justify-between"
              >
                <span
                  className={
                    formData.condition ? "text-black" : "text-[#9c9c9c]"
                  }
                >
                  {formData.condition === "new" && "New"}
                  {formData.condition === "like-new" && "Like New"}
                  {formData.condition === "good" && "Good"}
                  {formData.condition === "fair" && "Fair"}
                  {formData.condition === "refurbished" && "Refurbished"}
                  {!formData.condition && "Select condition"}
                </span>
                <motion.div
                  animate={{ rotate: openDropdown === "condition" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-[#9c9c9c] transition-colors duration-300" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openDropdown === "condition" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute z-50 w-full overflow-hidden rounded-[8px] border border-[#bebebe] bg-white shadow-lg mt-1"
                  >
                    <div className="max-h-[200px] overflow-y-auto">
                      {[
                        { value: "new", label: "New" },
                        { value: "like-new", label: "Like New" },
                        { value: "good", label: "Good" },
                        { value: "fair", label: "Fair" },
                        { value: "refurbished", label: "Refurbished" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            handleDropdownSelect("condition", option.value)
                          }
                          className="w-full px-3 py-2 text-left text-sm hover:bg-[#f0fdf4] transition-colors duration-200 text-black"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Location */}
          <div className="absolute left-[23px] top-[226px]">
            <label className="text-[17px] font-medium text-[#0d1b2a]">
              Location<span className="text-red-600">*</span>
            </label>
          </div>
          <div className="absolute left-[23px] top-[256px] w-[calc(33.33%-30px)]">
            <div className="relative">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Select Location"
                required
                className={`h-[42px] w-full rounded-[8px] border ${
                  validationErrors.city ? "border-red-500" : "border-[#bebebe]"
                } px-3 py-2 text-sm text-black placeholder:text-[#9c9c9c] focus:border-[#0d1b2a] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a]`}
              />
            </div>
            {validationErrors.city && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.city}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="absolute left-[calc(33.33%+3px)] top-[226px]">
            <label className="text-[17px] font-medium text-[#0d1b2a]">
              Quantity<span className="text-red-600">*</span>
            </label>
          </div>
          <div className="absolute left-[calc(33.33%+3px)] top-[256px] w-[calc(33.33%-20px)]">
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="eg., 20,000 - 50,000"
              required
              min="1"
              className={`h-[42px] w-full rounded-[8px] border ${
                validationErrors.quantity
                  ? "border-red-500"
                  : "border-[#bebebe]"
              } px-3 py-2 text-sm text-black placeholder:text-[#9c9c9c] focus:border-[#0d1b2a] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a]`}
            />
            {validationErrors.quantity && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.quantity}
              </p>
            )}
          </div>

          {/* Units */}
          <div className="absolute left-[calc(66.66%-7px)] top-[226px]">
            <label className="text-[17px] font-medium text-[#0d1b2a]">
              Units<span className="text-red-600">*</span>
            </label>
          </div>
          <div className="absolute left-[calc(66.66%-7px)] top-[256px] w-[calc(33.33%-16px)]">
            <div className="relative custom-dropdown">
              <button
                type="button"
                onClick={() => toggleDropdown("unit")}
                className="h-[42px] w-full appearance-none rounded-[8px] border border-[#bebebe] px-3 py-2 text-left text-sm transition-all duration-300 hover:border-[#2aae7a] hover:shadow-md focus:border-[#0d1b2a] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a] focus:scale-[1.01] flex items-center justify-between"
              >
                <span
                  className={formData.unit ? "text-black" : "text-[#9c9c9c]"}
                >
                  {formData.unit === "pieces" && "Pieces"}
                  {formData.unit === "kg" && "Kilograms"}
                  {formData.unit === "tons" && "Tons"}
                  {formData.unit === "liters" && "Liters"}
                  {formData.unit === "meters" && "Meters"}
                  {formData.unit === "units" && "Units"}
                  {formData.unit === "boxes" && "Boxes"}
                  {formData.unit === "pallets" && "Pallets"}
                  {!formData.unit && "Select Units"}
                </span>
                <motion.div
                  animate={{ rotate: openDropdown === "unit" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-[#9c9c9c] transition-colors duration-300" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openDropdown === "unit" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute z-50 w-full overflow-hidden rounded-[8px] border border-[#bebebe] bg-white shadow-lg mt-1"
                  >
                    <div className="max-h-[200px] overflow-y-auto">
                      {[
                        { value: "pieces", label: "Pieces" },
                        { value: "kg", label: "Kilograms" },
                        { value: "tons", label: "Tons" },
                        { value: "liters", label: "Liters" },
                        { value: "meters", label: "Meters" },
                        { value: "units", label: "Units" },
                        { value: "boxes", label: "Boxes" },
                        { value: "pallets", label: "Pallets" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            handleDropdownSelect("unit", option.value)
                          }
                          className="w-full px-3 py-2 text-left text-sm hover:bg-[#f0fdf4] transition-colors duration-200 text-black"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Price */}
          <div className="absolute left-[23px] top-[328px]">
            <label className="text-[17px] font-medium text-[#0d1b2a]">
              Price<span className="text-red-600">*</span>
            </label>
          </div>
          <div className="absolute left-[23px] top-[358px] w-[calc(50%-33px)]">
            <input
              type="number"
              name="priceAfter"
              value={formData.priceAfter}
              onChange={handleInputChange}
              placeholder="e.g., $20000-$50000"
              required
              step="0.01"
              className={`h-[42px] w-full rounded-[8px] border ${
                validationErrors.priceAfter
                  ? "border-red-500"
                  : "border-[#bebebe]"
              } px-3 py-2 text-sm text-black placeholder:text-[#9c9c9c] focus:border-[#0d1b2a] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a]`}
            />
            {validationErrors.priceAfter && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.priceAfter}
              </p>
            )}
          </div>

          {/* Product Images */}
          <div className="absolute left-[calc(50%+10px)] top-[328px]">
            <label className="text-[17px] font-medium text-[#0d1b2a]">
              Product images<span className="text-red-600">*</span>
              <span className="ml-2 text-xs text-[#6b7280]">
                (Min: 1, Max: 10 images, 10MB each)
              </span>
            </label>
            {validationErrors.imageUrl && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.imageUrl}
              </p>
            )}
          </div>
          <div className="absolute left-[calc(50%+10px)] top-[360px] h-[314px] w-[calc(50%-33px)]">
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-[15px] border-2 border-dashed border-[#9c9c9c] transition-all duration-300 hover:border-[#2aae7a] hover:bg-[#f0fdf4] hover:shadow-md"
            >
              <Upload className="mb-9 h-[38px] w-[38px] text-[#9c9c9c] transition-all duration-300 hover:scale-110 hover:text-[#2aae7a]" />
              <p className="mb-3 text-[13px] font-medium text-[#2aae7a] transition-all duration-200">
                Drop & drag images here or click to select
              </p>
              <p className="mb-3 text-[11px] text-[#9c9c9c]">
                Max 10 images, 10MB per image
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                disabled={uploadingImages}
                className="rounded-[11px] bg-[#f2f2f2] px-4 py-2 text-base font-medium text-[#9c9c9c] transition-all duration-300 hover:scale-105 hover:bg-gray-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadingImages ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Choose Files"
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Display uploaded images with animations */}
              {uploadedImages.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {uploadedImages.map((image, index) => (
                    <div
                      key={index}
                      className="group relative h-24 w-24 overflow-hidden rounded-lg border-2 border-[#2aae7a] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-[#1e8a5a] animate-in fade-in zoom-in-95"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationDuration: "300ms",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewImage(image.url);
                      }}
                    >
                      <img
                        src={image.url}
                        alt={`Upload ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Preview overlay on hover with smooth animation */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                        <Eye className="h-6 w-6 text-white opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
                      </div>
                      {/* Remove button with animation */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        className="absolute right-0 top-0 z-10 flex h-6 w-6 items-center justify-center rounded-bl-md bg-red-500 text-white transition-all duration-200 hover:h-7 hover:w-7 hover:bg-red-600 hover:shadow-md"
                        title="Remove image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      {/* Main image indicator with slide animation */}
                      {index === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-[#2aae7a] bg-opacity-90 px-1 py-0.5 text-center text-[10px] font-medium text-white animate-in slide-in-from-bottom duration-300">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div className="absolute left-[23px] top-[430px]">
            <label className="text-[17px] font-medium text-[#0d1b2a]">
              Product description<span className="text-red-600">*</span>
              <span className="ml-2 text-xs text-[#6b7280]">
                (Min: 50 chars)
              </span>
            </label>
          </div>
          <div className="absolute left-[23px] top-[460px] w-[calc(50%-33px)]">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              placeholder="Describe your specific requirements, quality standards, certifications needed etc."
              required
              minLength={50}
              className={`h-[113px] w-full resize-none rounded-[8px] border ${
                validationErrors.description
                  ? "border-red-500"
                  : "border-[#bebebe]"
              } px-3 py-2 text-sm text-black placeholder:text-[#9c9c9c] focus:border-[#0d1b2a] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a]`}
            />
            {validationErrors.description && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.description}
              </p>
            )}
          </div>

          {/* Listing Duration */}
          <div className="absolute left-[23px] top-[602px]">
            <label className="text-[17px] font-medium text-[#0d1b2a]">
              Listing Duration<span className="text-red-600">*</span>
            </label>
          </div>
          <div className="absolute left-[23px] top-[632px] w-[calc(50%-33px)]">
            <div className="relative">
              <input
                type="date"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleInputChange}
                placeholder="Select duration"
                className="h-[42px] w-full rounded-[8px] border border-[#bebebe] px-3 py-2 text-sm text-black placeholder:text-[#9c9c9c] focus:border-[#0d1b2a] focus:outline-none focus:ring-1 focus:ring-[#0d1b2a]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="absolute left-[23px] top-[724px] w-[191px]">
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="flex h-[45px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#1e3a8a] px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1e40af] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating..." : "List Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
