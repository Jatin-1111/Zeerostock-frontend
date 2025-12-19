import { notFound } from "next/navigation";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductDescription from "@/components/product/ProductDescription";
import { productService } from "@/services/product.service";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    // Fetch product details from API
    const response = await productService.getProductDetail(slug);

    if (!response.success || !response.data?.product) {
      notFound();
    }

    const product = response.data.product;

    // Filter out empty strings from images
    const productImages = (product.images || [product.image]).filter(
      (img) => img && img.trim() !== ""
    );

    return (
      <div className="bg-[#eefbf6] min-h-screen">
        <div className="max-w-[1440px] mx-auto px-[60px] py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10.5px] font-medium font-['Poppins'] mb-4.5">
            <span className="text-[#bebebe]">Marketplace</span>
            <span className="text-[#bebebe] text-[12px]">/</span>
            <span className="text-[#bebebe]">Materials</span>
            <span className="text-[#bebebe] text-[12px]">/</span>
            <span className="text-[#0d1b2a]">{product.title as string}</span>
          </div>

          <div className="grid grid-cols-[750px_1fr] gap-7.5">
            <div className="relative">
              <ProductImageGallery
                images={productImages}
                title={product.title}
                discountPercent={product.discountPercent}
              />
            </div>
            <ProductInfo product={response.data as never} />
          </div>
          <div className="mt-6">
            <ProductDescription product={response.data as never} />
          </div>

          {/* Return Policy Section */}
          <div className="mt-6 bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] px-7.5 py-6">
            <h2 className="text-[22.5px] font-medium font-['Poppins'] text-[#0d1b2a] mb-4.5">
              Return Policy
            </h2>
            <p className="text-[18.75px] font-normal font-['Inter'] text-[#9c9c9c] leading-[24.75px]">
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
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    const response = await productService.getProductDetail(slug);

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
