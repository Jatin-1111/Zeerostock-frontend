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
  const specifications = product.specifications;

  return (
    <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* Tabs */}
      <div className="relative border-b border-gray-200">
        <div className="flex px-7.5">
          <button
            onClick={() => setActiveTab("description")}
            className={`relative px-0 py-3 text-[21px] font-medium transition-colors ${
              activeTab === "description" ? "text-[#2aae7a]" : "text-[#0d1b2a]"
            }`}
          >
            Description
            {activeTab === "description" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.25px] bg-[#2aae7a]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("specifications")}
            className={`relative ml-[52.5px] px-0 py-3 text-[21px] font-medium transition-colors ${
              activeTab === "specifications"
                ? "text-[#2aae7a]"
                : "text-[#0d1b2a]"
            }`}
          >
            Specifications
            {activeTab === "specifications" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.25px] bg-[#2aae7a]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`relative ml-[52.5px] px-0 py-3 text-[21px] font-medium transition-colors ${
              activeTab === "shipping" ? "text-[#2aae7a]" : "text-[#0d1b2a]"
            }`}
          >
            Shipping & Return
            {activeTab === "shipping" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.25px] bg-[#2aae7a]" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-7.5 py-6">
        {activeTab === "description" && (
          <div>
            <h2 className="text-[22.5px] font-medium text-[#0d1b2a] mb-4.5">
              Product description
            </h2>
            <p className="text-[18.75px] font-normal text-[#9c9c9c] leading-[24.75px] mb-9 wrap-break-words overflow-wrap-anywhere">
              {(productData.description as string) ||
                "No description available for this product."}
            </p>

            {/* Trust Badges - 2 columns with 2 rows */}
            <div className="grid grid-cols-2 gap-x-15 gap-y-9">
              <div className="flex items-start gap-3">
                <div className="p-1.875 bg-[#eeffef] rounded-[7.5px] shrink-0">
                  <Truck
                    className="w-7.5 h-7.5 text-[#2aae7a]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="text-[19.5px] font-medium text-[#0d1b2a] mb-0">
                    Fast Shipping
                  </h4>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.875 bg-[#eeffef] rounded-[7.5px] shrink-0">
                  <ShieldCheck
                    className="w-7.5 h-7.5 text-[#2aae7a]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="text-[19.5px] font-medium text-[#0d1b2a] mb-0">
                    Certified Materials
                  </h4>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.875 bg-[#eeffef] rounded-[7.5px] shrink-0">
                  <BadgeCheck
                    className="w-7.5 h-7.5 text-[#2aae7a]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="text-[19.5px] font-medium text-[#0d1b2a] mb-0">
                    Verified Supplier
                  </h4>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.875 bg-[#eeffef] rounded-[7.5px] shrink-0">
                  <Lock
                    className="w-7.5 h-7.5 text-[#2aae7a]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="text-[19.5px] font-medium text-[#0d1b2a] mb-0">
                    Secure Transactions
                  </h4>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "specifications" && (
          <div>
            <h2 className="text-[22.5px] font-medium text-[#0d1b2a] mb-6">
              Technical Specifications
            </h2>

            <div className="grid grid-cols-2 gap-x-15">
              {/* Column 1 */}
              <div>
                {productData.material_type && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Material Type
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      {productData.material_type}
                    </div>
                  </div>
                )}
                {productData.material_grade && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Material Grade
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      {productData.material_grade}
                    </div>
                  </div>
                )}
                {productData.diameter_range && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Diameter Range
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      {productData.diameter_range} mm
                    </div>
                  </div>
                )}
                {productData.wall_thickness_range && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Wall Thickness
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      {productData.wall_thickness_range} mm
                    </div>
                  </div>
                )}
              </div>
              {/* Column 2 */}
              <div>
                {productData.length_min && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Length/Size
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      {productData.length_min} {productData.length_unit || ""}
                    </div>
                  </div>
                )}
                {productData.weight_per_unit && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Weight per unit
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      {productData.weight_per_unit}{" "}
                      {productData.weight_unit || ""}
                    </div>
                  </div>
                )}
                {productData.manufacturing_process && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Manufacturing Process
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      {productData.manufacturing_process}
                    </div>
                  </div>
                )}
                {productData.certifications && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Certifications
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
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
            <h2 className="text-[22.5px] font-medium text-[#0d1b2a] mb-6">
              Shipping Information
            </h2>

            <div className="grid grid-cols-2 gap-x-15 mb-9">
              <div>
                {productData.weight_per_unit && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Weight
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      {productData.weight_per_unit}{" "}
                      {productData.weight_unit || ""} per unit
                    </div>
                  </div>
                )}
                <div className="py-3 border-b border-gray-200">
                  <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                    Shipping Cost
                  </div>
                  <div className="text-[18px] font-medium text-[#0d1b2a]">
                    Calculated at checkout
                  </div>
                </div>
                {productData.city && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Ships From
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      {productData.city}
                      {productData.state ? `, ${productData.state}` : ""}
                    </div>
                  </div>
                )}
              </div>
              <div>
                {(productData.diameter_range || productData.length_min) && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Dimensions
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
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
                <div className="py-3 border-b border-gray-200">
                  <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                    Estimated Delivery
                  </div>
                  <div className="text-[18px] font-medium text-[#0d1b2a]">
                    7-10 business days
                  </div>
                </div>
                {productData.return_policy && (
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Return Policy
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
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
