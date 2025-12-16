export default function ProductLoading() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery Skeleton */}
          <div className="relative">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Title */}
            <div className="space-y-3">
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Specifications */}
            <div className="flex gap-4 py-4 border-t border-b">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-24 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>

            {/* Quantity and Buttons */}
            <div className="space-y-4">
              <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 pt-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-4 mt-8">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
