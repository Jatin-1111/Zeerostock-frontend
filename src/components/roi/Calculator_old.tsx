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

  const calculateBuyerROI = () => {
    // Buyer ROI Formula:
    // Total Buyer Cost = (Purchase Price × Quantity) - Logistics Savings - Procurement Savings + Platform Fee
    // Total Expected Revenue = Expected Retail Price × Quantity
    // Net Profit = Total Expected Revenue - Total Buyer Cost
    // Buyer ROI (%) = (Net Profit / Total Buyer Cost) × 100
    
    const purchasePrice = parseFloat(buyerInputs.purchasePrice) || 0;
    const quantity = parseFloat(buyerInputs.quantity) || 0;
    const retailPrice = parseFloat(buyerInputs.retailPrice) || 0;
    const logisticsSavings = parseFloat(buyerInputs.logisticsSavings) || 0;
    const procurementSavings = parseFloat(buyerInputs.procurementSavings) || 0;
    const platformFee = parseFloat(buyerInputs.platformFees) || 0;
    
    const totalBuyerCost = (purchasePrice * quantity) - logisticsSavings - procurementSavings + platformFee;
    const totalExpectedRevenue = retailPrice * quantity;
    const netProfit = totalExpectedRevenue - totalBuyerCost;
    const roi = totalBuyerCost > 0 ? ((netProfit / totalBuyerCost) * 100).toFixed(1) : "0";
    
    return { roi, netProfit, totalBuyerCost, totalExpectedRevenue };
  };

  const calculateSellerROI = () => {
    // Supplier ROI Formula:
    // Baseline Holding Cost = Monthly Holding Cost × Quantity
    // Total Sale Value = Expected Retail Price × Quantity
    // Total Supplier Cost = (Purchase Price × Quantity) + Reduced Holding Cost + Marketplace Minimum Value Added + Platform Fees
    // Net Value Gained = Total Sale Value - Total Supplier Cost
    // Supplier ROI (%) = (Net Value Gained / (Purchase Price × Quantity)) × 100
    
    const purchasePrice = parseFloat(buyerInputs.purchasePrice) || 0;
    const quantity = parseFloat(buyerInputs.quantity) || 0;
    const retailPrice = parseFloat(buyerInputs.retailPrice) || 0;
    const monthlyHoldingCost = parseFloat(sellerInputs.monthlyHoldingCost) || 0;
    const reducedHoldingCost = parseFloat(sellerInputs.reducedHoldingCost) || 0;
    const marketplaceValueAdded = parseFloat(sellerInputs.marketplaceValueAdded) || 0;
    const platformFees = parseFloat(sellerInputs.platformFees) || 0;
    
    const baselineHoldingCost = monthlyHoldingCost * quantity;
    const totalSaleValue = retailPrice * quantity;
    const totalSupplierCost = (purchasePrice * quantity) + reducedHoldingCost + marketplaceValueAdded + platformFees;
    const netValueGained = totalSaleValue - totalSupplierCost;
    const baseCost = purchasePrice * quantity;
    const roi = baseCost > 0 ? ((netValueGained / baseCost) * 100).toFixed(1) : "0";
    
    return { roi, netValueGained, totalSupplierCost, totalSaleValue, baselineHoldingCost };
  };

  if (type === "buyer") {
    const results = calculateBuyerROI();

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Input Form */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="text-lg font-bold text-gray-900">
                ROI Calculator
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Enter your basic information to calculate potential returns
            </p>

            <div className="space-y-4">
              <h4 className="text-base font-bold text-gray-900">
                Basic Information
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Quantity (units)
                </label>
                <input
                  type="text"
                  value={buyerInputs.quantity}
                  onChange={(e) =>
                    setBuyerInputs({ ...buyerInputs, quantity: e.target.value })
                  }
                  placeholder="e.g., 100"
                  className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Advanced Options Collapsible */}
          <div className="border-2 border-gray-900 rounded">
            <button
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium text-gray-900">
                  Advanced Options
                </span>
              </div>
              <span className="text-gray-900">{advancedOpen ? "∧" : "∨"}</span>
            </button>

            {advancedOpen && (
              <div className="px-4 pb-4 space-y-4 border-t-2 border-gray-900">
                {/* Internal Tabs */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setAdvancedTab("buyer")}
                    className={`px-4 py-2 text-sm font-medium rounded ${
                      advancedTab === "buyer"
                        ? "bg-gray-900 text-white"
                        : "border border-gray-900 text-gray-900"
                    }`}
                  >
                    Buyer Advanced
                  </button>
                  <button
                    onClick={() => setAdvancedTab("seller")}
                    className={`px-4 py-2 text-sm font-medium rounded ${
                      advancedTab === "seller"
                        ? "bg-gray-900 text-white"
                        : "border border-gray-900 text-gray-900"
                    }`}
                  >
                    Seller Advanced
                  </button>
                </div>

                {advancedTab === "buyer" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <h4 className="text-base font-bold text-gray-900">
                        Advanced Buyer Analysis
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Logistics Savings
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
                          placeholder="e.g., 5"
                          className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Procurement Savings
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
                          placeholder="e.g., 5-5%"
                          className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
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
                        className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                    </div>
                  </div>
                )}

                {advancedTab === "seller" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">₹</span>
                      <h4 className="text-base font-bold text-gray-900">
                        Advanced Seller Analysis
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
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
                          placeholder="e.g., 100"
                          className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
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
                          className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
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
                          className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
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
                          className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Calculate and Reset Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 px-6 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Calculate ROI
            </button>
            <button className="px-6 py-2.5 border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50">
              Reset
            </button>
          </div>
        </div>

        {/* Right Side - Results & Display */}
        <div className="space-y-6">
          <div className="border-2 border-gray-900 rounded p-8 text-center h-fit">
            {parseFloat(buyerInputs.purchasePrice) > 0 && 
             parseFloat(buyerInputs.retailPrice) > 0 && 
             parseFloat(buyerInputs.quantity) > 0 ? (
              <>
                <p className="text-xs text-gray-500 text-right mb-4">
                  Buyer ROI Results
                </p>
                <div className="mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {results.roi}%
                  </div>
                  <p className="text-sm text-gray-600">Return on Investment</p>
                </div>
                
                <div className="space-y-3 text-left border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Expected Revenue:</span>
                    <span className="font-semibold text-gray-900">
                      ₹{results.totalExpectedRevenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Buyer Cost:</span>
                    <span className="font-semibold text-gray-900">
                      ₹{results.totalBuyerCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="text-gray-700 font-semibold">Net Profit:</span>
                    <span className={`font-bold ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{results.netProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-gray-500 text-right mb-4">
                  Display Results Here
                </p>
                <div className="w-32 h-32 mx-auto bg-white border-2 border-gray-900 flex items-center justify-center mb-4">
                  <svg
                    className="w-20 h-20 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-sm text-gray-600">
                  Enter your purchase details above to see detailed ROI
                  <br />
                  projections and profitability analysis.
                </p>
              </>
            )}
          </div>

          <div className="border-2 border-gray-900 rounded p-6">
            <h3 className="text-base font-bold text-gray-900 mb-4 text-center">
              Ready to get started?
            </h3>
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 border-2 border-gray-900 text-gray-900 rounded text-sm font-medium hover:bg-gray-50">
                Browse Inventory
              </button>
              <button className="flex-1 px-4 py-2 border-2 border-gray-900 text-gray-900 rounded text-sm font-medium hover:bg-gray-50">
                List Your Inventory
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not used - handled in buyer section above
  return null;
}