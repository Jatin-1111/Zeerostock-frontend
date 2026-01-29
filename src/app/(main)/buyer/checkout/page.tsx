"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProgressSteps from "@/components/checkout/ProgressSteps";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ReviewOrder from "@/components/checkout/ReviewOrder";
import OrderSummary from "@/components/checkout/OrderSummary";
import { buyerService } from "@/services/buyer.service";
import { cartService } from "@/services/cart.service";
import type { Address, CreateOrderRequest } from "@/types/buyer.types";
import type { CartItem } from "@/types/api.types";

type Step = 1 | 2 | 3;

interface PaymentDetails {
  method: "card" | "escrow" | "wire" | "net-terms";
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Checkout data
  const [checkoutSessionId, setCheckoutSessionId] = useState<string | null>(
    null,
  );
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<Address | null>(null);
  // Billing address is optional, defaults to shipping address if not provided
  const [selectedBillingAddress] = useState<Address | null>(null);
  const [shippingMethod, setShippingMethod] = useState<string>("standard");
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "escrow" | "wire" | "net-terms"
  >("card");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null,
  );
  const [orderNotes, setOrderNotes] = useState<string>("");

  // Cart items and summary
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createCheckoutSession = async () => {
    try {
      console.log("Starting checkout session creation...");
      const response = await cartService.createCheckoutSession();
      console.log("Checkout session response:", response);

      if (response.success && response.data) {
        setCheckoutSessionId(response.data.sessionId);

        // Store cart items
        if (response.data.cartItems) {
          setCartItems(response.data.cartItems);
        }

        // Update cart summary from response
        if (response.data.pricingSummary) {
          const shippingCost =
            shippingMethod === "express"
              ? 100
              : shippingMethod === "overnight"
                ? 250
                : 0;
          setCartSummary({
            subtotal: response.data.pricingSummary.itemSubtotal || 0,
            savings:
              (response.data.pricingSummary.discountAmount || 0) +
              (response.data.pricingSummary.couponDiscount || 0),
            tax: response.data.pricingSummary.gstAmount || 0,
            shipping: shippingCost,
            total:
              (response.data.pricingSummary.finalPayableAmount || 0) +
              shippingCost,
          });
        }
      } else {
        console.error("Checkout session failed:", response);
        const errorMessage =
          response.message || "Failed to initialize checkout";

        // Handle specific error codes
        if (response.errorCode === "CART_EMPTY") {
          setError("Your cart is empty. Please add items before checkout.");
          setTimeout(() => router.push("/buyer/cart"), 2000);
        } else if (response.errorCode === "AUTHENTICATION_REQUIRED") {
          setError("Please log in to continue with checkout.");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          setError(errorMessage);
        }
      }
    } catch (err) {
      console.error("Error creating checkout session:", err);
      const error = err as any;

      // Check if it's an authentication error
      if (
        error?.response?.status === 401 ||
        error?.errorCode === "UNAUTHORIZED"
      ) {
        setError("Please log in to continue with checkout.");
        setTimeout(() => router.push("/login?redirect=/buyer/checkout"), 2000);
        return;
      }

      // Check if it's a cart empty error
      if (error?.errorCode === "CART_EMPTY") {
        setError("Your cart is empty. Please add items before checkout.");
        setTimeout(() => router.push("/buyer/cart"), 2000);
        return;
      }

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to initialize checkout. Please ensure you have items in your cart and are logged in.",
      );
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
      // Build order data, only including defined values
      const orderData: CreateOrderRequest = {
        checkoutSessionId,
        shippingAddressId: selectedShippingAddress.id,
        paymentMethod,
      };

      // Add optional billing address
      if (selectedBillingAddress?.id) {
        orderData.billingAddressId = selectedBillingAddress.id;
      }

      // Add payment details if present
      if (paymentDetails) {
        const details: any = {};
        if (paymentDetails.method === "card") {
          details.transactionId = "pending";
          if (paymentDetails.cardNumber) {
            details.cardLast4 = paymentDetails.cardNumber.slice(-4);
          }
        }
        // Only add paymentDetails if it has any properties
        if (Object.keys(details).length > 0) {
          orderData.paymentDetails = details;
        }
      }

      // Add order notes if present
      if (orderNotes && orderNotes.trim()) {
        orderData.orderNotes = orderNotes.trim();
      }

      console.log("Placing order with data:", orderData);
      const response = await buyerService.createOrder(orderData);
      console.log("Order response:", response);

      if (response.success && response.data) {
        // Redirect to order confirmation page with order ID
        router.push(
          `/buyer/order-confirmation?orderId=${response.data.orderId}`,
        );
      } else {
        console.error("Order creation failed:", response);
        setError(response.message || "Failed to create order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      const error = err as any;

      // Extract detailed error message
      let errorMessage = "Failed to place order. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error("Detailed error:", {
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
      });

      setError(errorMessage);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEFBF6] py-3.5">
      <div className="max-w-[1080px] mx-auto px-5">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0d1b2a] mb-2">Checkout</h1>
            <p className="text-xs font-medium text-[#9c9c9c]">
              Secure payment and shipping information
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-3">
          <ProgressSteps currentStep={currentStep} />
        </div>

        {/* Main Content Flexbox */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Left Side - Step Content */}
          <div className="w-full lg:w-2/3">
            {currentStep === 1 && (
              <ShippingAddress
                selectedAddress={selectedShippingAddress}
                onAddressSelect={setSelectedShippingAddress}
                selectedShippingMethod={shippingMethod}
                onShippingMethodSelect={(method) => {
                  setShippingMethod(method);
                  // Update shipping cost in cart summary
                  const shippingCost =
                    method === "express"
                      ? 100
                      : method === "overnight"
                        ? 250
                        : 0;
                  setCartSummary((prev) => ({
                    ...prev,
                    shipping: shippingCost,
                    total:
                      prev.subtotal + prev.tax + shippingCost - prev.savings,
                  }));
                }}
                onContinue={() => {
                  if (!selectedShippingAddress) {
                    setError("Please select a shipping address");
                    return;
                  }
                  setError(null);
                  setCurrentStep(2);
                }}
              />
            )}
            {currentStep === 2 && (
              <PaymentMethod
                selectedMethod={paymentMethod}
                onMethodSelect={setPaymentMethod}
                onPaymentDetailsChange={(details) =>
                  setPaymentDetails({ method: paymentMethod, ...details })
                }
                onContinue={() => {
                  setError(null);
                  setCurrentStep(3);
                }}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && (
              <ReviewOrder
                cartItems={cartItems}
                shippingAddress={selectedShippingAddress}
                billingAddress={selectedBillingAddress}
                paymentMethod={paymentMethod}
                shippingMethod={shippingMethod}
                orderNotes={orderNotes}
                onNotesChange={setOrderNotes}
                onBack={() => setCurrentStep(2)}
                onPlaceOrder={handlePlaceOrder}
                isPlacingOrder={isPlacingOrder}
              />
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-4">
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
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
