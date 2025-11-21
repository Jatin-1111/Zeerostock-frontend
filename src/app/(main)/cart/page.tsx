import CartSidebar from "@/components/cart/CartSidebar";
import CartItems from "@/components/cart/CartItems";
import OrderSummary from "@/components/cart/OrderSummary";
import RelatedProducts from "@/components/cart/RelatedProducts";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <CartSidebar />

        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Shopping Cart
              </h1>
              <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Browse More Items
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <CartItems />
              </div>

              <div>
                <OrderSummary />
                <RelatedProducts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
