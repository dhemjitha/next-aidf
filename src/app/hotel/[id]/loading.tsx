import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Skeleton */}
        <Skeleton className="w-full h-[400px] rounded-lg" />

        <div className="space-y-6">
          {/* Title and Location Skeleton */}
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />

          {/* Rating Skeleton */}
          <Skeleton className="h-6 w-1/3" />

          {/* Description Skeleton */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />

          {/* Amenities Skeleton */}
          <Skeleton className="h-20 w-full" />

          {/* Price & Button Skeleton */}
          <div className="flex justify-between">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
