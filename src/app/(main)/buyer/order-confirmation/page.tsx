"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buyerService } from "@/services/buyer.service";
import OrderStatusTracker from "@/components/order-confirmation/OrderStatusTracker";
import OrderItems from "@/components/order-confirmation/OrderItems";
import ShippingPaymentInfo from "@/components/order-confirmation/ShippingPaymentInfo";
import EscrowProtection from "@/components/order-confirmation/EscrowProtection";
import OrderSummaryConfirm from "@/components/order-confirmation/OrderSummaryConfirm";
import OrderActions from "@/components/order-confirmation/OrderActions";
import NeedHelp from "@/components/order-confirmation/NeedHelp";
import WhatsNext from "@/components/order-confirmation/WhatsNext";

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!orderId) {
      // If no orderId, show demo data
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await buyerService.getOrderById(orderId);
        if (response.success && response.data) {
          setOrder(response.data);
        } else {
          setError("Failed to load order details");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{error}</h2>
          <button
            onClick={() => router.push("/buyer/orders")}
            className="text-blue-600 hover:underline"
          >
            View all orders
          </button>
        </div>
      </div>
    );
  }

  // Use real order data if available, otherwise use demo data
  const orderData = order
    ? {
        orderNumber: order.orderNumber,
        trackingNumber: order.trackingNumber,
        placedDate: new Date(order.createdAt).toLocaleDateString("en-US"),
        statusSteps: [
          {
            title: "Order Placed",
            description: "Your order has been confirmed and is being processed",
            timestamp: new Date(order.createdAt).toLocaleString("en-US"),
            status: "completed" as const,
          },
          {
            title: "Payment Secure",
            description: "Payment secured successfully",
            timestamp: new Date(order.createdAt).toLocaleString("en-US"),
            status:
              order.status === "confirmed" ||
              order.status === "processing" ||
              order.status === "shipped" ||
              order.status === "delivered"
                ? ("completed" as const)
                : ("pending" as const),
          },
          {
            title: "Processing",
            description: "Supplier is processing your items",
            timestamp:
              order.status === "processing" ||
              order.status === "shipped" ||
              order.status === "delivered"
                ? new Date(order.createdAt).toLocaleString("en-US")
                : "Expected soon",
            status:
              order.status === "processing"
                ? ("current" as const)
                : order.status === "shipped" || order.status === "delivered"
                ? ("completed" as const)
                : ("pending" as const),
          },
          {
            title: "Shipped",
            description: "Items shipped from suppliers",
            timestamp:
              order.status === "shipped" || order.status === "delivered"
                ? new Date(order.updatedAt || order.createdAt).toLocaleString(
                    "en-US"
                  )
                : "Expected soon",
            status:
              order.status === "shipped"
                ? ("current" as const)
                : order.status === "delivered"
                ? ("completed" as const)
                : ("pending" as const),
          },
          {
            title: "Delivered",
            description: "Package at your door",
            timestamp: order.deliveryEta
              ? new Date(order.deliveryEta).toLocaleDateString("en-US")
              : order.status === "delivered"
              ? new Date(order.updatedAt || order.createdAt).toLocaleString(
                  "en-US"
                )
              : "TBD",
            status:
              order.status === "delivered"
                ? ("completed" as const)
                : ("pending" as const),
          },
        ],
        items:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          order.items?.map((item: any) => ({
            id: item.itemId || item.productId,
            name: item.productTitle,
            seller: item.supplier?.name || "Seller",
            quantity: item.quantity,
            price: item.unitPrice,
            rating: 4.5,
            status: item.itemStatus || "Processing",
            trackingId: order.trackingNumber,
          })) || [],
        shippingAddress: order.shippingAddress
          ? {
              name:
                order.shippingAddress.name ||
                order.shippingAddress.addressLine1,
              company: "",
              street: `${order.shippingAddress.addressLine1}${
                order.shippingAddress.addressLine2
                  ? ", " + order.shippingAddress.addressLine2
                  : ""
              }`,
              city: `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}`,
              phone: order.shippingAddress.phone,
            }
          : {
              name: "",
              company: "",
              street: "",
              city: "",
              phone: "",
            },
        paymentInfo: {
          method:
            order.paymentMethod === "cod"
              ? "Cash on Delivery"
              : order.paymentMethod === "online"
              ? "Online Payment"
              : "UPI",
          status:
            order.paymentStatus === "paid"
              ? "Payment Complete"
              : order.paymentStatus === "pending"
              ? "Payment Pending"
              : "Payment Secured",
        },
        shippingInfo: {
          method: order.shippingPartner || "Standard Shipping",
          date: order.deliveryEta
            ? new Date(order.deliveryEta).toLocaleDateString("en-US")
            : "TBD",
        },
        orderSummary: {
          subtotal: order.pricing?.itemsSubtotal || 0,
          itemCount: order.items?.length || 0,
          savings:
            (order.pricing?.discountAmount || 0) +
            (order.pricing?.couponDiscount || 0),
          tax: order.pricing?.gstAmount || 0,
          shipping: order.pricing?.shippingCharges || "Free",
          total: order.pricing?.totalAmount || 0,
        },
        whatsNextSteps: [
          {
            icon: "",
            title: "Suppliers Processing",
            description: "Your suppliers are preparing items for shipment",
          },
          {
            icon: "",
            title: "Shipment Tracking",
            description: "Track packages once they're on shipped",
          },
          {
            icon: "",
            title: "Delivery & Inspection",
            description: "Inspect items and confirm receipt",
          },
        ],
      }
    : {
        orderNumber: "#25-2024-002687",
        trackingNumber: "ZEERO-20250115103200-12345",
        placedDate: "07/10/2025",
        statusSteps: [
          {
            title: "Order Placed",
            description: "Your order has been confirmed",
            timestamp: "2024-01-15 10:32 AM",
            status: "completed" as const,
          },
          {
            title: "Payment Secure",
            description: "Payment secured successfully",
            timestamp: "2024-01-15 10:45 AM",
            status: "completed" as const,
          },
          {
            title: "Processing",
            description: "Supplier is processing your items",
            timestamp: "2024-01-16 Expected",
            status: "current" as const,
          },
          {
            title: "Shipped",
            description: "Items shipped from suppliers",
            timestamp: "2024-01-16 Expected",
            status: "pending" as const,
          },
          {
            title: "Delivered",
            description: "Package at your door",
            timestamp: "2024-01-16 Expected",
            status: "pending" as const,
          },
        ],
        items: [
          {
            id: 1,
            name: "Industrial Grade Steel Pipes",
            seller: "TrustedSeller20",
            quantity: 100,
            price: 66250.0,
            rating: 4.8,
            status: "Processing",
            trackingId: "USRM1A1424C9FBD",
          },
          {
            id: 2,
            name: "Industrial Grade Steel Pipes",
            seller: "TrustedSeller20",
            quantity: 50,
            price: 66250.0,
            rating: 4.8,
            status: "Processing",
            trackingId: "USRM1A1424C9FBD",
          },
        ],
        shippingAddress: {
          name: "John Doe",
          company: "ABC Manufacturing Corp",
          street: "123 Industrial Blvd",
          city: "Houston, TX 77001",
          phone: "+1 (555) 123-4567",
        },
        paymentInfo: {
          method: "Escrow Payment",
          status: "Funds Secured",
        },
        shippingInfo: {
          method: "Standard Shipping",
          date: "2024-01-25",
        },
        orderSummary: {
          subtotal: 16125.0,
          itemCount: 3,
          savings: 13264.75,
          tax: 1290.0,
          shipping: "Free",
          total: 17415.0,
        },
        whatsNextSteps: [
          {
            icon: "",
            title: "Suppliers Processing",
            description: "Your suppliers are preparing items for shipment",
          },
          {
            icon: "",
            title: "Shipment Tracking",
            description: "Track packages once they're on shipped",
          },
          {
            icon: "",
            title: "Delivery & Inspection",
            description: "Inspect items and confirm receipt",
          },
        ],
      };

  return (
    <div className="min-h-screen bg-[#EEFBF6] py-8">
      <div className="max-w-[1440px] mx-auto px-20">
        {/* Success Icon and Header */}
        <div className="flex flex-col items-center mb-5">
          {/* Large Success Checkmark Icon */}
          <div className="w-[98px] h-[98px] mb-3 flex items-center justify-center">
            <svg
              width="98"
              height="98"
              viewBox="0 0 130 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="65" cy="65" r="65" fill="#2AAE7A" />
              <path
                d="M35 65L55 85L95 45"
                stroke="#EEF8F6"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Order Confirmed Heading */}
          <h1 className="text-[30px] font-semibold text-[#0D1B2A] mb-2">
            Order Confirmed!
          </h1>
          <p className="text-[18px] text-[#9C9C9C] font-medium">
            Thank you for your order. We&apos;ve received your order and will
            process it shortly
          </p>
        </div>

        {/* Order Metadata */}
        <div className="flex justify-center gap-6 mb-5">
          <div className="flex items-center gap-2">
            <svg
              width="11"
              height="14"
              viewBox="0 0 15 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 4h13v12H1z" stroke="#0D1B2A" strokeWidth="1.5" />
              <path
                d="M4 1v3M11 1v3M1 7h13"
                stroke="#0D1B2A"
                strokeWidth="1.5"
              />
            </svg>
            <span className="text-[14px] text-[#0D1B2A]">
              Order #{orderData.orderNumber}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="17"
              height="17"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="3"
                width="18"
                height="17"
                rx="2"
                stroke="#0D1B2A"
                strokeWidth="1.5"
              />
              <path
                d="M2 8h18M7 1v3M15 1v3"
                stroke="#0D1B2A"
                strokeWidth="1.5"
              />
            </svg>
            <span className="text-[14px] text-[#0D1B2A]">
              Placed on {orderData.placedDate}
            </span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_418px] gap-5">
          {/* Left Column - Main Content */}
          <div className="space-y-5">
            <OrderStatusTracker steps={orderData.statusSteps} />
            <OrderItems items={orderData.items} />
            <ShippingPaymentInfo
              shippingAddress={orderData.shippingAddress}
              paymentInfo={orderData.paymentInfo}
              shippingInfo={orderData.shippingInfo}
              escrowAmount={`$${orderData.orderSummary.total.toFixed(2)}`}
            />
            <EscrowProtection
              amount={orderData.orderSummary.total.toFixed(2)}
              releaseDate={orderData.shippingInfo.date}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-5">
            <OrderSummaryConfirm
              subtotal={orderData.orderSummary.subtotal}
              itemCount={orderData.orderSummary.itemCount}
              savings={orderData.orderSummary.savings}
              tax={orderData.orderSummary.tax}
              shipping={orderData.orderSummary.shipping}
              total={orderData.orderSummary.total}
            />
            <OrderActions />
            <NeedHelp />
            <WhatsNext steps={orderData.whatsNextSteps} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading order confirmation...
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
