import Image from "next/image";

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
  // Handle case where items might be empty or have missing data
  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-[15px] p-[20px] mb-5 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
        <h2 className="font-['Poppins'] font-medium text-[#0d1b2a] text-[18px] leading-normal mb-3">
          Order Items:
        </h2>
        <p className="font-['Inter'] font-medium text-[#9c9c9c] text-[15px]">
          Loading order items...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[15px] p-[20px] mb-5 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      <h2 className="font-['Poppins'] font-medium text-[#0d1b2a] text-[18px] leading-normal mb-3">
        Order Items:
      </h2>

      <div className="space-y-[26px]">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#fbfbfb] rounded-[15px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[11px] relative h-[176px]"
          >
            <div className="flex gap-[13px] h-full">
              {/* Product Image */}
              <div className="w-[121px] h-[91px] rounded-[8px] overflow-hidden shrink-0 bg-gray-200 relative">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name || "Product"}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gray-300">
                            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className="w-16 h-16 text-gray-400"
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
                <h3 className="font-['Inter'] font-medium text-[18px] leading-normal text-black mb-[11px]">
                  {item.name || "Product"}
                </h3>

                {/* Seller */}
                <p className="font-['Inter'] font-medium text-[15px] leading-normal text-[#9c9c9c] mb-[19px]">
                  by {item.seller || "Seller"}
                </p>

                {/* Quantity and Price */}
                <p className="font-['Inter'] font-medium text-[15px] leading-normal text-[#9c9c9c]">
                  Qty: {item.quantity || 1} / Price:{" "}
                  <span className="font-['Inter'] font-bold">₹</span>
                  {(item.price || 0).toFixed(2)}
                </p>
              </div>

              {/* Right Side - Price and Date */}
              <div className="flex flex-col items-end justify-start pt-[11px]">
                {/* Total Price */}
                <p className="font-['Inter'] font-semibold text-[23px] leading-normal text-black mb-[13px]">
                  ₹{((item.quantity || 1) * (item.price || 0)).toLocaleString()}
                </p>

                {/* Estimated Date */}
                {(item.estimatedDate || item.status) && (
                  <p className="font-['Inter'] font-medium text-[15px] leading-normal text-[#9c9c9c]">
                    Est. Date: {item.estimatedDate || item.status}
                  </p>
                )}
              </div>
            </div>

            {/* Tracking ID Section */}
            {item.trackingId && (
              <div className="absolute bottom-0 left-0 right-0 h-[51px] flex items-center px-[15px] border-t border-gray-300">
                <span className="font-['Inter'] font-medium text-[14px] leading-normal text-black">
                  Tracking ID:
                </span>
                <span className="font-['Inter'] font-medium text-[14px] leading-normal text-[#9c9c9c] ml-auto">
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
