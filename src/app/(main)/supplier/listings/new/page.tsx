"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
  state: string;
  listingType: string;
  expiresAt: string;
  availableQuantity: string;
  minOrderQuantity: string;
  // Technical Specification
  materialType: string;
  materialGrade: string;
  diameterMin: string;
  diameterMax: string;
  wallThicknessMin: string;
  wallThicknessMax: string;
  lengthMin: string;
  lengthMax: string;
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
  const [imageUploadError, setImageUploadError] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
    // Technical Specification
    materialType: "",
    materialGrade: "",
    diameterMin: "",
    diameterMax: "",
    wallThicknessMin: "",
    wallThicknessMax: "",
    lengthMin: "",
    lengthMax: "",
    lengthUnit: "mm",
    weightPerUnit: "",
    weightUnit: "Kg",
    manufacturingProcess: "",
    // Compliance & Certification
    certifications: [],
    otherCertification: "",
  });

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await marketplaceService.getCategories();

      if (response.success && response.data?.categories) {
        setCategories(response.data.categories);
      } else {
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

  useEffect(() => {
    if (user && user.activeRole !== "supplier") {
      toast.error("Supplier access required");
      router.push("/supplier/listings");
      return;
    }
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);

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
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "priceBefore" || name === "priceAfter") {
      const before = parseFloat(
        name === "priceBefore" ? value : formData.priceBefore,
      );
      const after = parseFloat(
        name === "priceAfter" ? value : formData.priceAfter,
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

  const handleCertificationToggle = (certification: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(certification)
        ? prev.certifications.filter((c) => c !== certification)
        : [...prev.certifications, certification],
    }));
  };

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
        `You can only upload a maximum of 10 images. You currently have ${currentImageCount} image(s). You tried to add ${newImageCount} more.`,
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
        ", ",
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
        },
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
          } uploaded successfully`,
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
          },
        );

        if (!response.ok) {
          console.error("Failed to delete image from S3");
        }
      }

      setUploadedImages((prev) =>
        prev.filter((_, index) => index !== indexToRemove),
      );

      setFormData((prev) => {
        if (prev.imageUrl === imageToRemove.url) {
          const remaining = uploadedImages.filter(
            (_, idx) => idx !== indexToRemove,
          );
          return {
            ...prev,
            imageUrl: remaining[0]?.url || "",
            galleryImages: remaining.slice(1).map((img) => img.url),
          };
        } else {
          return {
            ...prev,
            galleryImages: prev.galleryImages.filter(
              (url) => url !== imageToRemove.url,
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
        }`,
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
        state: "",
        listingType: formData.listingType as
          | "auction"
          | "fixed"
          | "negotiable"
          | undefined,
        expiresAt: expiresAt || undefined,
        // Technical Specification fields
        materialType: formData.materialType || undefined,
        materialGrade: formData.materialGrade || undefined,
        diameterRange: formData.diameterMin || undefined,
        wallThicknessRange: formData.wallThicknessMin || undefined,
        lengthMin: formData.lengthMin || undefined,
        lengthUnit: formData.lengthUnit || undefined,
        weightPerUnit: formData.weightPerUnit || undefined,
        weightUnit: formData.weightUnit || undefined,
        manufacturingProcess: formData.manufacturingProcess || undefined,
        // Compliance & Certification fields
        certifications: formData.certifications || [],
        otherCertification: formData.otherCertification || undefined,
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
            "Validation failed. Please check your inputs.",
        );
      } else if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(
          err?.message || "Failed to create listing. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEFBF6]">
      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-lg"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-[90vh] max-w-[90vw] rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container - 75% scale via smaller max-width and padding */}
      <div className="mx-auto max-w-[1080px] px-3 sm:px-8 md:px-12 lg:px-[60px] py-4 sm:py-5 md:py-[22px]">
        {/* Page Title - 75% of original */}
        <h1 className="mb-2 sm:mb-[11px] text-lg sm:text-[20px] md:text-2xl font-semibold leading-normal sm:leading-[40px] text-[#0d1b2a]">
          My Inventory
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-6 md:space-y-[30px]"
        >
          {/* Basic Information Section */}
          <FormSection title="Basic Information">
            <div className="space-y-4 sm:space-y-5 md:space-y-[20px]">
              {/* Row 1: Product Title & Listing Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-[11px]">
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
                  placeholder="Select Category"
                  required={true}
                  isOpen={openDropdown === "listingType"}
                  onToggle={() => toggleDropdown("listingType")}
                />
              </div>

              {/* Row 2: Category & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-[11px]">
                <CustomDropdown
                  label="Category"
                  name="categoryId"
                  value={formData.categoryId}
                  options={categories.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                  }))}
                  onSelect={handleDropdownSelect}
                  placeholder={categoriesLoading ? "Loading..." : "Select Unit"}
                  required={true}
                  disabled={categoriesLoading}
                  isOpen={openDropdown === "category"}
                  onToggle={() =>
                    !categoriesLoading && toggleDropdown("category")
                  }
                  error={validationErrors.categoryId}
                />

                <CustomDropdown
                  label="Condition"
                  name="condition"
                  value={formData.condition}
                  options={CONDITION_OPTIONS}
                  onSelect={handleDropdownSelect}
                  placeholder="Select industry"
                  required={true}
                  isOpen={openDropdown === "condition"}
                  onToggle={() => toggleDropdown("condition")}
                />
              </div>

              {/* Row 3: Location, Quantity, Units */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-[11px]">
                <FormInput
                  label="Location"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="eg., Within 100 km of mumbai"
                  required={true}
                  error={validationErrors.city}
                />

                <FormInput
                  label="Quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="eg., 20,000 - 50,000"
                  type="number"
                  required={true}
                  error={validationErrors.quantity}
                />

                <CustomDropdown
                  label="Units"
                  name="unit"
                  value={formData.unit}
                  options={UNIT_OPTIONS}
                  onSelect={handleDropdownSelect}
                  placeholder="dd-mm-yy"
                  required={true}
                  isOpen={openDropdown === "unit"}
                  onToggle={() => toggleDropdown("unit")}
                />
              </div>

              {/* Row 4: Price & Listing Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-[11px]">
                <FormInput
                  label="Price"
                  name="priceAfter"
                  value={formData.priceAfter}
                  onChange={handleInputChange}
                  placeholder="eg., 500"
                  type="number"
                  required={true}
                  error={validationErrors.priceAfter}
                />

                <FormInput
                  label="Listing Duration"
                  name="expiresAt"
                  value={formData.expiresAt}
                  onChange={handleInputChange}
                  type="date"
                  required={true}
                />
              </div>

              {/* Row 5: Product Description */}
              <FormInput
                label="Product description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your specific requirements, quality standards, certifications needed etc."
                multiline={true}
                rows={4}
                error={validationErrors.description}
              />
            </div>
          </FormSection>

          {/* Technical Specification Section */}
          <FormSection title="Technical Specification">
            <div className="space-y-4 sm:space-y-5 md:space-y-[20px]">
              {/* Row 1: Material Type & Material Grade/Standard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-[11px]">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-[11px]">
                <FormInput
                  label="Diameter Range (Min-Max) (in mm)"
                  name="diameterMin"
                  value={formData.diameterMin}
                  onChange={handleInputChange}
                  placeholder="eg., 200-400"
                  type="number"
                />

                <FormInput
                  label="Wall Thickness (Min-Max) (in mm)"
                  name="wallThicknessMin"
                  value={formData.wallThicknessMin}
                  onChange={handleInputChange}
                  placeholder="eg., 5-10"
                  type="number"
                />
              </div>

              {/* Row 3: Length/Size Range, Weight per unit, Manufacturing Process */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-[11px]">
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
            <div className="space-y-4 sm:space-y-5 md:space-y-[20px]">
              <div>
                <label className="mb-[9px] block text-[12px] font-medium text-[#0d1b2a]">
                  Available Certification
                </label>
                <div className="space-y-[12px]">
                  {/* Row 1 */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-[20px]">
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-[20px]">
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
              className="h-9 sm:h-10 md:h-[40px] w-32 sm:w-36 md:w-[150px] rounded-[8px] bg-[#1e3a8a] text-[9px] sm:text-[10px] font-semibold text-white hover:bg-[#1e40af] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating..." : "List Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
