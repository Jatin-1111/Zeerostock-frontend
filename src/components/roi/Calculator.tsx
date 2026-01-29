"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CalculatorProps {
  type: "buyer" | "seller";
}

export default function Calculator({ type }: CalculatorProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [advancedTab, setAdvancedTab] = useState<"buyer" | "seller">("buyer");

  const [buyerInputs, setBuyerInputs] = useState({
    purchasePrice: "",
    retailPrice: "",
    quantity: "",
    logisticsSavings: "",
    procurementSavings: "",
    platformFees: "",
  });

  const [sellerInputs, setSellerInputs] = useState({
    monthlyHoldingCost: "",
    reducedHoldingCost: "",
    marketplaceValueAdded: "",
    platformFees: "",
  });

  const [isCalculated, setIsCalculated] = useState(false);

  const calculateBuyerROI = () => {
    const purchasePrice = parseFloat(buyerInputs.purchasePrice) || 0;
    const quantity = parseFloat(buyerInputs.quantity) || 0;
    const retailPrice = parseFloat(buyerInputs.retailPrice) || 0;
    const logisticsSavings = parseFloat(buyerInputs.logisticsSavings) || 0;
    const procurementSavings = parseFloat(buyerInputs.procurementSavings) || 0;
    const platformFee = parseFloat(buyerInputs.platformFees) || 0;

    const totalBuyerCost =
      purchasePrice * quantity -
      logisticsSavings -
      procurementSavings +
      platformFee;
    const totalExpectedRevenue = retailPrice * quantity;
    const netProfit = totalExpectedRevenue - totalBuyerCost;
    const roi =
      totalBuyerCost > 0
        ? ((netProfit / totalBuyerCost) * 100).toFixed(1)
        : "0";

    return { roi, netProfit, totalBuyerCost, totalExpectedRevenue };
  };

  const calculateSellerROI = () => {
    const purchasePrice = parseFloat(buyerInputs.purchasePrice) || 0;
    const quantity = parseFloat(buyerInputs.quantity) || 0;
    const retailPrice = parseFloat(buyerInputs.retailPrice) || 0;
    const monthlyHoldingCost = parseFloat(sellerInputs.monthlyHoldingCost) || 0;
    const reducedHoldingCost = parseFloat(sellerInputs.reducedHoldingCost) || 0;
    const marketplaceValueAdded =
      parseFloat(sellerInputs.marketplaceValueAdded) || 0;
    const platformFees = parseFloat(sellerInputs.platformFees) || 0;

    const baselineHoldingCost = monthlyHoldingCost * quantity;
    const totalSaleValue = retailPrice * quantity;
    const totalSupplierCost =
      purchasePrice * quantity +
      reducedHoldingCost +
      marketplaceValueAdded +
      platformFees;
    const netValueGained = totalSaleValue - totalSupplierCost;
    const baseCost = purchasePrice * quantity;
    const roi =
      baseCost > 0 ? ((netValueGained / baseCost) * 100).toFixed(1) : "0";

    return {
      roi,
      netValueGained,
      totalSupplierCost,
      totalSaleValue,
      baselineHoldingCost,
    };
  };

  const handleReset = () => {
    setBuyerInputs({
      purchasePrice: "",
      retailPrice: "",
      quantity: "",
      logisticsSavings: "",
      procurementSavings: "",
      platformFees: "",
    });
    setSellerInputs({
      monthlyHoldingCost: "",
      reducedHoldingCost: "",
      marketplaceValueAdded: "",
      platformFees: "",
    });
    setIsCalculated(false);
  };

  const handleCalculate = () => {
    if (
      parseFloat(buyerInputs.purchasePrice) > 0 &&
      parseFloat(buyerInputs.retailPrice) > 0 &&
      parseFloat(buyerInputs.quantity) > 0
    ) {
      setIsCalculated(true);
    }
  };

  const results = type === "buyer" ? calculateBuyerROI() : calculateSellerROI();

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-[11px] w-full">
      {/* Left Side - Input Form */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="flex-1 bg-white rounded-[10px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)] p-4 md:p-[15px] flex flex-col"
      >
        <div className="flex-1">
          <h3 className="text-[13px] font-semibold text-[#0d1b2a] mb-[10px]">
            ROI Calculator
          </h3>
          <p className="text-[9px] font-normal text-[#9c9c9c] mb-[20px]">
            Calculate your return on investment for buying or selling surplus
            inventory on Zeerostocks
          </p>

          <h4 className="text-[11px] font-semibold text-[#0d1b2a] mb-[13px]">
            Basic Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px] mb-[16px]">
            <div>
              <label className="block text-xs md:text-[10px] font-medium text-[#9c9c9c] mb-[5px]">
                Purchase Price (per unit)
              </label>
              <input
                type="text"
                value={buyerInputs.purchasePrice}
                onChange={(e) =>
                  setBuyerInputs({
                    ...buyerInputs,
                    purchasePrice: e.target.value,
                  })
                }
                placeholder="e.g., 50"
                className="w-full h-10 md:h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-[13px] md:text-[9px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#2aae7a] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs md:text-[10px] font-medium text-[#9c9c9c] mb-[5px]">
                Expected Retail Price
              </label>
              <input
                type="text"
                value={buyerInputs.retailPrice}
                onChange={(e) =>
                  setBuyerInputs({
                    ...buyerInputs,
                    retailPrice: e.target.value,
                  })
                }
                placeholder="e.g., 80"
                className="w-full h-10 md:h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-[13px] md:text-[9px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#2aae7a] focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-[20px]">
            <label className="block text-[10px] font-medium text-[#9c9c9c] mb-[5px]">
              Quantity (units)
            </label>
            <input
              type="text"
              value={buyerInputs.quantity}
              onChange={(e) =>
                setBuyerInputs({ ...buyerInputs, quantity: e.target.value })
              }
              placeholder="e.g., 1000"
              className="w-full h-10 md:h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-[13px] md:text-[9px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#2aae7a] focus:border-transparent"
            />
          </div>

          {/* Advanced Options Toggle */}
          <div className="mb-[13px]">
            <button
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="flex items-center justify-between w-full py-2 md:py-[5px] text-sm md:text-[11px] font-semibold text-[#0d1b2a] hover:text-[#1e3a8a] transition-colors"
            >
              <span>Advance Options</span>
              <motion.svg
                animate={{ rotate: advancedOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-[14px] h-[14px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            {/* Advanced Options Expanded */}
            <AnimatePresence>
              {advancedOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-white border border-[#bebebe] rounded-[10px] p-[13px] mt-[10px]">
                    {/* Segmented Control */}
                    <div className="bg-[rgba(229,231,235,1)] rounded-[7px] p-[1px] mb-[13px] flex gap-[1px]">
                      <button
                        onClick={() => setAdvancedTab("buyer")}
                        className={`flex-1 py-2 md:py-[5px] rounded-[6px] text-xs md:text-[9px] font-semibold transition-all ${
                          advancedTab === "buyer"
                            ? "bg-[#2aae7a] text-white shadow-[0px_3px_8px_0px_rgba(0,0,0,0.12)]"
                            : "text-[#9c9c9c] hover:text-[#0d1b2a]"
                        }`}
                      >
                        Buyer Advance
                      </button>
                      <button
                        onClick={() => setAdvancedTab("seller")}
                        className={`flex-1 py-2 md:py-[5px] rounded-[6px] text-xs md:text-[9px] font-semibold transition-all ${
                          advancedTab === "seller"
                            ? "bg-[#2aae7a] text-white shadow-[0px_3px_8px_0px_rgba(0,0,0,0.12)]"
                            : "text-[#9c9c9c] hover:text-[#0d1b2a]"
                        }`}
                      >
                        Seller Advanced
                      </button>
                    </div>

                    {/* Buyer Advanced Fields */}
                    {advancedTab === "buyer" && (
                      <>
                        <h5 className="text-[11px] font-semibold text-[#0d1b2a] mb-[10px]">
                          Advance Buyer Analysis
                        </h5>
                        <div className="space-y-[10px]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px]">
                            <div>
                              <label className="block text-[10px] font-medium text-[#9c9c9c] mb-[5px]">
                                Logistics Saving
                              </label>
                              <input
                                type="text"
                                value={buyerInputs.logisticsSavings}
                                onChange={(e) =>
                                  setBuyerInputs({
                                    ...buyerInputs,
                                    logisticsSavings: e.target.value,
                                  })
                                }
                                placeholder="e.g., 1500"
                                className="w-full h-10 md:h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-[13px] md:text-[9px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#2aae7a] focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-medium text-[#9c9c9c] mb-[5px]">
                                Procurement Saving
                              </label>
                              <input
                                type="text"
                                value={buyerInputs.procurementSavings}
                                onChange={(e) =>
                                  setBuyerInputs({
                                    ...buyerInputs,
                                    procurementSavings: e.target.value,
                                  })
                                }
                                placeholder="e.g., 2-5%"
                                className="w-full h-10 md:h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-[13px] md:text-[9px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#2aae7a] focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-medium text-[#9c9c9c] mb-[5px]">
                              Platform Fees
                            </label>
                            <input
                              type="text"
                              value={buyerInputs.platformFees}
                              onChange={(e) =>
                                setBuyerInputs({
                                  ...buyerInputs,
                                  platformFees: e.target.value,
                                })
                              }
                              placeholder="e.g., 500"
                              className="w-full h-10 md:h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-[13px] md:text-[9px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#2aae7a] focus:border-transparent"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Seller Advanced Fields */}
                    {advancedTab === "seller" && (
                      <>
                        <h5 className="text-[11px] font-semibold text-[#0d1b2a] mb-[10px]">
                          Advance Seller Analysis
                        </h5>
                        <div className="space-y-[10px]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px]">
                            <div>
                              <label className="block text-[10px] font-medium text-[#9c9c9c] mb-[5px]">
                                Monthly Holding Cost (per unit)
                              </label>
                              <input
                                type="text"
                                value={sellerInputs.monthlyHoldingCost}
                                onChange={(e) =>
                                  setSellerInputs({
                                    ...sellerInputs,
                                    monthlyHoldingCost: e.target.value,
                                  })
                                }
                                placeholder="e.g., 200"
                                className="w-full h-10 md:h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-[13px] md:text-[9px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#2aae7a] focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-medium text-[#9c9c9c] mb-[5px]">
                                Reduced Holding Cost
                              </label>
                              <input
                                type="text"
                                value={sellerInputs.reducedHoldingCost}
                                onChange={(e) =>
                                  setSellerInputs({
                                    ...sellerInputs,
                                    reducedHoldingCost: e.target.value,
                                  })
                                }
                                placeholder="e.g., 1500"
                                className="w-full h-10 md:h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-[13px] md:text-[9px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#2aae7a] focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px]">
                            <div>
                              <label className="block text-[10px] font-medium text-[#9c9c9c] mb-[5px]">
                                Marketplace min value added
                              </label>
                              <input
                                type="text"
                                value={sellerInputs.marketplaceValueAdded}
                                onChange={(e) =>
                                  setSellerInputs({
                                    ...sellerInputs,
                                    marketplaceValueAdded: e.target.value,
                                  })
                                }
                                placeholder="e.g., 10%"
                                className="w-full h-10 md:h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-[13px] md:text-[9px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#2aae7a] focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-medium text-[#9c9c9c] mb-[5px]">
                                Platform Fees
                              </label>
                              <input
                                type="text"
                                value={sellerInputs.platformFees}
                                onChange={(e) =>
                                  setSellerInputs({
                                    ...sellerInputs,
                                    platformFees: e.target.value,
                                  })
                                }
                                placeholder="e.g., 500"
                                className="w-full h-10 md:h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-[13px] md:text-[9px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#2aae7a] focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Calculate and Reset Buttons - Sticky Bottom */}
        <div className="pt-[13px] mt-auto">
          <div className="flex gap-[13px]">
            <button
              onClick={handleCalculate}
              className="flex-1 h-10 md:h-[30px] bg-[#1e3a8a] rounded-[7px] text-white text-xs md:text-[10px] font-semibold hover:bg-[#152e6e] transition-colors"
            >
              Calculate ROI
            </button>
            <button
              onClick={handleReset}
              className="w-[100px] h-10 md:h-[30px] bg-white border border-[#9c9c9c] rounded-[5px] text-[#9c9c9c] text-xs md:text-[10px] font-semibold hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Results & Display */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="flex-1 bg-white rounded-[10px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)] flex flex-col"
      >
        {!isCalculated ? (
          <>
            <div className="flex-1 mx-[13px] mt-[20px] mb-[13px] border border-[#bebebe] rounded-[5px] flex flex-col items-center justify-center px-[20px]">
              <div className="w-[35px] h-[35px] bg-[#f2f2f2] rounded-[5px] flex items-center justify-center mb-[10px]">
                <svg
                  className="w-[20px] h-[20px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 2H15C16.1046 2 17 2.89543 17 4V20C17 21.1046 16.1046 22 15 22H9C7.89543 22 7 21.1046 7 20V4C7 2.89543 7.89543 2 9 2Z"
                    stroke="#9c9c9c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 18H14"
                    stroke="#9c9c9c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 5H13"
                    stroke="#9c9c9c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-sm md:text-[11px] font-semibold text-[#9c9c9c] mb-[6px]">
                Ready to calculate
              </h3>
              <p className="text-xs md:text-[9px] font-normal text-[#9c9c9c] text-center max-w-[187px]">
                Enter your purchase details to see detailed ROI projections and
                profitability analysis
              </p>
            </div>

            <div className="px-[13px] pb-[13px]">
              <div className="border-t border-[#bebebe] pt-[13px]">
                <h3 className="text-sm md:text-[11px] font-normal text-[#9c9c9c] text-center mb-[13px]">
                  Ready to get started?
                </h3>
                <div className="flex gap-[9px]">
                  <button
                    onClick={() => (window.location.href = "/marketplace")}
                    className="flex-1 h-10 md:h-[30px] bg-[#2aae7a] rounded-[7px] text-white text-xs md:text-[10px] font-semibold hover:bg-[#259b6c] transition-colors"
                  >
                    Browse Inventory
                  </button>
                  <button
                    onClick={() => (window.location.href = "/become-supplier")}
                    className="flex-1 h-10 md:h-[30px] border border-[#1e3a8a] rounded-[5px] text-[#1e3a8a] text-xs md:text-[10px] font-semibold hover:bg-blue-50 transition-colors"
                  >
                    List Your Inventory
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-[15px] h-full flex flex-col">
            <h3 className="text-[13px] font-semibold text-[#0d1b2a] mb-[13px]">
              Your ROI Results
            </h3>

            {/* ROI Percentage Display */}
            <div className="bg-gradient-to-r from-[#37c3dc] to-[#0d9e9c] rounded-[10px] p-[16px] mb-[13px]">
              <p className="text-[11px] md:text-[9px] font-normal text-white mb-[5px]">
                Return on Investment
              </p>
              <div className="flex items-baseline gap-[5px]">
                <span className="text-[28px] font-bold text-white leading-none">
                  {results.roi}%
                </span>
                <span className="text-sm md:text-[11px] font-normal text-white/90">
                  ROI
                </span>
              </div>
            </div>

            {/* Breakdown Details */}
            <div className="space-y-[10px]">
              <div className="bg-[#f8f9fa] rounded-[7px] p-[11px]">
                <p className="text-[9px] font-normal text-[#9c9c9c] mb-[4px]">
                  {type === "buyer" ? "Total Investment" : "Total Cost"}
                </p>
                <p className="text-[13px] font-semibold text-[#0d1b2a]">
                  ₹
                  {type === "buyer"
                    ? "totalBuyerCost" in results
                      ? results.totalBuyerCost.toLocaleString("en-IN")
                      : "0"
                    : "totalSupplierCost" in results
                      ? results.totalSupplierCost.toLocaleString("en-IN")
                      : "0"}
                </p>
              </div>

              <div className="bg-[#f8f9fa] rounded-[7px] p-[11px]">
                <p className="text-[9px] font-normal text-[#9c9c9c] mb-[4px]">
                  {type === "buyer" ? "Expected Revenue" : "Total Sale Value"}
                </p>
                <p className="text-[13px] font-semibold text-[#0d1b2a]">
                  ₹
                  {type === "buyer"
                    ? "totalExpectedRevenue" in results
                      ? results.totalExpectedRevenue.toLocaleString("en-IN")
                      : "0"
                    : "totalSaleValue" in results
                      ? results.totalSaleValue.toLocaleString("en-IN")
                      : "0"}
                </p>
              </div>

              <div className="bg-[#2aae7a]/10 border border-[#2aae7a] rounded-[7px] p-[11px]">
                <p className="text-[9px] font-normal text-[#2aae7a] mb-[4px]">
                  {type === "buyer" ? "Net Profit" : "Net Value Gained"}
                </p>
                <p className="text-[13px] font-semibold text-[#2aae7a]">
                  ₹
                  {type === "buyer"
                    ? "netProfit" in results
                      ? results.netProfit.toLocaleString("en-IN")
                      : "0"
                    : "netValueGained" in results
                      ? results.netValueGained.toLocaleString("en-IN")
                      : "0"}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
