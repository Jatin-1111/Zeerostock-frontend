"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { buyerService } from "@/services/buyer.service";
import { Order, OrderTracking } from "@/types/buyer.types";
import {
  ArrowLeft,
  MapPin,
  RefreshCw,
  Calendar,
  Truck,
  Check,
  ExternalLink,
  FileText,
  Share2,
  Send,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

// Define tracking step type
interface TrackingStep {
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  status: "completed" | "current" | "pending";
}

export default function TrackOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch order data
  const fetchOrderData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await buyerService.getOrderById(orderId);

      if (response.success && response.data) {
        setOrder(response.data);
      } else {
        setError("Failed to load order details");
        toast.error("Failed to load order details");
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("Failed to load order");
      toast.error("Failed to load order details");
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchOrderData();
    }
  }, [orderId, fetchOrderData]);

  // Transform tracking data to tracking steps
  const getTrackingSteps = (): TrackingStep[] => {
    if (!order) return [];

    // Default tracking steps based on order status
    const defaultSteps: TrackingStep[] = [
      {
        title: "Order Placed",
        description: "Your order has been confirmed and payment received",
        timestamp: order.createdAt,
        location: "Online",
        status: "completed",
      },
      {
        title: "Processing",
        description: "Items being prepared for shipment",
        timestamp: "",
        location: "Warehouse",
        status: "pending",
      },
      {
        title: "Shipped",
        description: `Package handed to carrier ${order.shippingPartner || ""}`,
        timestamp: "",
        location: "",
        status: "pending",
      },
      {
        title: "In Transit",
        description: "Package arrived at distribution facility",
        timestamp: "",
        location: "",
        status: "pending",
      },
      {
        title: "Out for Delivery",
        description: "Package will be out for delivery",
        timestamp: "",
        location: "Local Facility",
        status: "pending",
      },
      {
        title: "Delivered",
        description: "Estimated delivery date",
        timestamp: order.deliveryEta || "",
        location:
          order.shippingAddress?.city + ", " + order.shippingAddress?.state,
        status: "pending",
      },
    ];

    // If we have tracking data, use it to update the steps
    if (order.tracking && order.tracking.length > 0) {
      const statusMap: Record<string, number> = {
        order_placed: 0,
        pending: 0,
        confirmed: 0,
        processing: 1,
        shipped: 2,
        in_transit: 3,
        out_for_delivery: 4,
        delivered: 5,
      };

      const currentStatusIndex = statusMap[order.status] ?? 0;

      return defaultSteps.map((step, index) => {
        const trackingMatch = order.tracking?.find(
          (t: OrderTracking) =>
            t.title.toLowerCase().includes(step.title.toLowerCase()) ||
            t.status
              .toLowerCase()
              .includes(step.title.toLowerCase().replace(" ", "_"))
        );

        let status: "completed" | "current" | "pending" = "pending";
        if (index < currentStatusIndex) {
          status = "completed";
        } else if (index === currentStatusIndex) {
          status = "current";
        }

        return {
          ...step,
          timestamp: trackingMatch?.timestamp || step.timestamp,
          location: trackingMatch?.location || step.location,
          description: trackingMatch?.description || step.description,
          status,
        };
      });
    }

    // Mark steps based on order status
    const statusMap: Record<string, number> = {
      pending: 0,
      confirmed: 0,
      processing: 1,
      shipped: 2,
      in_transit: 3,
      out_for_delivery: 4,
      delivered: 5,
    };

    const currentStatusIndex = statusMap[order.status] ?? 0;

    return defaultSteps.map((step, index) => ({
      ...step,
      status:
        index < currentStatusIndex
          ? "completed"
          : index === currentStatusIndex
          ? "current"
          : "pending",
    }));
  };

  // Get current location from tracking
  const getCurrentLocation = (): string => {
    if (!order) return "";
    if (order.tracking && order.tracking.length > 0) {
      return order.tracking[order.tracking.length - 1].location || "";
    }
    return "";
  };

  // Get last updated timestamp
  const getLastUpdated = (): string => {
    if (!order) return "";
    if (order.tracking && order.tracking.length > 0) {
      return new Date(
        order.tracking[order.tracking.length - 1].timestamp
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
    return new Date(order.updatedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format date only
  const formatDate = (timestamp: string): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Download invoice handler
  const handleDownloadInvoice = async () => {
    if (!order) return;
    try {
      const blob = await buyerService.downloadInvoice(order.orderId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${order.orderNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Invoice has been downloaded successfully");
    } catch (err) {
      console.error("Error downloading invoice:", err);
      toast.error("Failed to download invoice");
    }
  };

  // Get status badge color
  const getStatusBgColor = (status: string): string => {
    const colors: Record<string, string> = {
      pending: "bg-orange-500",
      confirmed: "bg-[#2aae7a]",
      processing: "bg-orange-500",
      shipped: "bg-[#1e3a8a]",
      in_transit: "bg-[#1e3a8a]",
      out_for_delivery: "bg-[#2aae7a]",
      delivered: "bg-[#2aae7a]",
      cancelled: "bg-red-500",
    };
    return colors[status] || "bg-gray-400";
  };

  // Format status for display
  const formatStatus = (status: string): string => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#eefbf6] px-3 sm:px-4 md:px-6 py-6 sm:py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 sm:w-9 sm:h-9 border-3 border-[#2aae7a] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-[#0d1b2a]">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#eefbf6] px-3 sm:px-4 md:px-6 py-6 sm:py-8 flex flex-col items-center justify-center">
        <p className="text-xs sm:text-sm text-red-500 mb-4">
          {error || "Order not found"}
        </p>
        <button
          onClick={() => router.push("/buyer/track-order")}
          className="px-4 sm:px-5 py-2 bg-[#1e3a8a] text-white border-none rounded-[11px] text-xs sm:text-sm cursor-pointer hover:bg-[#152e6b]"
        >
          Track Another Order
        </button>
      </div>
    );
  }

  const trackingSteps = getTrackingSteps();
  const currentLocation = getCurrentLocation();
  const lastUpdated = getLastUpdated();

  return (
    <div className="min-h-screen bg-[#eefbf6] px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      {/* Back Navigation */}
      <Link
        href="/buyer/track-order"
        className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#0d1b2a] no-underline mb-3 sm:mb-4"
      >
        <ArrowLeft
          size={18}
          className="sm:w-[21px] sm:h-[21px]"
          color="#0d1b2a"
        />
        <span>Track another order</span>
      </Link>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div>
          <h1 className="font-semibold text-xl sm:text-2xl md:text-[28px] lg:text-[30px] text-[#0d1b2a] m-0 leading-normal">
            Order #{order.orderNumber}
          </h1>
          <p className="font-normal text-sm sm:text-base text-[#9c9c9c] mt-2 sm:mt-3 mb-0">
            Placed on {new Date(order.createdAt).toLocaleDateString("en-GB")}
          </p>
        </div>
        <div
          className={`${getStatusBgColor(
            order.status
          )} rounded-[8px] px-2.5 sm:px-3 py-1.5 sm:py-2`}
        >
          <span className="font-medium text-xs sm:text-sm text-white">
            {formatStatus(order.status)}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 sm:gap-5 md:gap-6 max-w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {/* Current Status Card */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5 md:p-6 relative">
            {/* Truck Icon */}
            <div className="absolute left-4 sm:left-5 md:left-6 top-4 sm:top-5 md:top-6 bg-[#eeffef] rounded-[200px] p-2 sm:p-2.5 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]">
              <Truck size={18} className="sm:w-5 sm:h-5" color="#2aae7a" />
            </div>

            {/* Status Text */}
            <div className="ml-[56px] sm:ml-[60px] md:ml-[70px]">
              <h2 className="font-semibold text-base sm:text-lg text-[#0d1b2a] m-0">
                {formatStatus(order.status)}
              </h2>
              <p className="font-medium text-sm sm:text-base text-[#9c9c9c] mt-2 mb-0">
                <span className="font-normal">Current location:</span>{" "}
                <span className="text-[#0d1b2a]">
                  {currentLocation || "Updating..."}
                </span>
              </p>
            </div>

            {/* Footer Info */}
            <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-5 md:mt-6">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <RefreshCw
                  size={14}
                  className="sm:w-4 sm:h-4"
                  color="#9c9c9c"
                />
                <span className="font-medium text-xs sm:text-sm text-[#9c9c9c]">
                  Last updated: {lastUpdated}
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar size={14} className="sm:w-4 sm:h-4" color="#9c9c9c" />
                <span className="font-medium text-xs sm:text-sm text-[#9c9c9c]">
                  Est. delivery:{" "}
                  {order.deliveryEta
                    ? new Date(order.deliveryEta).toLocaleDateString("en-GB")
                    : "TBD"}
                </span>
              </div>
            </div>
          </div>

          {/* Tracking Progress Card */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5 md:p-6">
            <h2 className="font-medium text-base sm:text-lg text-[#0d1b2a] mt-0 mb-4 sm:mb-5 md:mb-6">
              Tracking Progress
            </h2>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[18px] sm:left-[20px] top-[37px] sm:top-[41px] w-[2px] h-[calc(100%-74px)] sm:h-[calc(100%-82px)] bg-[#e3e1e1]" />

              {trackingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex gap-3 sm:gap-4 relative ${
                    index < trackingSteps.length - 1
                      ? "mb-10 sm:mb-12 md:mb-[56px]"
                      : ""
                  }`}
                >
                  {/* Step Icon */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 md:w-[41px] md:h-[41px] rounded-[200px] ${
                      step.status === "completed" || step.status === "current"
                        ? "bg-[#2aae7a]"
                        : "bg-[#e3e1e1]"
                    } flex items-center justify-center shrink-0 z-[1]`}
                  >
                    {(step.status === "completed" ||
                      step.status === "current") && (
                      <Check
                        size={22}
                        className="sm:w-6 sm:h-6"
                        color="white"
                        strokeWidth={3}
                      />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold text-sm sm:text-base ${
                        step.status === "completed" || step.status === "current"
                          ? "text-[#2aae7a]"
                          : "text-[#7b7b7b]"
                      } m-0`}
                    >
                      {step.title}
                    </h3>
                    <p className="font-medium text-xs sm:text-sm text-[#9c9c9c] mt-1 mb-0">
                      {step.description}
                    </p>
                    {step.location && (
                      <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
                        <MapPin
                          size={12}
                          className="sm:w-[14px] sm:h-[14px]"
                          color="#9c9c9c"
                        />
                        <span className="font-medium text-xs sm:text-sm text-[#9c9c9c]">
                          {step.location}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  {step.timestamp && (
                    <div className="hidden md:block font-medium text-sm text-[#9c9c9c] whitespace-nowrap">
                      {formatTimestamp(step.timestamp)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Shipping Events Card */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-4 sm:pt-5 md:pt-6 pb-0 px-0 overflow-hidden">
            <h2 className="font-medium text-base sm:text-lg text-[#0d1b2a] mt-0 mb-2 sm:mb-3 ml-4 sm:ml-5 md:ml-6">
              Detailed Shipping Events
            </h2>

            {/* Divider Line */}
            <div className="w-full h-px bg-[#e3e1e1]" />

            {order.tracking && order.tracking.length > 0 ? (
              order.tracking
                .slice()
                .reverse()
                .map((track: OrderTracking, index: number) => (
                  <div
                    key={index}
                    className="bg-white shadow-[0px_2px_3px_0px_rgba(0,0,0,0.25)] py-4 sm:py-5 px-4 sm:px-5 md:px-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      {/* Date & Time */}
                      <div className="w-full sm:w-[100px] md:w-[112px]">
                        <p className="font-medium text-sm sm:text-base text-black m-0">
                          {new Date(track.timestamp).toLocaleDateString(
                            "en-CA"
                          )}
                        </p>
                        <p className="font-medium text-sm sm:text-base text-[#9c9c9c] mt-0.5 sm:mt-1 mb-0">
                          {new Date(track.timestamp).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </p>
                      </div>

                      {/* Event Description */}
                      <div className="flex-1 min-w-0">
                        <p className="font-normal text-sm sm:text-base text-black m-0">
                          {track.title || track.description}
                        </p>
                      </div>

                      {/* Location */}
                      {track.location && (
                        <div className="flex items-center gap-1">
                          <MapPin
                            size={12}
                            className="sm:w-[14px] sm:h-[14px]"
                            color="#9c9c9c"
                          />
                          <span className="font-medium text-xs sm:text-sm text-[#9c9c9c]">
                            {track.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <div className="py-6 sm:py-8 px-4 sm:px-6 text-center">
                <p className="text-xs sm:text-sm text-[#9c9c9c]">
                  No detailed shipping events available yet
                </p>
              </div>
            )}
          </div>

          {/* Order Items Card */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5 md:p-6">
            <h2 className="font-medium text-base sm:text-lg text-[#0d1b2a] mt-0 mb-4 sm:mb-5 md:mb-6">
              Order Items:
            </h2>

            {order.items.map((item, index) => (
              <div
                key={item.itemId || index}
                className={`bg-[#fbfbfb] rounded-[15px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-3 sm:p-3.5 md:p-4 ${
                  index < order.items.length - 1 ? "mb-4 sm:mb-5 md:mb-6" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Product Image */}
                  <div className="w-full sm:w-[100px] md:w-[121px] h-[180px] sm:h-[75px] md:h-[91px] rounded-[8px] bg-gray-100 overflow-hidden shrink-0">
                    {item.productImage ? (
                      <Image
                        src={item.productImage}
                        alt={item.productTitle}
                        width={121}
                        height={91}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#e3e1e1]">
                        <span className="text-[#9c9c9c] text-xs">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-base sm:text-lg text-black mt-0 sm:mt-1 md:mt-2 mb-0">
                      {item.productTitle}
                    </h3>
                    <p className="font-medium text-sm sm:text-base text-[#9c9c9c] mt-1.5 sm:mt-2 mb-0">
                      by {item.supplier?.name || "Seller"}
                    </p>
                    <p className="font-medium text-sm sm:text-base text-[#9c9c9c] mt-1.5 sm:mt-2 mb-0">
                      Qty: {item.quantity} / Price: ₹
                      {item.unitPrice.toLocaleString()}
                    </p>
                  </div>

                  {/* Price & Delivery */}
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <p className="font-semibold text-lg sm:text-xl md:text-[22px] text-black mt-0 sm:mt-3 md:mt-5 mb-0">
                      ₹{item.subtotal.toLocaleString()}
                    </p>
                    <p className="font-medium text-sm sm:text-base text-[#9c9c9c] mt-1.5 sm:mt-2 mb-0">
                      Est. Date:{" "}
                      {order.deliveryEta
                        ? new Date(order.deliveryEta).toLocaleDateString(
                            "en-CA"
                          )
                        : "TBD"}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#e3e1e1] my-3 sm:my-4" />

                {/* Tracking ID Row */}
                <div className="flex justify-between items-center px-0.5 sm:px-1">
                  <span className="font-medium text-xs sm:text-sm text-black">
                    Tracking ID:
                  </span>
                  <span className="font-medium text-xs sm:text-sm text-[#9c9c9c]">
                    {order.trackingNumber || "Not available"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address Card */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5 md:p-6">
            <h2 className="font-medium text-base sm:text-lg text-[#0d1b2a] mt-0 mb-3 sm:mb-4">
              Shipping Address
            </h2>
            <div className="font-normal text-sm sm:text-base text-[#9c9c9c] leading-[20px] sm:leading-[22px]">
              <p className="m-0">{order.shippingAddress?.name}</p>
              <p className="m-0">
                {order.shippingAddress?.addressLine1}
                {order.shippingAddress?.addressLine2 &&
                  `, ${order.shippingAddress.addressLine2}`}
              </p>
              <p className="m-0">
                {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.pincode}
              </p>
              <p className="m-0">{order.shippingAddress?.phone}</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {/* Carrier Information Card */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5 md:p-6">
            <h2 className="font-medium text-base sm:text-lg text-[#0d1b2a] mt-0 mb-4 sm:mb-5">
              Carrier Information
            </h2>

            {/* Carrier */}
            <div className="mb-4 sm:mb-5">
              <p className="font-medium text-xs sm:text-sm text-[#9c9c9c] m-0">
                Carrier
              </p>
              <p className="font-medium text-sm sm:text-base text-[#0d1b2a] mt-1 mb-0">
                {order.shippingPartner || "Not assigned yet"}
              </p>
            </div>

            {/* Tracking Number */}
            <div className="mb-4 sm:mb-5">
              <p className="font-medium text-xs sm:text-sm text-[#9c9c9c] m-0">
                Tracking Number
              </p>
              <p className="font-medium text-sm sm:text-base text-[#0d1b2a] mt-1 mb-0">
                {order.trackingNumber || "Not available"}
              </p>
            </div>

            {/* Estimated Delivery */}
            <div className="mb-5 sm:mb-6">
              <p className="font-medium text-xs sm:text-sm text-[#9c9c9c] m-0">
                Estimated Delivery
              </p>
              <p className="font-medium text-sm sm:text-base text-[#2aae7a] mt-1 mb-0">
                {order.deliveryEta
                  ? formatDate(order.deliveryEta)
                  : "To be confirmed"}
              </p>
            </div>

            {/* Track on Carrier Site Button */}
            {order.shippingPartner && order.trackingNumber && (
              <button
                onClick={() => {
                  let trackingUrl = "";
                  const carrier = order.shippingPartner?.toLowerCase() || "";
                  if (carrier.includes("ups")) {
                    trackingUrl = `https://www.ups.com/track?tracknum=${order.trackingNumber}`;
                  } else if (carrier.includes("fedex")) {
                    trackingUrl = `https://www.fedex.com/fedextrack/?trknbr=${order.trackingNumber}`;
                  } else if (carrier.includes("dhl")) {
                    trackingUrl = `https://www.dhl.com/en/express/tracking.html?AWB=${order.trackingNumber}`;
                  } else {
                    trackingUrl = `https://www.google.com/search?q=${order.shippingPartner}+tracking+${order.trackingNumber}`;
                  }
                  window.open(trackingUrl, "_blank");
                }}
                className="w-full p-2.5 sm:p-3 border border-[#9c9c9c] rounded-[11px] bg-transparent flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50"
              >
                <ExternalLink
                  size={14}
                  className="sm:w-4 sm:h-4"
                  color="#0d1b2a"
                />
                <span className="font-medium text-sm sm:text-base text-[#0d1b2a]">
                  Track On Carrier Site
                </span>
              </button>
            )}
          </div>

          {/* Order Actions Card */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5 md:p-6">
            <h2 className="font-medium text-base sm:text-lg text-[#0d1b2a] mt-0 mb-4 sm:mb-5">
              Order Actions
            </h2>

            {/* Download Invoice Button */}
            <button
              onClick={handleDownloadInvoice}
              className="w-full py-2 px-2.5 sm:px-3 border border-[#1e3a8a] rounded-[11px] bg-transparent flex items-center gap-2 cursor-pointer mb-2 hover:bg-blue-50"
            >
              <div className="p-1.5 sm:p-2">
                <FileText size={14} className="sm:w-4 sm:h-4" color="#1e3a8a" />
              </div>
              <span className="font-medium text-sm sm:text-base text-[#1e3a8a]">
                Download Invoice
              </span>
            </button>

            {/* Share Tracking Button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Tracking link copied to clipboard");
              }}
              className="w-full py-2 px-2.5 sm:px-3 border border-[#9c9c9c] rounded-[11px] bg-transparent flex items-center gap-2 cursor-pointer mb-2 hover:bg-gray-50"
            >
              <div className="p-1.5 sm:p-2">
                <Share2 size={14} className="sm:w-4 sm:h-4" color="#9c9c9c" />
              </div>
              <span className="font-medium text-sm sm:text-base text-[#9c9c9c]">
                Share Tracking
              </span>
            </button>

            {/* View Order Details Button */}
            <button
              onClick={() => router.push(`/buyer/orders`)}
              className="w-full py-2 px-2.5 sm:px-3 border border-[#9c9c9c] rounded-[11px] bg-transparent flex items-center gap-2 cursor-pointer hover:bg-gray-50"
            >
              <div className="p-1.5 sm:p-2">
                <Send size={14} className="sm:w-4 sm:h-4" color="#9c9c9c" />
              </div>
              <span className="font-medium text-sm sm:text-base text-[#9c9c9c]">
                View Order Details
              </span>
            </button>
          </div>

          {/* Need Help Card */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5 md:p-6">
            <h2 className="font-medium text-base sm:text-lg text-[#0d1b2a] mt-0 mb-4 sm:mb-5">
              Need Help?
            </h2>

            {/* Live Chat Support */}
            <button
              onClick={() => router.push("/buyer/support")}
              className="w-full py-2 px-2.5 sm:px-3 border border-[#9c9c9c] rounded-[11px] bg-transparent flex items-center gap-2 cursor-pointer mb-2 hover:bg-gray-50"
            >
              <div className="p-1.5 sm:p-2">
                <MessageCircle
                  size={14}
                  className="sm:w-4 sm:h-4"
                  color="#9c9c9c"
                />
              </div>
              <span className="font-medium text-sm sm:text-base text-[#9c9c9c]">
                Live Chat Support
              </span>
            </button>

            {/* Call Support */}
            <a
              href="tel:+918956835375"
              className="block w-full py-2 px-2.5 sm:px-3 border border-[#9c9c9c] rounded-[11px] bg-transparent no-underline mb-2 box-border hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 sm:p-2">
                  <Phone size={14} className="sm:w-4 sm:h-4" color="#9c9c9c" />
                </div>
                <span className="font-medium text-sm sm:text-base text-[#9c9c9c]">
                  Call: +91 89568 35375
                </span>
              </div>
            </a>

            {/* Email Support */}
            <a
              href="mailto:contact@zeerostock.com"
              className="block w-full py-2 px-2.5 sm:px-3 border border-[#9c9c9c] rounded-[11px] bg-transparent no-underline box-border hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 sm:p-2">
                  <Mail size={14} className="sm:w-4 sm:h-4" color="#9c9c9c" />
                </div>
                <span className="font-medium text-sm sm:text-base text-[#9c9c9c]">
                  Email Support
                </span>
              </div>
            </a>
          </div>

          {/* Delivery Instructions Card */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5 md:p-6">
            <h2 className="font-medium text-base sm:text-lg text-[#0d1b2a] mt-0 mb-4 sm:mb-5">
              Delivery Instructions
            </h2>

            <div className="flex gap-2 mb-5 sm:mb-6">
              <div className="w-[14px] h-[14px] mt-0.5 sm:mt-1 shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8"
                    stroke="#9c9c9c"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M9 5V10M9 13H9.01"
                    stroke="#9c9c9c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="font-normal text-xs sm:text-sm text-[#9c9c9c] leading-[16px] sm:leading-[18px] m-0">
                Please ensure someone is available to receive and inspect the
                shipment upon delivery.
              </p>
            </div>

            {/* Go to Dashboard Button */}
            <button
              onClick={() => router.push("/buyer/dashboard")}
              className="w-full p-2.5 sm:p-3 bg-[#1e3a8a] border-none rounded-[11px] flex items-center justify-center gap-3 sm:gap-4 cursor-pointer hover:bg-[#152e6b]"
            >
              <span className="font-semibold text-sm sm:text-base text-white">
                Go to Dashboard
              </span>
              <ChevronRight
                size={16}
                className="sm:w-[18px] sm:h-[18px]"
                color="white"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
