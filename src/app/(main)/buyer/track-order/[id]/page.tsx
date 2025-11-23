"use client";

import OrderStatusCard from "@/components/track-order/OrderStatusCard";
import TrackingProgress from "@/components/track-order/TrackingProgress";
import ShipmentEvents from "@/components/track-order/ShipmentEvents";
import OrderItems from "@/components/track-order/OrderItems";
import ShippingAddress from "@/components/track-order/ShippingAddress";
import CarrierInfo from "@/components/track-order/CarrierInfo";

interface TrackOrderDetailPageProps {
  params: {
    id: string;
  };
}

export default function TrackOrderDetailPage({
  params,
}: TrackOrderDetailPageProps) {
  const orderId = params.id;

  // Sample data - replace with actual API calls
  const trackingSteps = [
    {
      title: "Order Placed",
      description: "Your order has been successfully placed",
      location: "Zeerostock Platform",
      date: "Jan 16, 2024",
      time: "10:30 AM",
      completed: true,
    },
    {
      title: "Processing",
      description: "Order is being processed by supplier",
      location: "Supplier Warehouse, California",
      date: "Jan 16, 2024",
      time: "2:45 PM",
      completed: true,
    },
    {
      title: "Shipped",
      description: "Package has been picked up by carrier",
      location: "Los Angeles, CA",
      date: "Jan 17, 2024",
      time: "9:15 AM",
      completed: true,
    },
    {
      title: "In Transit",
      description: "Package is on its way to destination",
      location: "Phoenix, AZ",
      date: "Jan 18, 2024",
      time: "11:20 AM",
      completed: true,
    },
    {
      title: "Out for Delivery",
      description: "Package is out for delivery",
      location: "",
      date: "",
      time: "",
      completed: false,
    },
    {
      title: "Delivered",
      description: "Package has been delivered",
      location: "",
      date: "",
      time: "",
      completed: false,
    },
  ];

  const shipmentEvents = [
    {
      date: "Jan 18, 2024",
      time: "11:20 AM",
      event: "Package arrived at carrier facility",
      location: "Phoenix, AZ Distribution Center",
    },
    {
      date: "Jan 18, 2024",
      time: "6:30 AM",
      event: "Package departed from facility",
      location: "Las Vegas, NV Hub",
    },
    {
      date: "Jan 17, 2024",
      time: "8:45 PM",
      event: "Package arrived at carrier facility",
      location: "Las Vegas, NV Hub",
    },
    {
      date: "Jan 17, 2024",
      time: "9:15 AM",
      event: "Package picked up by carrier",
      location: "Los Angeles, CA",
    },
    {
      date: "Jan 16, 2024",
      time: "2:45 PM",
      event: "Shipping label created",
      location: "Supplier Warehouse, California",
    },
  ];

  const orderItems = [
    {
      id: "PRD-12345",
      name: "Industrial Steel Pipes - Grade A",
      supplier: "ABC Manufacturing",
      quantity: 500,
      price: "$2,450.00",
    },
  ];

  const shippingAddress = {
    name: "John Doe",
    company: "ABC Corporation",
    street: "123 Business Park Drive",
    city: "Dallas, TX 75201",
    phone: "(555) 123-4567",
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <OrderStatusCard
              orderId={orderId}
              placedDate="16/01/2024"
              status="In Transit"
              currentLocation="Phoenix, AZ Distribution Center"
              lastUpdated="2 hours ago"
              estimatedDelivery="Jan 20, 2024"
            />

            <TrackingProgress steps={trackingSteps} />

            <ShipmentEvents events={shipmentEvents} />

            <OrderItems items={orderItems} />

            <div className="block lg:hidden">
              <ShippingAddress address={shippingAddress} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CarrierInfo
              carrier="UPS"
              service="UPS Ground"
              trackingNumber="1Z999AA10123456784"
              estimatedDelivery="Jan 20, 2024"
            />

            <div className="hidden lg:block">
              <ShippingAddress address={shippingAddress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
