import { ProductDetail } from "@/types/api.types";

interface ProductDescriptionProps {
  product: ProductDetail;
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Product Description
      </h2>

      <p className="text-gray-700 mb-6 leading-relaxed">
        {product.description || "No description available for this product."}
      </p>

      {/* Condition Badge */}
      <div className="mb-8">
        <span
          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
            product.condition === "new"
              ? "bg-green-100 text-green-800"
              : product.condition === "like-new"
              ? "bg-blue-100 text-blue-800"
              : product.condition === "good"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          Condition:{" "}
          {product.condition.charAt(0).toUpperCase() +
            product.condition.slice(1).replace("-", " ")}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Technical Specifications */}
        {product.specifications &&
          Object.keys(product.specifications).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Technical Specifications
              </h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-gray-200"
                  >
                    <span className="text-gray-600 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Shipping Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Shipping & Delivery
          </h3>
          <div className="space-y-3">
            {product.city && product.state && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Ships From</span>
                <span className="font-semibold text-gray-900">
                  {product.city}, {product.state}
                </span>
              </div>
            )}
            {product.stockQuantity && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Available Stock</span>
                <span className="font-semibold text-gray-900">
                  {product.stockQuantity} units
                </span>
              </div>
            )}
            {product.minimumOrderQuantity && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Minimum Order</span>
                <span className="font-semibold text-gray-900">
                  {product.minimumOrderQuantity} units
                </span>
              </div>
            )}
            {product.shippingInfo && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Shipping Info</span>
                <span className="font-semibold text-gray-900">
                  {product.shippingInfo}
                </span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Listing Type</span>
              <span className="font-semibold text-gray-900 capitalize">
                {product.listingType}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Warranty & Return Policy */}
      <div className="grid md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-200">
        {product.warranty && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Warranty Information
            </h3>
            <p className="text-gray-700 leading-relaxed">{product.warranty}</p>
          </div>
        )}

        {product.returnPolicy && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Return Policy
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {product.returnPolicy}
            </p>
          </div>
        )}

        {!product.warranty && !product.returnPolicy && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Terms & Conditions
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Please contact the seller for warranty and return policy
              information.
            </p>
          </div>
        )}
      </div>

      {/* Category & Industry Tags */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Product Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {product.category && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {product.category.name}
            </span>
          )}
          {product.industry && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {product.industry.name}
            </span>
          )}
          {product.isFeatured && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
              ⭐ Featured
            </span>
          )}
          {product.isSponsored && (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              💎 Sponsored
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
