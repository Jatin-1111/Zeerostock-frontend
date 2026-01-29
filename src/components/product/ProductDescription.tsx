"use client";

import { useState, useEffect } from "react";
import { Truck, ShieldCheck, Lock, BadgeCheck } from "lucide-react";
import { productService } from "@/services/product.service";

interface Spec {
  key: string;
  value: string;
  unit?: string;
}

interface ProductData {
  id?: string;
  description?: string;
  city?: string;
  state?: string;
  return_policy?: string;
  weight_per_unit?: string;
  weight_unit?: string;
  length_min?: string;
  length_unit?: string;
  diameter_range?: string;
  wall_thickness_range?: string;
  material_grade?: string;
  material_type?: string;
  manufacturing_process?: string;
  certifications?: string[] | string;
  [key: string]: unknown;
}

interface ProductDescriptionProps {
  product: {
    product: ProductData;
    specifications?: Record<string, Spec[]>;
    [key: string]: unknown;
  };
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  const [activeTab, setActiveTab] = useState("description");
  const productData = product.product;

  const [specifications, setSpecifications] = useState<Record<
    string,
    Spec[]
  > | null>(null);
  const [shippingOptions, setShippingOptions] = useState<unknown[] | null>(
    null,
  );
  const [isLoadingSpecs, setIsLoadingSpecs] = useState(false);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);

  // Fetch Specs and Shipping lazily on mount
  useEffect(() => {
    if (productData.id) {
      setIsLoadingSpecs(true);
      setIsLoadingShipping(true);

      const fetchDetails = async () => {
        try {
          // Parallel fetch
          const [specsRes, shippingRes] = await Promise.all([
            productService.getSpecifications(productData.id as string),
            productService.getShippingOptions(productData.id as string),
          ]);

          if (specsRes.success && specsRes.data?.specifications) {
            setSpecifications(
              specsRes.data.specifications as Record<string, Spec[]>,
            );
          }

          if (shippingRes.success && shippingRes.data?.shippingOptions) {
            setShippingOptions(shippingRes.data.shippingOptions);
          }
        } catch (err) {
          console.error("Failed to load product details lazily", err);
        } finally {
          setIsLoadingSpecs(false);
          setIsLoadingShipping(false);
        }
      };

      fetchDetails();
    }
  }, [productData.id]);

  return (
    <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* Tabs */}
      <div className="relative border-b border-gray-200">
        <div className="flex px-4 sm:px-5 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            onClick={() => setActiveTab("description")}
            className={`relative px-0 py-2 text-[12px] font-medium transition-colors ${
              activeTab === "description" ? "text-[#2aae7a]" : "text-[#0d1b2a]"
            }`}
          >
            Description
            {activeTab === "description" && (
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#2aae7a]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("specifications")}
            className={`relative ml-4 sm:ml-[26px] px-0 py-2 text-[12px] font-medium transition-colors ${
              activeTab === "specifications"
                ? "text-[#2aae7a]"
                : "text-[#0d1b2a]"
            }`}
          >
            Specifications
            {activeTab === "specifications" && (
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#2aae7a]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`relative ml-4 sm:ml-[26px] px-0 py-2 text-[12px] font-medium transition-colors ${
              activeTab === "shipping" ? "text-[#2aae7a]" : "text-[#0d1b2a]"
            }`}
          >
            Shipping & Return
            {activeTab === "shipping" && (
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#2aae7a]" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 sm:px-5 py-4">
        {activeTab === "description" && (
          <div>
            <h2 className="text-[15px] font-medium text-[#0d1b2a] mb-3">
              Product description
            </h2>
            <p className="text-[12.5px] font-normal text-[#9c9c9c] leading-[16.5px] mb-6 wrap-break-words overflow-wrap-anywhere">
              {(productData.description as string) ||
                "High-quality structural steel coils manufactured to ASTM A36 specifications. These coils are perfect for construction projects, infrastructure development, and industrial applications. All materials come with full certification and quality guarantees."}
            </p>

            {/* Trust Badges - 2 columns with 2 rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 sm:gap-x-10">
              <div className="flex items-center gap-2">
                <div className="p-1.25 bg-[#eeffef] rounded-[5px] shrink-0">
                  <Truck className="w-5 h-5 text-[#2aae7a]" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#0d1b2a] mb-0">
                    Fast Shipping
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.25 bg-[#eeffef] rounded-[5px] shrink-0">
                  <ShieldCheck
                    className="w-5 h-5 text-[#2aae7a]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#0d1b2a] mb-0">
                    Certified Materials
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.25 bg-[#eeffef] rounded-[5px] shrink-0">
                  <BadgeCheck
                    className="w-5 h-5 text-[#2aae7a]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#0d1b2a] mb-0">
                    Verified Supplier
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.25 bg-[#eeffef] rounded-[5px] shrink-0">
                  <Lock className="w-5 h-5 text-[#2aae7a]" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#0d1b2a] mb-0">
                    Secure Transactions
                  </h4>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "specifications" && (
          <div>
            <h2 className="text-[15px] font-medium text-[#0d1b2a] mb-4">
              Technical Specifications
            </h2>

            {isLoadingSpecs ? (
              <div className="flex justify-center py-6 text-[#9c9c9c]">
                Loading specifications...
              </div>
            ) : specifications && Object.keys(specifications).length > 0 ? (
              Object.entries(specifications).map(([category, specs]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="text-[13px] font-medium text-[#2aae7a] mb-2 uppercase tracking-wide">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-10">
                    {specs.map((spec, index) => (
                      <div
                        key={index}
                        className="py-2 border-b border-gray-200 flex justify-between"
                      >
                        <div className="text-[11px] font-normal text-[#9c9c9c]">
                          {spec.key}
                        </div>
                        <div className="text-[12px] font-medium text-[#0d1b2a] text-right">
                          {spec.value} {spec.unit || ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-10">
                {/* Fallback to hardcoded columns if no dynamic specs */}
                <div>
                  {productData.material_type && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Material Type
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {productData.material_type}
                      </div>
                    </div>
                  )}
                  {productData.material_grade && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Material Grade
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {productData.material_grade}
                      </div>
                    </div>
                  )}
                  {productData.diameter_range && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Diameter Range
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {productData.diameter_range} mm
                      </div>
                    </div>
                  )}
                  {productData.wall_thickness_range && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Wall Thickness
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {productData.wall_thickness_range} mm
                      </div>
                    </div>
                  )}
                </div>
                {/* Column 2 */}
                <div>
                  {productData.length_min && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Length/Size
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {productData.length_min} {productData.length_unit || ""}
                      </div>
                    </div>
                  )}
                  {productData.weight_per_unit && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Weight per unit
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {productData.weight_per_unit}{" "}
                        {productData.weight_unit || ""}
                      </div>
                    </div>
                  )}
                  {productData.manufacturing_process && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Manufacturing Process
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {productData.manufacturing_process}
                      </div>
                    </div>
                  )}
                  {productData.certifications && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Certifications
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {Array.isArray(productData.certifications)
                          ? productData.certifications.join(", ")
                          : typeof productData.certifications === "string"
                            ? JSON.parse(productData.certifications).join(", ")
                            : "N/A"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "shipping" && (
          <div>
            <h2 className="text-[15px] font-medium text-[#0d1b2a] mb-4">
              Shipping Information
            </h2>

            {isLoadingShipping ? (
              <div className="flex justify-center py-6 text-[#9c9c9c]">
                Loading shipping options...
              </div>
            ) : shippingOptions && shippingOptions.length > 0 ? (
              <div className="space-y-4 mb-6">
                {(shippingOptions as any[]).map((option, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-[13px] font-medium text-[#0d1b2a]">
                          {option.method}
                        </h4>
                        <p className="text-[11px] text-[#9c9c9c]">
                          {option.deliveryTime}
                        </p>
                      </div>
                      <div className="text-[13px] font-semibold text-[#0d1b2a]">
                        ₹{option.baseRate}
                      </div>
                    </div>
                    {option.features && (
                      <div className="flex flex-wrap gap-2">
                        {option.features.tracking && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">
                            Tracking
                          </span>
                        )}
                        {option.features.insurance && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-green-50 text-green-600 rounded">
                            Insured
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-10 mb-6">
                <div>
                  {productData.weight_per_unit && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Weight
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {productData.weight_per_unit}{" "}
                        {productData.weight_unit || ""} per unit
                      </div>
                    </div>
                  )}
                  <div className="py-2 border-b border-gray-200">
                    <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                      Shipping Cost
                    </div>
                    <div className="text-[12px] font-medium text-[#0d1b2a]">
                      Calculated at checkout
                    </div>
                  </div>
                  {productData.city && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Ships From
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {productData.city}
                        {productData.state ? `, ${productData.state}` : ""}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {(productData.diameter_range || productData.length_min) && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Dimensions
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {productData.diameter_range &&
                          `Ø ${productData.diameter_range} mm`}
                        {productData.diameter_range &&
                          productData.length_min &&
                          " × "}
                        {productData.length_min &&
                          `${productData.length_min} ${
                            productData.length_unit || ""
                          }`}
                      </div>
                    </div>
                  )}
                  <div className="py-2 border-b border-gray-200">
                    <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                      Estimated Delivery
                    </div>
                    <div className="text-[12px] font-medium text-[#0d1b2a]">
                      7-10 business days
                    </div>
                  </div>
                  {productData.return_policy && (
                    <div className="py-2 border-b border-gray-200">
                      <div className="text-[11px] font-normal text-[#9c9c9c] mb-1">
                        Return Policy
                      </div>
                      <div className="text-[12px] font-medium text-[#0d1b2a]">
                        {productData.return_policy}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
