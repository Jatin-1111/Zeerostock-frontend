export default function RelatedProducts() {
  const products = [
    { title: "Related Product 1", price: "₹45.00" },
    { title: "Related Product 2", price: "₹45.00" },
    { title: "Related Product 3", price: "₹45.00" },
  ];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        You might also like
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
              <span className="text-xs text-gray-400">Product Image</span>
            </div>
            <div className="p-3">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                {product.title}
              </h4>
              <p className="text-base font-bold text-gray-900 mb-3">
                {product.price}
              </p>
              <button className="w-full py-2 border border-gray-900 text-gray-900 rounded text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
