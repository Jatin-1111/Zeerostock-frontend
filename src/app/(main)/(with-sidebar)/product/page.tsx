import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductDescription from "@/components/product/ProductDescription";

export default function ProductDetailPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="relative">
            <ProductImageGallery />
          </div>
          <ProductInfo />
        </div>
        <ProductDescription />
      </div>
    </div>
  );
}
