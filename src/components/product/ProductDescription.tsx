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
                "High-quality structural steel coils manufactured to ASTM A36 specifications. These coils are perfect for construction projects, infrastructure development, and industrial applications. All materials come with full certification and quality guarantees."}
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

            {specifications && Object.keys(specifications).length > 0 ? (
              <div className="grid grid-cols-2 gap-x-15">
                {Object.entries(specifications).map(([category, specs]) =>
                  specs.map((spec, index: number) => (
                    <div key={`${category}-${index}`}>
                      <div className="py-3 border-b border-gray-200">
                        <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                          {spec.key.replace(/_/g, " ")}
                        </div>
                        <div className="text-[18px] font-medium text-[#0d1b2a]">
                          {spec.value} {spec.unit || ""}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-15">
                <div>
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Material Grade
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      ASTM A36
                    </div>
                  </div>
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Wall Thickness
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      0.25&quot;-0.5&quot;
                    </div>
                  </div>
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Coating
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      Mill Finish
                    </div>
                  </div>
                </div>
                <div>
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Diameter Range
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      2&quot;-12&quot;
                    </div>
                  </div>
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Length
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      20ft standard
                    </div>
                  </div>
                  <div className="py-3 border-b border-gray-200">
                    <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                      Certification
                    </div>
                    <div className="text-[18px] font-medium text-[#0d1b2a]">
                      API 5L, ASTM A36
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "shipping" && (
          <div>
            <h2 className="text-[22.5px] font-medium text-[#0d1b2a] mb-6">
              Shipping Information
            </h2>

            <div className="grid grid-cols-2 gap-x-15 mb-9">
              <div>
                <div className="py-3 border-b border-gray-200">
                  <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                    Weight
                  </div>
                  <div className="text-[18px] font-medium text-[#0d1b2a]">
                    25 tons per unit
                  </div>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                    Shipping Cost
                  </div>
                  <div className="text-[18px] font-medium text-[#0d1b2a]">
                    Calculated at checkout
                  </div>
                </div>
              </div>
              <div>
                <div className="py-3 border-b border-gray-200">
                  <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                    Dimensions
                  </div>
                  <div className="text-[18px] font-medium text-[#0d1b2a]">
                    2&quot;-12&quot;
                  </div>
                </div>
                <div className="py-3 border-b border-gray-200">
                  <div className="text-[16.5px] font-normal text-[#9c9c9c] mb-1.5">
                    Estimated Delivery
                  </div>
                  <div className="text-[18px] font-medium text-[#0d1b2a]">
                    7-10 business days
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
