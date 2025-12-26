"use client";

import { useState } from "react";

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
  const hasValues =
    parseFloat(buyerInputs.purchasePrice) > 0 &&
    parseFloat(buyerInputs.retailPrice) > 0 &&
    parseFloat(buyerInputs.quantity) > 0;

  return (
    <div className="flex gap-4 w-full">
      {/* Left Side - Input Form */}
      <div className="flex-1 bg-white rounded-[15px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)] p-[23px] relative min-h-[750px]">
        <h3
          className="text-[20px] font-medium text-[#0d1b2a] mb-[15px]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          ROI Calculator
        </h3>
        <p
          className="text-[14px] font-medium text-[#9c9c9c] mb-[38px]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Calculate your return on investment for buying or selling surplus
          inventory on Zeerostocks
        </p>

        <h4
          className="text-[17px] font-semibold text-[#0d1b2a] mb-[23px]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Basic Information
        </h4>

        <div className="grid grid-cols-2 gap-[16px] mb-[47px]">
          <div>
            <label
              className="block text-[15px] font-medium text-[#9c9c9c] mb-[5px]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
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
              className="w-full h-[42px] px-[12px] py-[12px] border border-[#bebebe] rounded-[8px] text-[12px] text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>

          <div>
            <label
              className="block text-[15px] font-medium text-[#9c9c9c] mb-[5px]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
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
              className="w-full h-[42px] px-[12px] py-[12px] border border-[#bebebe] rounded-[8px] text-[12px] text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>
        </div>

        <div className="mb-[38px]">
          <label
            className="block text-[15px] font-medium text-[#9c9c9c] mb-[5px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Quantity (units)
          </label>
          <input
            type="text"
            value={buyerInputs.quantity}
            onChange={(e) =>
              setBuyerInputs({ ...buyerInputs, quantity: e.target.value })
            }
            placeholder="e.g., 1000"
            className="w-full h-[42px] px-[12px] py-[12px] border border-[#bebebe] rounded-[8px] text-[12px] text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          />
        </div>

        {/* Advanced Options */}
        <div className="mb-[20px]">
          {advancedOpen && (
            <div className="bg-white border border-[#bebebe] rounded-[15px] p-[15px] mb-[15px]">
              {/* Header with title and arrow */}
              <button
                onClick={() => setAdvancedOpen(!advancedOpen)}
                className="flex items-center justify-between w-full mb-[15px]"
              >
                <h4
                  className="text-[16.5px] font-semibold text-[#0d1b2a]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Advance Options
                </h4>
                <svg
                  className="w-[21px] h-[21px] text-[#0d1b2a] transition-transform"
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
                </svg>
              </button>

              {/* Segmented Control Tabs */}
              <div className="bg-[rgba(120,120,128,0.12)] rounded-[11px] p-[1.5px] mb-[15px] flex">
                <button
                  onClick={() => setAdvancedTab("buyer")}
                  className={`flex-1 py-[9px] rounded-[11px] text-[13px] font-semibold transition-all relative ${
                    advancedTab === "buyer" ? "text-white" : "text-[#9c9c9c]"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {advancedTab === "buyer" && (
                    <div className="absolute inset-0 bg-[#2aae7a] rounded-[11px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.12),0px_3px_1px_0px_rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.04)]"></div>
                  )}
                  <span className="relative z-10">Buyer Advance</span>
                </button>
                <button
                  onClick={() => setAdvancedTab("seller")}
                  className={`flex-1 py-[9px] rounded-[11px] text-[13px] font-semibold transition-all relative ${
                    advancedTab === "seller" ? "text-white" : "text-[#9c9c9c]"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {advancedTab === "seller" && (
                    <div className="absolute inset-0 bg-[#2aae7a] rounded-[11px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.12),0px_3px_1px_0px_rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.04)]"></div>
                  )}
                  <span className="relative z-10">Seller Advanced</span>
                </button>
              </div>

              {/* Buyer Advanced Fields */}
              {advancedTab === "buyer" && (
                <>
                  <h5
                    className="text-[15.75px] font-semibold text-[#0d1b2a] mb-[15px]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Advance Buyer Analysis
                  </h5>
                  <div className="space-y-[15px]">
                    <div className="grid grid-cols-2 gap-[26px]">
                      <div>
                        <label
                          className="block text-[15px] font-medium text-[#9c9c9c] mb-[8px]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
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
                          className="w-full h-[42px] px-[12px] py-[3px] border border-[#bebebe] rounded-[8px] text-[12px] text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                          style={{ fontFamily: "Roboto, sans-serif" }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-[15px] font-medium text-[#9c9c9c] mb-[8px]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
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
                          className="w-full h-[42px] px-[12px] py-[3px] border border-[#bebebe] rounded-[8px] text-[12px] text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                          style={{ fontFamily: "Roboto, sans-serif" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-[15px] font-medium text-[#9c9c9c] mb-[8px]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
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
                        className="w-full h-[42px] px-[12px] py-[3px] border border-[#bebebe] rounded-[8px] text-[12px] text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Seller Advanced Fields */}
              {advancedTab === "seller" && (
                <>
                  <h5
                    className="text-[15.75px] font-semibold text-[#0d1b2a] mb-[15px]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Advance Seller Analysis
                  </h5>
                  <div className="space-y-[15px]">
                    <div className="grid grid-cols-2 gap-[26px]">
                      <div>
                        <label
                          className="block text-[15px] font-medium text-[#9c9c9c] mb-[8px]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
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
                          className="w-full h-[42px] px-[12px] py-[3px] border border-[#bebebe] rounded-[8px] text-[12px] text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                          style={{ fontFamily: "Roboto, sans-serif" }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-[15px] font-medium text-[#9c9c9c] mb-[8px]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
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
                          className="w-full h-[42px] px-[12px] py-[3px] border border-[#bebebe] rounded-[8px] text-[12px] text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                          style={{ fontFamily: "Roboto, sans-serif" }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[26px]">
                      <div>
                        <label
                          className="block text-[15px] font-medium text-[#9c9c9c] mb-[8px]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Marketplace mim value added
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
                          className="w-full h-[42px] px-[12px] py-[3px] border border-[#bebebe] rounded-[8px] text-[12px] text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                          style={{ fontFamily: "Roboto, sans-serif" }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-[15px] font-medium text-[#9c9c9c] mb-[8px]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
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
                          className="w-full h-[42px] px-[12px] py-[3px] border border-[#bebebe] rounded-[8px] text-[12px] text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                          style={{ fontFamily: "Roboto, sans-serif" }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Collapsed state button */}
          {!advancedOpen && (
            <button
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="flex items-center justify-between w-full py-[8px] text-[16.5px] font-semibold text-[#0d1b2a] hover:text-[#1e3a8a] transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <span>Advance Options</span>
              <svg
                className="w-[21px] h-[21px] transition-transform rotate-180"
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
              </svg>
            </button>
          )}
        </div>

        {/* Calculate and Reset Buttons */}
        <div className="bg-white pt-[15px] pb-0">
          <div className="flex gap-[19px]">
            <button
              onClick={handleCalculate}
              className="flex-1 h-[45px] bg-[#1e3a8a] rounded-[11px] text-white text-[15px] font-semibold hover:bg-[#152e6e] transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Calculate ROI
            </button>
            <button
              onClick={handleReset}
              className="w-[150px] h-[45px] bg-white border-[0.5px] border-[#9c9c9c] rounded-[8px] text-[#9c9c9c] text-[12px] font-semibold hover:bg-gray-50 transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Results & Display */}
      <div className="flex-1 bg-white rounded-[15px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)] h-[750px] flex flex-col">
        {!isCalculated ? (
          <>
            <div className="flex-1 mx-[19px] mt-[30px] mb-[20px] border border-[#9c9c9c] flex flex-col items-center justify-center">
              <div className="w-[53px] h-[53px] bg-[#f2f2f2] rounded-[8px] p-[11px] flex items-center justify-center mb-[11px]">
                <svg
                  className="w-[30px] h-[30px]"
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
              <h3
                className="text-[17px] font-semibold text-[#9c9c9c] mb-[9px]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Ready to calculate
              </h3>
              <p
                className="text-[14px] font-medium text-[#9c9c9c] text-center max-w-[293px] px-3"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Enter your purchase details to see detailed ROI projections and
                profitability analysis
              </p>
            </div>

            <div className="px-[19px] pb-[20px]">
              <div className="border-t border-[#9c9c9c] pt-[20px]">
                <h3
                  className="text-[17px] font-medium text-[#9c9c9c] text-center mb-[27px]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Ready to get started?
                </h3>
                <div className="flex gap-[14px]">
                  <button
                    className="flex-1 h-[45px] bg-[#2aae7a] rounded-[11px] text-white text-[15px] font-medium hover:bg-[#259b6c] transition-colors"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Browse Inventory
                  </button>
                  <button
                    className="flex-1 h-[45px] border-[0.5px] border-[#1e3a8a] rounded-[8px] text-[#1e3a8a] text-[15px] font-medium hover:bg-blue-50 transition-colors"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    List Your Inventory
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-[23px] h-full flex flex-col overflow-y-auto">
            <h3
              className="text-[20px] font-semibold text-[#0d1b2a] mb-[20px]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Your ROI Results
            </h3>

            {/* ROI Percentage Display */}
            <div className="bg-gradient-to-r from-[#37c3dc] to-[#0d9e9c] rounded-[15px] p-[20px] mb-[20px]">
              <p
                className="text-[13px] font-medium text-white mb-[6px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Return on Investment
              </p>
              <div className="flex items-baseline gap-[8px]">
                <span
                  className="text-[36px] font-bold text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {results.roi}%
                </span>
                <span
                  className="text-[14px] font-medium text-white/80"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  ROI
                </span>
              </div>
            </div>

            {/* Breakdown Details */}
            <div className="space-y-[12px]">
              <div className="bg-[#f8f9fa] rounded-[11px] p-[12px]">
                <p
                  className="text-[11px] font-medium text-[#9c9c9c] mb-[4px]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {type === "buyer" ? "Total Investment" : "Total Cost"}
                </p>
                <p
                  className="text-[18px] font-semibold text-[#0d1b2a]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  ₹
                  {type === "buyer"
                    ? "totalBuyerCost" in results
                      ? results.totalBuyerCost.toLocaleString()
                      : "0"
                    : "totalSupplierCost" in results
                    ? results.totalSupplierCost.toLocaleString()
                    : "0"}
                </p>
              </div>

              <div className="bg-[#f8f9fa] rounded-[11px] p-[12px]">
                <p
                  className="text-[11px] font-medium text-[#9c9c9c] mb-[4px]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {type === "buyer" ? "Expected Revenue" : "Total Sale Value"}
                </p>
                <p
                  className="text-[18px] font-semibold text-[#0d1b2a]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  ₹
                  {type === "buyer"
                    ? "totalExpectedRevenue" in results
                      ? results.totalExpectedRevenue.toLocaleString()
                      : "0"
                    : "totalSaleValue" in results
                    ? results.totalSaleValue.toLocaleString()
                    : "0"}
                </p>
              </div>

              <div className="bg-[#2aae7a]/10 border border-[#2aae7a] rounded-[11px] p-[12px]">
                <p
                  className="text-[11px] font-medium text-[#2aae7a] mb-[4px]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {type === "buyer" ? "Net Profit" : "Net Value Gained"}
                </p>
                <p
                  className="text-[18px] font-semibold text-[#2aae7a]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  ₹
                  {type === "buyer"
                    ? "netProfit" in results
                      ? results.netProfit.toLocaleString()
                      : "0"
                    : "netValueGained" in results
                    ? results.netValueGained.toLocaleString()
                    : "0"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
