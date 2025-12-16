import { notFound } from "next/navigation";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductDescription from "@/components/product/ProductDescription";
import { productService } from "@/services/product.service";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = params;

  try {
    // Fetch product details from API
    const response = await productService.getProductDetail(slug);

    if (!response.success || !response.data?.product) {
      notFound();
    }

    const product = response.data.product;

    return (
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="relative">
              <ProductImageGallery
                images={product.images || [product.image]}
                title={product.title}
              />
            </div>
            <ProductInfo product={product} />
          </div>
          <ProductDescription product={product} />
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
  const { slug } = params;

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
