import { notFound } from "next/navigation";
import { cache } from "react";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductDescription from "@/components/product/ProductDescription";
import { productService } from "@/services/product.service";

// Cache the product fetch to prevent duplicate API calls in generateMetadata and page
const getProduct = cache(async (slug: string) => {
  return await productService.getProductDetail(slug);
});

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    // Fetch product details from API (deduplicated)
    const response = await getProduct(slug);

    if (!response.success || !response.data?.product) {
      notFound();
    }

    const product = response.data.product;

    // Filter out empty strings from images
    const productImages = (product.images || [product.image]).filter(
      (img) => img && img.trim() !== "",
    );

    return (
      <div className="min-h-screen bg-[#eefbf6]">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-5 py-4 sm:py-6">
          {/* Image Gallery and Product Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-5">
            <div>
              <ProductImageGallery
                images={productImages}
                title={product.title}
                discountPercent={product.discountPercent}
              />
            </div>
            <div>
              <ProductInfo product={response.data as never} />
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-5">
            <ProductDescription product={response.data as never} />
          </div>

          {/* Return Policy Section */}
          <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-4 sm:p-6">
            <h2 className="text-[15px] font-medium text-[#0d1b2a] mb-4">
              Return Policy
            </h2>
            <p className="text-[12.5px] font-normal text-[#9c9c9c] leading-[14px]">
              {(product.returnPolicy as string) ||
                "30-day return policy for unused items in original packaging. Buyer responsible for return shipping costs."}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    notFound();
  }
}

// Generate metadata for SEO
// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    const response = await getProduct(slug);

    if (!response.success || !response.data?.product) {
      return {
        title: "Product Not Found",
      };
    }

    const product = response.data.product;

    return {
      title: `${product.title} | Zeerostock`,
      description:
        product.description?.substring(0, 160) ||
        `Buy ${product.title} at best price`,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch {
    return {
      title: "Product Not Found",
    };
  }
}
