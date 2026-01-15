"use client";

import { useState } from "react";
import { Truck, ShieldCheck, Lock, BadgeCheck } from "lucide-react";

interface Spec {
  key: string;
  value: string;
  unit?: string;
}

interface ProductData {
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

  return (
    <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* Tabs */}
      <div className="relative border-b border-gray-200">
        <div className="flex px-5">
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
            className={`relative ml-[26px] px-0 py-2 text-[12px] font-medium transition-colors ${
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
            className={`relative ml-[26px] px-0 py-2 text-[12px] font-medium transition-colors ${
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
      <div className="px-5 py-4">
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
            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
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

            <div className="grid grid-cols-2 gap-x-10">
              {/* Column 1 */}
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
              {!productData.material_type &&
                !productData.material_grade &&
                !productData.diameter_range &&
                !productData.wall_thickness_range &&
                !productData.length_min &&
                !productData.weight_per_unit &&
                !productData.manufacturing_process &&
                !productData.certifications && (
                  <div className="col-span-2 text-center py-6 text-[#9c9c9c]">
                    No technical specifications available for this product.
                  </div>
                )}
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div>
            <h2 className="text-[15px] font-medium text-[#0d1b2a] mb-4">
              Shipping Information
            </h2>

            <div className="grid grid-cols-2 gap-x-10 mb-6">
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
          </div>
        )}
      </div>
    </div>
  );
}
