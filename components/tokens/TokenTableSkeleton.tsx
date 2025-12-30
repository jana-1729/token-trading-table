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
            className="grid grid-cols-[1fr_auto_70px] md:grid-cols-[minmax(200px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_100px] lg:grid-cols-[minmax(200px,2fr)_minmax(120px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)_minmax(80px,1fr)_120px] gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 p-2 sm:p-3 md:p-4 lg:p-5 rounded-lg sm:rounded-xl border border-border bg-card"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Token info */}
            <div className="flex items-center gap-1.5 md:gap-3 min-w-0">
              <Skeleton className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-1 sm:space-y-1.5 md:space-y-2 min-w-0">
                <Skeleton className="h-2.5 sm:h-3 md:h-4 w-20 sm:w-24 md:w-32 lg:w-40" />
                <Skeleton className="h-2 md:h-3 w-12 sm:w-16 md:w-20 lg:w-28" />
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col justify-center space-y-1 sm:space-y-1.5 md:space-y-2 items-end md:items-start min-w-0">
              <Skeleton className="h-2.5 sm:h-3 md:h-4 w-12 sm:w-16 md:w-20" />
              <Skeleton className="h-2 md:h-3 w-10 sm:w-12 md:w-16" />
            </div>

            {/* Volume - Tablet and up */}
            <div className="hidden md:flex flex-col justify-center space-y-1.5 md:space-y-2 min-w-0">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Market Cap - Tablet and up */}
            <div className="hidden md:flex flex-col justify-center space-y-1.5 md:space-y-2 min-w-0">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Liquidity - Desktop only */}
            <div className="hidden lg:flex flex-col justify-center space-y-2 min-w-0">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Holders - Desktop only */}
            <div className="hidden lg:flex flex-col justify-center space-y-2 min-w-0">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Age - Desktop only */}
            <div className="hidden lg:flex flex-col justify-center space-y-2 min-w-0">
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-4 w-14" />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-0 sm:gap-0.5 md:gap-1.5">
              <Skeleton className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-md flex-shrink-0" />
              <Skeleton className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-md flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    );
  }
);

TokenTableSkeleton.displayName = "TokenTableSkeleton";

