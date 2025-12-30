import * as React from "react";
import { motion } from "framer-motion";
import { MoreVertical, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TokenLogo } from "./TokenLogo";
import { PriceChange } from "./PriceChange";
import { TokenBadge } from "./TokenBadge";
import { StatusBadge } from "./StatusBadge";
import type { Token } from "@/types/token";
import {
  formatCurrency,
  formatCompactNumber,
  formatTimeAgo,
} from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TokenTableRowProps {
  token: Token;
  onViewDetails: (token: Token) => void;
  previousPrice?: number;
}

export const TokenTableRow = React.memo(
  ({ token, onViewDetails, previousPrice }: TokenTableRowProps) => {
    const priceChanged = previousPrice && previousPrice !== token.price;
    const priceIncreased = previousPrice && token.price > previousPrice;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={cn(
          "grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto_auto] lg:grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto] gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200",
          priceChanged && (priceIncreased ? "bg-success/5" : "bg-destructive/5")
        )}
      >
        {/* Token Info */}
        <div className="flex items-center gap-3 min-w-0">
          <TokenLogo src={token.logo} alt={token.symbol} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{token.name}</h3>
              <TokenBadge
                verified={token.verified}
                trending={token.trending}
                className="hidden xl:flex"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono">{token.symbol}</span>
              <StatusBadge status={token.status} />
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col justify-center min-w-0">
          <motion.p
            key={token.price}
            initial={priceChanged ? { scale: 1.1 } : false}
            animate={{ scale: 1 }}
            className="font-semibold truncate"
          >
            {formatCurrency(token.price)}
          </motion.p>
          <PriceChange value={token.change24h} showIcon={false} />
        </div>

        {/* Volume - Hidden on mobile */}
        <div className="hidden sm:flex flex-col justify-center">
          <p className="text-sm text-muted-foreground">Volume</p>
          <p className="font-medium">${formatCompactNumber(token.volume24h)}</p>
        </div>

        {/* Market Cap - Hidden on mobile */}
        <div className="hidden sm:flex flex-col justify-center">
          <p className="text-sm text-muted-foreground">Market Cap</p>
          <p className="font-medium">${formatCompactNumber(token.marketCap)}</p>
        </div>

        {/* Liquidity - Hidden on tablet and below */}
        <div className="hidden lg:flex flex-col justify-center">
          <p className="text-sm text-muted-foreground">Liquidity</p>
          <p className="font-medium">${formatCompactNumber(token.liquidity)}</p>
        </div>

        {/* Holders - Hidden on tablet and below */}
        <div className="hidden lg:flex flex-col justify-center">
          <p className="text-sm text-muted-foreground">Holders</p>
          <p className="font-medium">{formatCompactNumber(token.holders)}</p>
        </div>

        {/* Age - Hidden on tablet and below */}
        <div className="hidden lg:flex flex-col justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm text-muted-foreground cursor-help">Age</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Token creation time</p>
            </TooltipContent>
          </Tooltip>
          <p className="font-medium">{formatTimeAgo(token.age)}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewDetails(token)}
              >
                <Info className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Details</p>
            </TooltipContent>
          </Tooltip>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => onViewDetails(token)}
                >
                  View Details
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href={`https://etherscan.io/address/${token.contract}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Explorer
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Add to Watchlist
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for optimization
    return (
      prevProps.token.id === nextProps.token.id &&
      prevProps.token.price === nextProps.token.price &&
      prevProps.token.change24h === nextProps.token.change24h &&
      prevProps.previousPrice === nextProps.previousPrice
    );
  }
);

TokenTableRow.displayName = "TokenTableRow";

