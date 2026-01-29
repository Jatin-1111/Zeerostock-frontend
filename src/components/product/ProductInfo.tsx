"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { buyerService } from "@/services/buyer.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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
  const { isAuthenticated } = useAuth();
  const product = data.product;
  const auction = data.auction;

  const [bidAmount, setBidAmount] = useState(
    (auction?.current_bid as number) || (product.price as number),
  );
  const [quantity, setQuantity] = useState(
    (product.minimum_order_quantity as number) || 1,
  );
  const [message, setMessage] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(data.isWatching || false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

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
  const handleToggleWishlist = async () => {
    // Check authentication
    if (!isAuthenticated) {
      toast.error("Please login to add items to your wishlist");
      router.push("/login");
      return;
    }

    // Validate product ID
    if (!product.id) {
      toast.error("Invalid product");
      return;
    }

    setIsTogglingWishlist(true);

    try {
      if (isWatchlisted) {
        // Remove from wishlist
        const response = await buyerService.removeFromWatchlist(
          product.id as string,
        );

        if (response.success) {
          setIsWatchlisted(false);
          toast.success("Item removed from your wishlist");
        } else {
          toast.error(response.message || "Failed to remove from wishlist");
        }
      } else {
        // Add to wishlist
        const response = await buyerService.addToWatchlist({
          productId: product.id as string,
        });

        if (response.success) {
          setIsWatchlisted(true);
          toast.success("Item added to your wishlist");
        } else {
          toast.error(response.message || "Failed to add to wishlist");
        }
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error("An error occurred");
    } finally {
      setIsTogglingWishlist(false);
    }
  };
  const handleAddToCart = async () => {
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

    // Check if product is out of stock
    if (productStock === 0) {
      setMessage("This product is currently out of stock");
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

    // Check if product is out of stock
    if (productStock === 0) {
      setMessage("This product is currently out of stock");
      return;
    }

    if (productStock > 0 && quantity > productStock) {
      setMessage(`Only ${productStock} units available`);
      return;
    }

    setIsAddingToCart(true);
    setMessage("");

    try {
      // Pass true to skip refresh for faster redirection
      const result = await addToCart(product.id as string, quantity, true);
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
    <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-4 h-fit">
      {/* Title with Wishlist Button */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h1 className="text-base sm:text-[17px] font-semibold text-[#1e3a8a] leading-normal flex-1">
          {product.title as string}
        </h1>
        <button
          onClick={handleToggleWishlist}
          disabled={isTogglingWishlist}
          className="shrink-0 p-1.33 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          aria-label={
            isWatchlisted ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isWatchlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-400 group-hover:text-red-500"
            }`}
          />
        </button>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className="px-1.5 py-0.5 bg-[#eeffef] text-[#2aae7a] text-[7.5px] font-medium rounded-[60px]">
          {(product.category as { name?: string })?.name || "Materials"}
        </span>
        {isAuction && (
          <span className="px-1.5 py-0.5 bg-[#eeffef] text-[#2aae7a] text-[7.5px] font-medium rounded-[60px]">
            Auction
          </span>
        )}
        <span className="px-1.5 py-0.5 bg-[#eeffef] text-[#2aae7a] text-[7.5px] font-medium rounded-[60px] capitalize">
          {product.condition as string}
        </span>
      </div>

      {/* Price */}
      <div className="mb-3">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl sm:text-[20px] font-semibold text-[#0d1b2a]">
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
                <span className="text-[12px] font-medium text-[#bebebe] line-through">
                  {formatPrice(product.original_price)}
                </span>
              );
            }
            return null;
          })()}
        </div>
        <p className="text-[12px] font-medium text-[#bebebe] tracking-[0.25px]">
          per {(product.unit as string) || "unit"} /{" "}
          {(product.stock_quantity as number) ||
            (product.quantity as number) ||
            0}{" "}
          {(product.unit as string) || "units"} available
        </p>
      </div>

      {/* Minimum Bid for Auction */}
      {isAuction && (
        <p className="text-[10px] font-medium text-[#bebebe] tracking-[0.25px] mb-3">
          minimum bid{" "}
          {formatPrice(
            (auction?.current_bid as number) || (product.price as number),
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
        <div className="space-y-1.5">
          {productStock === 0 ? (
            <div className="w-full bg-gray-100 text-gray-500 text-xs sm:text-[10px] font-semibold py-3 sm:py-2 rounded-[5px] text-center">
              Out of Stock
            </div>
          ) : (
            <>
              <button
                onClick={handleBuyNow}
                disabled={isAddingToCart || productStock === 0}
                className="w-full bg-[#1e3a8a] text-white text-xs sm:text-[10px] font-semibold py-3 sm:py-2 rounded-[5px] hover:bg-[#1e3a8a]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? "Adding..." : "Buy Now"}
              </button>
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || productStock === 0}
                className="w-full bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] text-xs sm:text-[10px] font-semibold py-3 sm:py-2 rounded-[5px] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>
            </>
          )}
        </div>
      )}

      {/* Place Your Bid Section */}
      {isAuction && (
        <div className="mb-2.67">
          <h3 className="text-[10.67px] font-semibold text-gray-900 mb-2.67">
            Place Your Bid
          </h3>

          {/* Bid Amount */}
          <div className="mb-2">
            <label className="block text-[9.33px] font-medium text-gray-700 mb-1.33">
              Bid Amount (per tona)
            </label>
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600">
                ₹
              </span>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="w-full pl-5.33 pr-2.67 py-1.33 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                min={
                  (auction?.current_bid as number) || (product.price as number)
                }
                step={minimumIncrement}
              />
            </div>
            <p className="text-[8px] text-gray-500 mt-0.67">
              Minimum increment: ₹{minimumIncrement.toLocaleString()}
            </p>
          </div>

          {/* Quantity */}
          <div className="mb-2">
            <label className="block text-[9.33px] font-medium text-gray-700 mb-1.33">
              Quantity (tona)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-2.67 py-1.33 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              min={(product.minimum_order_quantity as number) || 1}
            />
          </div>

          {/* Message */}
          <div className="mb-2.67">
            <label className="block text-[9.33px] font-medium text-gray-700 mb-1.33">
              Message Sales team (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any specific requirements or questions"
              className="w-full px-2.67 py-1.33 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none h-13.33"
            />
          </div>

          {/* Estimated Total */}
          <div className="bg-gray-50 rounded-lg p-2.67 mb-2.67">
            <div className="flex items-center justify-between mb-0.67">
              <span className="text-[9.33px] font-medium text-gray-700">
                Estimated Total:
              </span>
              <span className="text-[16px] font-bold text-gray-900">
                {formatPrice(estimatedTotal)}
              </span>
            </div>
            <p className="text-[8px] text-gray-600">
              {quantity} tona x {formatPrice(bidAmount)}
            </p>
          </div>

          {/* Place Bid Button */}
          <button className="w-full bg-white border-2 border-gray-900 text-gray-900 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors mb-2 flex items-center justify-center gap-1.33">
            <span>₹</span>
            <span>Place Bid</span>
          </button>
        </div>
      )}
    </div>
  );
}
