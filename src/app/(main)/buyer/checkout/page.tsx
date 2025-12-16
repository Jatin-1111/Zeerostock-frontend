"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProgressSteps from "@/components/checkout/ProgressSteps";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ReviewOrder from "@/components/checkout/ReviewOrder";
import OrderSummary from "@/components/checkout/OrderSummary";
import { buyerService } from "@/services/buyer.service";
import { cartService } from "@/services/cart.service";
import type { Address, CreateOrderRequest } from "@/types/buyer.types";

type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Checkout data
  const [checkoutSessionId, setCheckoutSessionId] = useState<string | null>(
    null
  );
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<Address | null>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online" | "upi">(
    "cod"
  );
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [orderNotes, setOrderNotes] = useState<string>("");

  // Cart summary (fetch from session or cart)
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    savings: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  });

  useEffect(() => {
    // Get checkout session from URL or create one
    const sessionId = searchParams.get("sessionId");
    if (sessionId) {
      setCheckoutSessionId(sessionId);
    } else {
      // Create checkout session from cart
      createCheckoutSession();
    }
  }, []);

  const createCheckoutSession = async () => {
    try {
      const response = await cartService.createCheckoutSession({});
      if (response.success && response.data) {
        setCheckoutSessionId(response.data.sessionId);
        // Update cart summary from response
        if (response.data.pricingSummary) {
          setCartSummary({
            subtotal: response.data.pricingSummary.itemSubtotal || 0,
            savings: response.data.pricingSummary.totalSavings || 0,
            tax: response.data.pricingSummary.gstAmount || 0,
            shipping: response.data.pricingSummary.shippingCharges || 0,
            total: response.data.pricingSummary.finalPayableAmount || 0,
          });
        }
      }
    } catch (err) {
      console.error("Error creating checkout session:", err);
      setError("Failed to initialize checkout");
    }
  };

  const handlePlaceOrder = async () => {
    if (!checkoutSessionId || !selectedShippingAddress) {
      setError("Please complete all required fields");
      return;
    }

    setIsPlacingOrder(true);
    setError(null);

    try {
      const orderData: CreateOrderRequest = {
        checkoutSessionId,
        shippingAddressId: selectedShippingAddress.id,
        billingAddressId: selectedBillingAddress?.id,
        paymentMethod,
        paymentDetails,
        orderNotes,
      };

      const response = await buyerService.createOrder(orderData);

      if (response.success && response.data) {
        // Redirect to order confirmation page with order ID
        router.push(
          `/buyer/order-confirmation?orderId=${response.data.orderId}`
        );
      } else {
        setError(response.message || "Failed to create order");
      }
    } catch (err: any) {
      console.error("Error placing order:", err);
      setError(
        err.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 px-8">
          <div className="flex flex-col mb-2">
            <button
              onClick={() => router.push("/buyer/cart")}
              className="flex items-center gap-2 text-gray-900 hover:text-gray-700"
            >
              <span>←</span>
              <span>Back to cart</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
              <p className="text-gray-500 mt-1">
                Secure payment and shipping information
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-900">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="font-medium">Secure Checkout</span>
          </div>
        </div>

        <div className="h-0.5 bg-black" />

        {error && (
          <div className="mx-8 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Progress Steps */}
        <div className="pt-10">
          <ProgressSteps currentStep={currentStep} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 px-8">
          {/* Left Side - Step Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <ShippingAddress
                selectedAddress={selectedShippingAddress}
                onAddressSelect={setSelectedShippingAddress}
                onContinue={() => {
                  if (!selectedShippingAddress) {
                    setError("Please select a shipping address");
                    return;
                  }
                  setCurrentStep(2);
                }}
              />
            )}
            {currentStep === 2 && (
              <PaymentMethod
                selectedMethod={paymentMethod}
                onMethodSelect={setPaymentMethod}
                onPaymentDetailsChange={setPaymentDetails}
                onContinue={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && (
              <ReviewOrder
                shippingAddress={selectedShippingAddress}
                billingAddress={selectedBillingAddress}
                paymentMethod={paymentMethod}
                orderNotes={orderNotes}
                onNotesChange={setOrderNotes}
                onBack={() => setCurrentStep(2)}
                onPlaceOrder={handlePlaceOrder}
                isPlacingOrder={isPlacingOrder}
              />
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={cartSummary.subtotal}
              savings={cartSummary.savings}
              tax={cartSummary.tax}
              shipping={cartSummary.shipping}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
