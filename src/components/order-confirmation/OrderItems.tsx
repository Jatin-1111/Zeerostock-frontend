import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/currency.utils";

interface OrderItem {
  id: number;
  name: string;
  seller: string;
  quantity: number;
  price: number;
  rating: number;
  status: string;
  trackingId: string;
  image?: string;
  estimatedDate?: string;
}

interface OrderItemsProps {
  items: OrderItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  const { currency } = useAuth();
  // Handle case where items might be empty or have missing data
  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-[15px] p-4 sm:p-5 md:p-[20px] lg:p-[13px] mb-4 sm:mb-5 lg:mb-3 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
        <h2 className="font-medium text-[#0d1b2a] text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal mb-2 sm:mb-3 lg:mb-2">
          Order Items:
        </h2>
        <p className="font-medium text-[#9c9c9c] text-sm sm:text-[15px] lg:text-[10px]">
          Loading order items...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[15px] p-4 sm:p-5 md:p-[20px] lg:p-[13px] mb-4 sm:mb-5 lg:mb-3 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      <h2 className="font-medium text-[#0d1b2a] text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal mb-2 sm:mb-3 lg:mb-2">
        Order Items:
      </h2>

      <div className="space-y-4 sm:space-y-5 md:space-y-[26px] lg:space-y-[17px]">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#fbfbfb] rounded-[15px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-3 sm:p-[11px] lg:p-[7px] relative min-h-[200px] sm:min-h-[180px] md:h-[176px] lg:h-[117px]"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-[13px] lg:gap-[9px] h-full pb-12 sm:pb-0">
              {/* Product Image */}
              <div className="w-full sm:w-[100px] md:w-[121px] lg:w-[81px] h-[120px] sm:h-[80px] md:h-[91px] lg:h-[61px] rounded-[8px] overflow-hidden shrink-0 bg-gray-200 relative">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name || "Product"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100px, 121px"
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gray-300">
                            <svg class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <svg
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col">
                {/* Product Name */}
                <h3 className="font-medium text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal text-black mb-2 sm:mb-[11px] lg:mb-[7px]">
                  {item.name || "Product"}
                </h3>

                {/* Seller */}
                <p className="font-medium text-sm sm:text-[15px] lg:text-[10px] leading-normal text-[#9c9c9c] mb-3 sm:mb-4 md:mb-[19px] lg:mb-[13px]">
                  by {item.seller || "Seller"}
                </p>

                {/* Quantity and Price */}
                <p className="font-medium text-sm sm:text-[15px] lg:text-[10px] leading-normal text-[#9c9c9c]">
                  Qty: {item.quantity || 1} / Price:{" "}
                  {formatPrice(item.price || 0, currency)}
                </p>
              </div>

              {/* Right Side - Price and Date */}
              <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start pt-0 sm:pt-[11px] lg:pt-[7px] gap-2 sm:gap-0">
                {/* Total Price */}
                <p className="font-semibold text-lg sm:text-xl md:text-[23px] lg:text-[15px] leading-normal text-black mb-0 sm:mb-2 md:mb-[13px] lg:mb-[9px]">
                  {formatPrice(
                    (item.quantity || 1) * (item.price || 0),
                    currency,
                  )}
                </p>

                {/* Estimated Date */}
                {(item.estimatedDate || item.status) && (
                  <p className="font-medium text-xs sm:text-sm md:text-[15px] lg:text-[10px] leading-normal text-[#9c9c9c]">
                    Est. Date: {item.estimatedDate || item.status}
                  </p>
                )}
              </div>
            </div>

            {/* Tracking ID Section */}
            {item.trackingId && (
              <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-12 md:h-[51px] lg:h-[34px] flex items-center px-3 sm:px-4 md:px-[15px] lg:px-[10px] border-t border-gray-300">
                <span className="font-medium text-xs sm:text-sm md:text-[14px] lg:text-[9px] leading-normal text-black">
                  Tracking ID:
                </span>
                <span className="font-medium text-xs sm:text-sm md:text-[14px] lg:text-[9px] leading-normal text-[#9c9c9c] ml-auto truncate max-w-[60%] sm:max-w-none">
                  {item.trackingId}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
