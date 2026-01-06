"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supplierService } from "@/services/supplier.service";
import { marketplaceService } from "@/services/marketplace.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  FormSection,
  FormInput,
  CustomDropdown,
  CertificationCheckbox,
  ImageUpload,
  UnitInput,
} from "@/components/supplier/listings";
import {
  LISTING_TYPE_OPTIONS,
  CONDITION_OPTIONS,
  UNIT_OPTIONS,
  MATERIAL_TYPE_OPTIONS,
  MANUFACTURING_PROCESS_OPTIONS,
  LENGTH_UNIT_OPTIONS,
  WEIGHT_UNIT_OPTIONS,
  CERTIFICATION_OPTIONS,
} from "@/components/supplier/listings/constants";

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
  listingType: string;
  expiresAt: string;
  availableQuantity: string;
  minOrderQuantity: string;
  // Technical Specification
  materialType: string;
  materialGrade: string;
  diameterRange: string;
  wallThicknessRange: string;
  lengthMin: string;
  lengthUnit: string;
  weightPerUnit: string;
  weightUnit: string;
  manufacturingProcess: string;
  // Compliance & Certification
  certifications: string[];
  otherCertification: string;
}

interface Category {
  id: string;
  name: string;
}

export default function EditListing() {
  const router = useRouter();
  const params = useParams();
  const listingId = params?.id as string;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<
    Array<{ url: string; fileKey: string }>
  >([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUploadError, setImageUploadError] = useState("");
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
    listingType: "fixed",
    expiresAt: "",
    availableQuantity: "",
    minOrderQuantity: "1",
    // Technical Specification
    materialType: "",
    materialGrade: "",
    diameterRange: "",
    wallThicknessRange: "",
    lengthMin: "",
    lengthUnit: "meters",
    weightPerUnit: "",
    weightUnit: "Kg",
    manufacturingProcess: "",
    // Compliance & Certification
    certifications: [],
    otherCertification: "",
  });

  useEffect(() => {
    // Check if user is supplier
    if (user && user.activeRole !== "supplier") {
      toast.error("Supplier access required");
      router.push("/supplier/listings");
      return;
    }
    fetchCategories();
    if (listingId) {
      fetchListingData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router, listingId]);

  const fetchListingData = async () => {
    try {
      setLoadingData(true);
      const response = await supplierService.getListingById(listingId);

      if (response.success && response.data) {
        const listing = response.data;

        // Parse expires_at to date input format (YYYY-MM-DD)
        let expiresAtFormatted = "";
        if (listing.expires_at) {
          const date = new Date(listing.expires_at);
          expiresAtFormatted = date.toISOString().split("T")[0];
        }

        setFormData({
          title: listing.title || "",
          description: listing.description || "",
          categoryId: listing.category_id?.toString() || "",
          priceBefore: listing.price_before?.toString() || "",
          priceAfter: listing.price_after?.toString() || "",
          discountPercent: listing.discount_percent?.toString() || "",
          imageUrl: listing.image_url || "",
          galleryImages: listing.gallery_images
            ? typeof listing.gallery_images === "string"
              ? JSON.parse(listing.gallery_images)
              : listing.gallery_images
            : [],
          condition: listing.condition || "good",
          quantity: listing.quantity?.toString() || "1",
          unit: listing.unit || "pieces",
          city: listing.city || "",
          listingType: listing.listing_type || "fixed",
          expiresAt: expiresAtFormatted,
          availableQuantity: listing.available_quantity?.toString() || "",
          minOrderQuantity: listing.min_order_quantity?.toString() || "1",
          // Technical Specification
          materialType: listing.material_type || "",
          materialGrade: listing.material_grade || "",
          diameterRange: listing.diameter_range || "",
          wallThicknessRange: listing.wall_thickness_range || "",
          lengthMin: listing.length_min || "",
          lengthUnit: listing.length_unit || "meters",
          weightPerUnit: listing.weight_per_unit || "",
          weightUnit: listing.weight_unit || "Kg",
          manufacturingProcess: listing.manufacturing_process || "",
          // Compliance & Certification
          certifications: listing.certifications
            ? typeof listing.certifications === "string"
              ? JSON.parse(listing.certifications)
              : listing.certifications
            : [],
          otherCertification: listing.other_certification || "",
        });

        // Set uploaded images
        const images: Array<{ url: string; fileKey: string }> = [];
        if (listing.image_url) {
          images.push({
            url: listing.image_url,
            fileKey: listing.image_url.split("/").pop() || "",
          });
        }
        if (listing.gallery_images) {
          const gallery =
            typeof listing.gallery_images === "string"
              ? JSON.parse(listing.gallery_images)
              : listing.gallery_images;
          gallery.forEach((url: string) => {
            images.push({
              url,
              fileKey: url.split("/").pop() || "",
            });
          });
        }
        setUploadedImages(images);
      } else {
        toast.error("Unable to load listing details");
        router.push("/supplier/listings");
      }
    } catch (error) {
      console.error("Error fetching listing:", error);
      toast.error("Failed to load listing. Please try again.");
      router.push("/supplier/listings");
    } finally {
      setLoadingData(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await marketplaceService.getCategories();

      if (response.success && response.data?.categories) {
        setCategories(response.data.categories);
      } else {
        console.warn("No categories data received:", response);
        setCategories(getFallbackCategories());
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories. Using default categories.");
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

  const handleCertificationToggle = (certValue: string) => {
    setFormData((prev) => {
      const currentCerts = prev.certifications || [];
      if (currentCerts.includes(certValue)) {
        return {
          ...prev,
          certifications: currentCerts.filter((cert) => cert !== certValue),
        };
      } else {
        return {
          ...prev,
          certifications: [...currentCerts, certValue],
        };
      }
    });
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
    const currentImageCount = uploadedImages.length;
    const newImageCount = files.length;
    const totalImages = currentImageCount + newImageCount;

    if (totalImages > 10) {
      toast.error(
        `You can only upload a maximum of 10 images. You currently have ${currentImageCount} image(s). You tried to add ${newImageCount} more.`
      );
      return;
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const invalidFiles: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        invalidFiles.push(`${file.name} (${fileSizeMB}MB)`);
      }
    });

    if (invalidFiles.length > 0) {
      const errorMsg = `The following file(s) exceed the 10MB size limit:\n${invalidFiles.join(
        ", "
      )}`;
      setImageUploadError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setUploadingImages(true);
    setImageUploadError("");

    try {
      const formDataToSend = new FormData();

      Array.from(files).forEach((file) => {
        formDataToSend.append("images", file);
      });

      const TOKEN_KEY =
        process.env.NEXT_PUBLIC_JWT_TOKEN_KEY || "zeerostock_access_token";
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error("Authentication required. Please login again.");
      }

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
        if (errorData.message && errorData.message.includes("File too large")) {
          throw new Error("One or more files exceed the 10MB size limit");
        }
        throw new Error(errorData.message || "Upload failed");
      }

      const data = await response.json();

      if (data.success && data.data.images) {
        interface S3Image {
          url: string;
          fileKey: string;
        }
        const images = data.data.images.map((img: S3Image) => ({
          url: img.url,
          fileKey: img.fileKey,
        }));

        setUploadedImages((prev) => [...prev, ...images]);

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
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setImageUploadError(`Upload failed: ${errorMessage}`);
      toast.error(`Upload failed: ${errorMessage}`);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleImageUpload = (files: FileList) => {
    uploadToS3(files);
  };

  const handleImagePreview = (url: string) => {
    setPreviewImage(url);
  };

  const handleRemoveImage = async (indexToRemove: number) => {
    const imageToRemove = uploadedImages[indexToRemove];

    try {
      const TOKEN_KEY =
        process.env.NEXT_PUBLIC_JWT_TOKEN_KEY || "zeerostock_access_token";
      const token = localStorage.getItem(TOKEN_KEY);

      if (token && imageToRemove.fileKey) {
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

      setUploadedImages((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );

      setFormData((prev) => {
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
      let expiresAt = null;
      if (formData.expiresAt) {
        const expiryDate = new Date(formData.expiresAt);
        expiryDate.setHours(23, 59, 59, 999);
        expiresAt = expiryDate.toISOString();
      }

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
        listingType: formData.listingType as
          | "auction"
          | "fixed"
          | "negotiable"
          | undefined,
        expiresAt: expiresAt || undefined,
        // Technical Specification fields
        materialType: formData.materialType || undefined,
        materialGrade: formData.materialGrade || undefined,
        diameterRange: formData.diameterRange || undefined,
        wallThicknessRange: formData.wallThicknessRange || undefined,
        lengthMin: formData.lengthMin || undefined,
        lengthUnit: formData.lengthUnit || undefined,
        weightPerUnit: formData.weightPerUnit || undefined,
        weightUnit: formData.weightUnit || undefined,
        manufacturingProcess: formData.manufacturingProcess || undefined,
        // Compliance & Certification fields
        certifications: formData.certifications || [],
        otherCertification: formData.otherCertification || undefined,
      };

      const response = await supplierService.updateListing(
        listingId,
        submitData
      );

      if (response.success) {
        toast.success("Your listing has been updated successfully");
        router.push("/supplier/listings");
      } else {
        toast.error(response.message || "Failed to update listing");
      }
    } catch (error) {
      console.error("Error updating listing:", error);
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
          err?.message || "Failed to update listing. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-[#EEFBF6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEFBF6]">
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

      <div className="mx-auto max-w-[1080px] px-[60px] py-[22px]">
        <h1 className="mb-[11px] text-[20px] font-semibold leading-[40px] text-[#0d1b2a]">
          Edit Product Listing
        </h1>

        <form onSubmit={handleSubmit} className="space-y-[30px]">
          {/* Basic Information Section */}
          <FormSection title="Basic Information">
            <div className="space-y-[20px]">
              {/* Row 1: Product Title & Listing Type */}
              <div className="grid grid-cols-2 gap-[11px]">
                <FormInput
                  label="Product Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="eg., Industrial Electronic Components"
                  required={true}
                  error={validationErrors.title}
                />

                <CustomDropdown
                  label="Listing Type"
                  name="listingType"
                  value={formData.listingType}
                  options={LISTING_TYPE_OPTIONS}
                  onSelect={handleDropdownSelect}
                  placeholder="Select Type"
                  required={true}
                  isOpen={openDropdown === "listingType"}
                  onToggle={() => toggleDropdown("listingType")}
                />
              </div>

              {/* Row 2: Category & Condition */}
              <div className="grid grid-cols-2 gap-[11px]">
                <CustomDropdown
                  label="Category"
                  name="categoryId"
                  value={formData.categoryId}
                  options={categories.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                  }))}
                  onSelect={handleDropdownSelect}
                  placeholder={
                    categoriesLoading ? "Loading..." : "Select category"
                  }
                  required={true}
                  error={validationErrors.categoryId}
                  isOpen={openDropdown === "category"}
                  onToggle={() =>
                    !categoriesLoading && toggleDropdown("category")
                  }
                  disabled={categoriesLoading}
                />

                <CustomDropdown
                  label="Condition"
                  name="condition"
                  value={formData.condition}
                  options={CONDITION_OPTIONS}
                  onSelect={handleDropdownSelect}
                  placeholder="Select Condition"
                  required={true}
                  isOpen={openDropdown === "condition"}
                  onToggle={() => toggleDropdown("condition")}
                />
              </div>

              {/* Row 3: Quantity, Unit, Price */}
              <div className="grid grid-cols-3 gap-[11px]">
                <FormInput
                  label="Quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter quantity"
                  type="number"
                  required={true}
                  error={validationErrors.quantity}
                />

                <CustomDropdown
                  label="Unit"
                  name="unit"
                  value={formData.unit}
                  options={UNIT_OPTIONS}
                  onSelect={handleDropdownSelect}
                  placeholder="Select Unit"
                  required={true}
                  isOpen={openDropdown === "unit"}
                  onToggle={() => toggleDropdown("unit")}
                />

                <FormInput
                  label="Price"
                  name="priceAfter"
                  value={formData.priceAfter}
                  onChange={handleInputChange}
                  placeholder="₹ 0.00"
                  type="number"
                  required={true}
                  error={validationErrors.priceAfter}
                />
              </div>

              {/* Row 4: Location & Listing Duration */}
              <div className="grid grid-cols-2 gap-[11px]">
                <FormInput
                  label="Location"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="eg., Mumbai"
                  required={true}
                  error={validationErrors.city}
                />

                <FormInput
                  label="Listing Duration"
                  name="expiresAt"
                  value={formData.expiresAt}
                  onChange={handleInputChange}
                  placeholder="Select duration"
                  type="date"
                />
              </div>

              {/* Row 5: Product Description */}
              <FormInput
                label="Product Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your specific requirements, quality standards, certifications needed etc."
                required={true}
                error={validationErrors.description}
                multiline={true}
                rows={4}
              />
            </div>
          </FormSection>

          {/* Technical Specification Section */}
          <FormSection title="Technical Specification">
            <div className="space-y-[20px]">
              {/* Row 1: Material Type & Material Grade/Standard */}
              <div className="grid grid-cols-2 gap-[11px]">
                <CustomDropdown
                  label="Material Type"
                  name="materialType"
                  value={formData.materialType}
                  options={MATERIAL_TYPE_OPTIONS}
                  onSelect={handleDropdownSelect}
                  placeholder="Select material"
                  required={true}
                  isOpen={openDropdown === "materialType"}
                  onToggle={() => toggleDropdown("materialType")}
                />

                <FormInput
                  label="Material Grade / Standard"
                  name="materialGrade"
                  value={formData.materialGrade}
                  onChange={handleInputChange}
                  placeholder="eg., SS304 A36,ASTM A06"
                />
              </div>

              {/* Row 2: Diameter Range & Wall Thickness */}
              <div className="grid grid-cols-2 gap-[11px]">
                <FormInput
                  label="Diameter Range (Min-Max) (in mm)"
                  name="diameterRange"
                  value={formData.diameterRange}
                  onChange={handleInputChange}
                  placeholder="eg., 200-400"
                />

                <FormInput
                  label="Wall Thickness (Min-Max) (in mm)"
                  name="wallThicknessRange"
                  value={formData.wallThicknessRange}
                  onChange={handleInputChange}
                  placeholder="eg., 5-10"
                />
              </div>

              {/* Row 3: Length/Size Range, Weight per unit, Manufacturing Process */}
              <div className="grid grid-cols-3 gap-[11px]">
                <UnitInput
                  label="Length / Size Range"
                  name="lengthMin"
                  value={formData.lengthMin}
                  onChange={handleInputChange}
                  placeholder="Value"
                  unitName="lengthUnit"
                  unitValue={formData.lengthUnit || "mm"}
                  unitOptions={LENGTH_UNIT_OPTIONS}
                  onUnitSelect={handleDropdownSelect}
                  required={true}
                  isOpen={openDropdown === "lengthUnit"}
                  onToggle={() => toggleDropdown("lengthUnit")}
                  unitWidth="90px"
                />

                <UnitInput
                  label="Weight per unit"
                  name="weightPerUnit"
                  value={formData.weightPerUnit}
                  onChange={handleInputChange}
                  placeholder="Value"
                  unitName="weightUnit"
                  unitValue={formData.weightUnit || "Kg"}
                  unitOptions={WEIGHT_UNIT_OPTIONS}
                  onUnitSelect={handleDropdownSelect}
                  required={true}
                  isOpen={openDropdown === "weightUnit"}
                  onToggle={() => toggleDropdown("weightUnit")}
                  unitWidth="70px"
                />

                <CustomDropdown
                  label="Manufacturing Process"
                  name="manufacturingProcess"
                  value={formData.manufacturingProcess}
                  options={MANUFACTURING_PROCESS_OPTIONS}
                  onSelect={handleDropdownSelect}
                  placeholder="Select Process"
                  isOpen={openDropdown === "manufacturingProcess"}
                  onToggle={() => toggleDropdown("manufacturingProcess")}
                />
              </div>
            </div>
          </FormSection>

          {/* Compliance & Certification Section */}
          <FormSection title="Compliance & Certification">
            <div className="space-y-[20px]">
              <div>
                <label className="mb-[9px] block text-[12px] font-medium text-[#0d1b2a]">
                  Available Certification
                </label>
                <div className="space-y-[12px]">
                  {/* Row 1 */}
                  <div className="grid grid-cols-4 gap-[20px]">
                    {CERTIFICATION_OPTIONS.slice(0, 4).map((cert) => (
                      <CertificationCheckbox
                        key={cert}
                        label={cert}
                        value={cert}
                        checked={formData.certifications.includes(cert)}
                        onChange={handleCertificationToggle}
                      />
                    ))}
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-4 gap-[20px]">
                    {CERTIFICATION_OPTIONS.slice(4).map((cert) => (
                      <CertificationCheckbox
                        key={cert}
                        label={cert}
                        value={cert}
                        checked={formData.certifications.includes(cert)}
                        onChange={handleCertificationToggle}
                      />
                    ))}

                    <div className="col-span-2">
                      <FormInput
                        label=""
                        name="otherCertification"
                        value={formData.otherCertification}
                        onChange={handleInputChange}
                        placeholder="Other (Please Specify)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FormSection>

          {/* Product Images Section */}
          <FormSection title="Product Images">
            <ImageUpload
              uploadedImages={uploadedImages}
              uploading={uploadingImages}
              error={imageUploadError}
              onUpload={handleImageUpload}
              onRemove={handleRemoveImage}
              onPreview={handleImagePreview}
              fileInputRef={fileInputRef}
            />
          </FormSection>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="h-[45px] w-[191px] rounded-[8px] bg-[#1e3a8a] text-[12px] font-semibold text-white hover:bg-[#1e40af] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
