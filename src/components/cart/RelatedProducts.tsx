import Image from "next/image";

export default function RelatedProducts() {
  const products = [
    {
      title: "Microcontroller",
      price: "₹45,000",
      image:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/placeholder-product.svg",
    },
    {
      title: "Fashion clothes",
      price: "₹30,500",
      image:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/placeholder-product.svg",
    },
    {
      title: "Spare Parts",
      price: "₹110,000",
      image:
        "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/placeholder-product.svg",
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-md p-2 sm:p-3 md:p-2.5">
      <h3 className="text-[10px] sm:text-xs md:text-[10px] font-medium text-[#0d1b2a] mb-2 sm:mb-2.5">
        You might also like
      </h3>

      <div className="space-y-0">
        {products.map((product, index) => (
          <div key={index}>
            <div className="flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2">
              {/* Product Image */}
              <div className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[33px] md:h-[33px] bg-gray-100 rounded-lg shrink-0 relative overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] text-gray-400">
                    No Image
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[9px] sm:text-[10px] md:text-[8px] font-medium text-[#0d1b2a] mb-0.5 sm:mb-1 truncate">
                  {product.title}
                </h4>
                <p className="text-[8px] sm:text-[9px] md:text-[8px] font-semibold text-[#2aae7a] tracking-wide">
                  {product.price}
                </p>
              </div>
            </div>

            {/* Divider (except after last item) */}
            {index < products.length - 1 && (
              <div className="border-t border-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
