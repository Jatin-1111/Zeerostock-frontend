"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressSteps from "@/components/checkout/ProgressSteps";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ReviewOrder from "@/components/checkout/ReviewOrder";
import OrderSummary from "@/components/checkout/OrderSummary";

type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const subtotal = 16125.0;
  const savings = 13264.75;
  const tax = 1290.0;
  const shipping = 0;

  const handlePlaceOrder = () => {
    router.push("/buyer/order-confirmation");
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

        {/* Progress Steps */}
        <div className="pt-10">
          <ProgressSteps currentStep={currentStep} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 px-8">
          {/* Left Side - Step Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <ShippingAddress onContinue={() => setCurrentStep(2)} />
            )}
            {currentStep === 2 && (
              <PaymentMethod
                onContinue={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && (
              <ReviewOrder
                onBack={() => setCurrentStep(2)}
                onPlaceOrder={handlePlaceOrder}
              />
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              savings={savings}
              tax={tax}
              shipping={shipping}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
