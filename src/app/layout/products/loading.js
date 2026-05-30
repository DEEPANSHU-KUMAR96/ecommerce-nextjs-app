import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-6 py-12">

        {/* Heading Skeleton */}
        <div className="mb-12 flex justify-center">
          <Skeleton className="h-12 w-72 rounded-xl" />
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-2xl border border-border bg-card p-4"
            >
              {/* Product Image */}
              <Skeleton className="h-64 w-full rounded-xl" />

              {/* Category */}
              <Skeleton className="h-5 w-24 rounded-full" />

              {/* Product Title */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              {/* Rating */}
              <Skeleton className="h-4 w-28" />

              {/* Price + Button */}
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-10 w-28 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;