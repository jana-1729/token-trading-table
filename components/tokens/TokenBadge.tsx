import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenBadgeProps {
  verified?: boolean;
  trending?: boolean;
  className?: string;
}

export const TokenBadge = React.memo(
  ({ verified, trending, className }: TokenBadgeProps) => {
    if (!verified && !trending) return null;

    return (
      <div className={cn("flex items-center gap-1", className)}>
        {verified && (
          <Badge variant="secondary" className="gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span className="hidden sm:inline">Verified</span>
          </Badge>
        )}
        {trending && (
          <Badge variant="warning" className="gap-1">
            <TrendingUp className="w-3 h-3" />
            <span className="hidden sm:inline">Trending</span>
          </Badge>
        )}
      </div>
    );
  }
);

TokenBadge.displayName = "TokenBadge";

