import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TokenTableSkeletonProps {
  rows?: number;
}

export const TokenTableSkeleton = React.memo(
  ({ rows = 10 }: TokenTableSkeletonProps) => {
    return (
      <div className="w-full space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-lg border bg-card"
          >
            {/* Logo */}
            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />

            {/* Token info */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>

            {/* Price */}
            <div className="hidden sm:block space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>

            {/* Volume */}
            <div className="hidden md:block">
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Market Cap */}
            <div className="hidden lg:block">
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Actions */}
            <Skeleton className="h-8 w-8 rounded-md flex-shrink-0" />
          </div>
        ))}
      </div>
    );
  }
);

TokenTableSkeleton.displayName = "TokenTableSkeleton";

