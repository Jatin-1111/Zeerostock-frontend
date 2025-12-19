"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderStatusCard from "@/components/track-order/OrderStatusCard";
import TrackingProgress from "@/components/track-order/TrackingProgress";
import ShipmentEvents from "@/components/track-order/ShipmentEvents";
import OrderItems from "@/components/track-order/OrderItems";
import ShippingAddress from "@/components/track-order/ShippingAddress";
import CarrierInfo from "@/components/track-order/CarrierInfo";
import { buyerService } from "@/services/buyer.service";
import { toast } from "react-hot-toast";

interface TrackOrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function TrackOrderDetailPage({
  params,
}: TrackOrderDetailPageProps) {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    params.then((p) => setOrderId(p.id));
  }, [params]);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await buyerService.getOrderById(orderId);

        if (response.success && response.data) {
          setOrderData(response.data);
        } else {
          toast.error("Order not found");
          router.push("/buyer/orders");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to load order details");
        router.push("/buyer/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, router]);

  if (loading || !orderData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Generate tracking steps based on order status
  const getTrackingSteps = () => {
    const status = orderData.status || "pending";
    const allSteps = [
      {
        title: "Order Placed",
        description: "Your order has been successfully placed",
        location: "Zeerostock Platform",
        date: new Date(orderData.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: new Date(orderData.createdAt).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        completed: true,
      },
      {
        title: "Processing",
        description: "Order is being processed by supplier",
        location: orderData.shippingAddress?.city || "",
        date: "",
        time: "",
        completed: ["processing", "shipped", "delivered"].includes(status),
      },
      {
        title: "Shipped",
        description: "Package has been picked up by carrier",
        location: orderData.shippingAddress?.city || "",
        date: "",
        time: "",
        completed: ["shipped", "delivered"].includes(status),
      },
      {
        title: "Delivered",
        description: "Package has been delivered",
        location: orderData.shippingAddress?.city || "",
        date:
          status === "delivered"
            ? new Date(orderData.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "",
        time:
          status === "delivered"
            ? new Date(orderData.updatedAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })
            : "",
        completed: status === "delivered",
      },
    ];
    return allSteps;
  };

  const trackingSteps = getTrackingSteps();

  const shipmentEvents = [
    {
      date: new Date(orderData.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: new Date(orderData.createdAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      event: "Order placed and confirmed",
      location: "Zeerostock Platform",
    },
  ];

  const orderItems =
    orderData.items?.map((item: any) => ({
      id: item.productId || item.itemId,
      name: item.productTitle || item.title,
      supplier: orderData.supplierName || "Supplier",
      quantity: item.quantity,
      price: new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(item.price * item.quantity),
    })) || [];

  const shippingAddress = orderData.shippingAddress
    ? {
        name:
          orderData.shippingAddress.fullName ||
          orderData.shippingAddress.name ||
          "",
        company: orderData.shippingAddress.company || "",
        street: `${
          orderData.shippingAddress.addressLine1 ||
          orderData.shippingAddress.street ||
          ""
        } ${orderData.shippingAddress.addressLine2 || ""}`,
        city: `${orderData.shippingAddress.city || ""}, ${
          orderData.shippingAddress.state || ""
        } ${
          orderData.shippingAddress.postalCode ||
          orderData.shippingAddress.zipCode ||
          ""
        }`,
        phone:
          orderData.shippingAddress.phone ||
          orderData.shippingAddress.phoneNumber ||
          "",
      }
    : {
        name: "",
        company: "",
        street: "",
        city: "",
        phone: "",
      };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
  };

  const getEstimatedDelivery = () => {
    const createdDate = new Date(orderData.createdAt);
    createdDate.setDate(createdDate.getDate() + 5); // Add 5 days for delivery
    return createdDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <OrderStatusCard
              orderId={orderData.orderNumber || orderId}
              placedDate={new Date(orderData.createdAt).toLocaleDateString(
                "en-GB"
              )}
              status={formatStatus(orderData.status)}
              currentLocation={orderData.shippingAddress?.city || "Processing"}
              lastUpdated={new Date(orderData.updatedAt).toLocaleDateString(
                "en-US"
              )}
              estimatedDelivery={getEstimatedDelivery()}
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
              carrier={orderData.shippingCarrier || "Standard Shipping"}
              service={orderData.shippingMethod || "Ground Service"}
              trackingNumber={
                orderData.trackingNumber || orderData.orderNumber || orderId
              }
              estimatedDelivery={getEstimatedDelivery()}
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
