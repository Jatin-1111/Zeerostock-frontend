"use client";

import OrderHeader from "@/components/order-confirmation/OrderHeader";
import OrderStatusTracker from "@/components/order-confirmation/OrderStatusTracker";
import OrderItems from "@/components/order-confirmation/OrderItems";
import ShippingPaymentInfo from "@/components/order-confirmation/ShippingPaymentInfo";
import EscrowProtection from "@/components/order-confirmation/EscrowProtection";
import OrderSummaryConfirm from "@/components/order-confirmation/OrderSummaryConfirm";
import OrderActions from "@/components/order-confirmation/OrderActions";
import NeedHelp from "@/components/order-confirmation/NeedHelp";
import TrackOrder from "@/components/order-confirmation/TrackOrder";
import WhatsNext from "@/components/order-confirmation/WhatsNext";

export default function OrderConfirmationPage() {
  const orderData = {
    orderNumber: "#25-2024-002687",
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
    <div className="min-h-screen bg-white py-8">
      <div className="w-full px-8 mx-auto">
        {/* Header */}
        <OrderHeader
          orderNumber={orderData.orderNumber}
          placedDate={orderData.placedDate}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
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
          <div className="lg:col-span-1 space-y-6">
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
            <TrackOrder />
            <WhatsNext steps={orderData.whatsNextSteps} />
          </div>
        </div>
      </div>
    </div>
  );
}
