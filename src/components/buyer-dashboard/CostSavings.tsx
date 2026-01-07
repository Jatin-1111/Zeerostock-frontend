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
    <div className="bg-white rounded-[11px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-[17px] h-[223px] relative overflow-hidden">
      <h2 className="text-[15px] font-semibold text-[#0d1b2a] leading-[13px] tracking-[0.3px] mb-4">
        Cost Saving
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-7">
          <Loader2 className="w-4.5 h-4.5 animate-spin text-[#1e3a8a]" />
        </div>
      ) : (
        <>
          {/* Average Cost Reduction Box */}
          <div className="bg-[#eeffef] rounded-[11px] h-[79px] w-[209px] mx-auto mb-4.5 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="flex items-center gap-[8px] mb-1.5">
              <p className="text-[20px] font-semibold text-[#2aae7a] leading-[13px] tracking-[0.3px]">
                {avgSavings}
              </p>
              <ArrowDown
                className="w-[19px] h-[19px] text-[#2aae7a]"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-[11px] font-medium text-[#9c9c9c] leading-normal">
              Avg. Cost Reduction
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-2">
            {categorySavings.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#9c9c9c] leading-normal">
                  {item.category}
                </span>
                <span className="text-[11px] font-medium text-[#2aae7a] leading-normal">
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
