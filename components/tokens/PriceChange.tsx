import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPercentage } from "@/lib/utils";

interface PriceChangeProps {
  value: number;
  showIcon?: boolean;
  className?: string;
}

export const PriceChange = React.memo(
  ({ value, showIcon = true, className }: PriceChangeProps) => {
    const isPositive = value >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;

    return (
      <div
        className={cn(
          "flex items-center gap-1 font-semibold transition-colors duration-300 text-xs sm:text-sm",
          isPositive ? "text-success" : "text-destructive",
          className
        )}
      >
        {showIcon && <Icon className="w-3.5 h-3.5" />}
        <span>{formatPercentage(value)}</span>
      </div>
    );
  }
);

PriceChange.displayName = "PriceChange";

