"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowDown } from "lucide-react";

interface CategorySavings {
  category: string;
  percentage: string;
}

export default function CostSavings() {
  const [avgSavings, setAvgSavings] = useState("-23%");
  const [categorySavings, setCategorySavings] = useState<CategorySavings[]>([
    { category: "Electronics", percentage: "-15%" },
    { category: "Automotive", percentage: "-15%" },
    { category: "Medical", percentage: "-15%" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        setIsLoading(true);
        const token =
          localStorage.getItem("zeerostock_access_token") ||
          localStorage.getItem("token");
        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${apiBaseUrl}/buyer/savings`, {
          credentials: "include",
          headers,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Savings data:", data);

          if (data.success && data.data) {
            setAvgSavings(data.data.averageSavings || "0%");
            if (
              data.data.categorySavings &&
              data.data.categorySavings.length > 0
            ) {
              setCategorySavings(data.data.categorySavings);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching savings data:", err);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavings();
  }, []);

  return (
    <div className="bg-white rounded-[15px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] p-[22px] h-[297px] relative overflow-hidden">
      <h2 className="text-[20px] font-semibold text-[#0d1b2a] leading-[18px] tracking-[0.4px] mb-5">
        Cost Saving
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-9">
          <Loader2 className="w-6 h-6 animate-spin text-[#1e3a8a]" />
        </div>
      ) : (
        <>
          {/* Average Cost Reduction Box */}
          <div className="bg-[#eeffef] rounded-[15px] h-[105px] w-[278px] mx-auto mb-6 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="flex items-center gap-[11px] mb-2">
              <p className="text-[27px] font-semibold text-[#2aae7a] leading-[18px] tracking-[0.4px]">
                {avgSavings}
              </p>
              <ArrowDown
                className="w-[26px] h-[26px] text-[#2aae7a]"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-[15px] font-medium text-[#9c9c9c] leading-normal">
              Avg. Cost Reduction
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-3">
            {categorySavings.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-[15px] font-medium text-[#9c9c9c] leading-normal">
                  {item.category}
                </span>
                <span className="text-[15px] font-medium text-[#2aae7a] leading-normal">
                  {item.percentage}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
