"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";

interface ProductInfoProps {
  product: {
    product: {
      [key: string]: unknown;
    };
    reviewStats?: {
      [key: string]: unknown;
    };
    auction?: {
      [key: string]: unknown;
    };
    isWatching?: boolean;
  };
}

export default function ProductInfo({ product: data }: ProductInfoProps) {
  const router = useRouter();
  const { addToCart } = useCartStore();
  const product = data.product;
  const auction = data.auction;

  const [bidAmount, setBidAmount] = useState(
    (auction?.current_bid as number) || (product.price as number)
  );
  const [quantity, setQuantity] = useState(
    (product.minimum_order_quantity as number) || 1
  );
  const [message, setMessage] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isAuction = product.listing_type === "auction";
  const estimatedTotal = bidAmount * quantity;
  const minimumIncrement = (auction?.min_increment as number) || 20000;
  const productStock = (product.quantity as number) || 0;
  const minOrderQty = (product.minimum_order_quantity as number) || 1;

  const handleAddToCart = async () => {
    console.log("=== Add to Cart clicked ===");
    console.log("Product ID:", product.id);
    console.log("Quantity:", quantity);
    console.log("Stock:", productStock);

    // Validation
    if (!product.id) {
      console.error("Product ID is missing!");
      setMessage("Invalid product");
      return;
    }

    if (isAuction) {
      setMessage("Auction items cannot be added to cart");
      return;
    }

    if (quantity < minOrderQty) {
      setMessage(`Minimum order quantity is ${minOrderQty}`);
      return;
    }

    if (productStock > 0 && quantity > productStock) {
      setMessage(`Only ${productStock} units available`);
      return;
    }

    setIsAddingToCart(true);
    setMessage("");

    try {
      const result = await addToCart(product.id as string, quantity);
      console.log("Add to cart result:", result);

      if (!result) {
        setMessage("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("An error occurred");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    console.log("=== Buy Now clicked ===");
    console.log("Product ID:", product.id);
    console.log("Quantity:", quantity);

    // Validation
    if (!product.id) {
      console.error("Product ID is missing!");
      setMessage("Invalid product");
      return;
    }

    if (isAuction) {
      setMessage("Auction items cannot be purchased directly");
      return;
    }

    if (quantity < minOrderQty) {
      setMessage(`Minimum order quantity is ${minOrderQty}`);
      return;
    }

    if (productStock > 0 && quantity > productStock) {
      setMessage(`Only ${productStock} units available`);
      return;
    }

    setIsAddingToCart(true);
    setMessage("");

    try {
      const result = await addToCart(product.id as string, quantity);
      console.log("Buy now add to cart result:", result);

      if (result) {
        router.push("/buyer/cart");
      } else {
        setMessage("Failed to add to cart");
        setIsAddingToCart(false);
      }
    } catch (error) {
      console.error("Error in buy now:", error);
      setMessage("An error occurred");
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] p-6 h-fit">
      {/* Title */}
      <h1 className="text-[25.5px] font-semibold text-[#1e3a8a] leading-normal mb-3">
        {product.title as string}
      </h1>

      {/* Badges */}
      <div className="flex items-center gap-2.25 mb-4.5">
        <span className="px-2.25 py-0.75 bg-[#eeffef] text-[#2aae7a] text-[11.25px] font-medium rounded-[60px]">
          {(product.category as { name?: string })?.name || "Materials"}
        </span>
        {isAuction && (
          <span className="px-2.25 py-0.75 bg-[#eeffef] text-[#2aae7a] text-[11.25px] font-medium rounded-[60px]">
            Auction
          </span>
        )}
        <span className="px-2.25 py-0.75 bg-[#eeffef] text-[#2aae7a] text-[11.25px] font-medium rounded-[60px] capitalize">
          {product.condition as string}
        </span>
      </div>

      {/* Price */}
      <div className="mb-4.5">
        <div className="flex items-baseline gap-3 mb-1.5">
          <span className="text-[30px] font-semibold text-[#0d1b2a]">
            {formatPrice(product.price as number)}
          </span>
          {(() => {
            if (
              product.original_price &&
              typeof product.original_price === "number" &&
              typeof product.price === "number" &&
              product.original_price > product.price
            ) {
              return (
                <span className="text-[18px] font-medium text-[#bebebe] line-through">
                  {formatPrice(product.original_price)}
                </span>
              );
            }
            return null;
          })()}
        </div>
        <p className="text-[18px] font-medium text-[#bebebe] tracking-[0.375px]">
          per {(product.unit as string) || "unit"} /{" "}
          {(product.stock_quantity as number) ||
            (product.quantity as number) ||
            0}{" "}
          {(product.unit as string) || "units"} available
        </p>
      </div>

      {/* Minimum Bid for Auction */}
      {isAuction && (
        <p className="text-[15px] font-medium text-[#bebebe] tracking-[0.375px] mb-4.5">
          minimum bid{" "}
          {formatPrice(
            (auction?.current_bid as number) || (product.price as number)
          )}
        </p>
      )}

      {/* Watching Section */}
      {/* <div className="flex items-center gap-2.25 mb-4.5">
        <Eye className="w-4.5 h-4.5 text-[#bebebe]" />
        <span className="text-[18px] font-medium text-[#0d1b2a]">
          Watching:{" "}
          <span className="font-semibold">
            {(product.views as number) || 47}
          </span>
        </span>
      </div> */}

      {/* Action Buttons */}
      {!isAuction && (
        <div className="space-y-2.25">
          <button
            onClick={handleBuyNow}
            disabled={isAddingToCart}
            className="w-full bg-[#1e3a8a] text-white text-[15px] font-semibold py-3 rounded-[7.5px] hover:bg-[#1e3a8a]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? "Adding..." : "Buy Now"}
          </button>
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] text-[15px] font-semibold py-3 rounded-[7.5px] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      )}

      {/* Place Your Bid Section */}
      {isAuction && (
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Place Your Bid
          </h3>

          {/* Bid Amount */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bid Amount (per tona)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                ₹
              </span>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                min={
                  (auction?.current_bid as number) || (product.price as number)
                }
                step={minimumIncrement}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum increment: ₹{minimumIncrement.toLocaleString()}
            </p>
          </div>

          {/* Quantity */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity (tona)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              min={(product.minimum_order_quantity as number) || 1}
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Sales team (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any specific requirements or questions"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none h-20"
            />
          </div>

          {/* Estimated Total */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Estimated Total:
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(estimatedTotal)}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              {quantity} tona x {formatPrice(bidAmount)}
            </p>
          </div>

          {/* Place Bid Button */}
          <button className="w-full bg-white border-2 border-gray-900 text-gray-900 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors mb-3 flex items-center justify-center gap-2">
            <span>₹</span>
            <span>Place Bid</span>
          </button>
        </div>
      )}
    </div>
  );
}
