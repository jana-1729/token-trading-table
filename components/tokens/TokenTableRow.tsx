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
          "grid grid-cols-[1fr_auto_70px] md:grid-cols-[minmax(200px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_100px] lg:grid-cols-[minmax(200px,2fr)_minmax(120px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)_minmax(80px,1fr)_120px] gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 p-2 sm:p-3 md:p-4 lg:p-5 rounded-lg sm:rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-foreground/10 transition-all duration-300 group",
          priceChanged && (priceIncreased ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20")
        )}
      >
        {/* Token Info */}
        <div className="flex items-center gap-1.5 md:gap-3 min-w-0">
          <div className="relative group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
            <TokenLogo src={token.logo} alt={token.symbol} size="sm" className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 md:gap-2 mb-0.5">
              <h3 className="font-semibold truncate text-[11px] sm:text-xs md:text-sm lg:text-base group-hover:text-foreground transition-colors leading-tight">
                {token.name}
              </h3>
              <TokenBadge
                verified={token.verified}
                trending={token.trending}
                className="hidden xl:flex"
              />
            </div>
            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">
              <span className="font-mono font-medium truncate">{token.symbol}</span>
              <StatusBadge status={token.status} />
            </div>
          </div>
        </div>

        {/* Price - Always visible */}
        <div className="flex flex-col justify-center min-w-0 text-right md:text-left">
          <motion.p
            key={token.price}
            initial={priceChanged ? { scale: 1.15 } : false}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="font-bold truncate text-[11px] sm:text-xs md:text-sm lg:text-base leading-tight"
          >
            {formatCurrency(token.price)}
          </motion.p>
          <PriceChange value={token.change24h} showIcon={false} className="justify-end md:justify-start text-[9px] sm:text-xs" />
        </div>

        {/* Volume - Hidden on mobile */}
        <div className="hidden md:flex flex-col justify-center min-w-0">
          <p className="text-xs text-muted-foreground mb-0.5">Volume</p>
          <p className="font-semibold truncate text-sm">${formatCompactNumber(token.volume24h)}</p>
        </div>

        {/* Market Cap - Hidden on mobile */}
        <div className="hidden md:flex flex-col justify-center min-w-0">
          <p className="text-xs text-muted-foreground mb-0.5">Market Cap</p>
          <p className="font-semibold truncate text-sm">${formatCompactNumber(token.marketCap)}</p>
        </div>

        {/* Liquidity - Hidden on tablet and below */}
        <div className="hidden lg:flex flex-col justify-center min-w-0">
          <p className="text-xs text-muted-foreground mb-0.5">Liquidity</p>
          <p className="font-semibold truncate text-sm">${formatCompactNumber(token.liquidity)}</p>
        </div>

        {/* Holders - Hidden on tablet and below */}
        <div className="hidden lg:flex flex-col justify-center min-w-0">
          <p className="text-xs text-muted-foreground mb-0.5">Holders</p>
          <p className="font-semibold truncate text-sm">{formatCompactNumber(token.holders)}</p>
        </div>

        {/* Age - Hidden on tablet and below */}
        <div className="hidden lg:flex flex-col justify-center min-w-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-xs text-muted-foreground cursor-help mb-0.5">Age</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Token creation time</p>
            </TooltipContent>
          </Tooltip>
          <p className="font-semibold truncate text-sm">{formatTimeAgo(token.age)}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-0 sm:gap-0.5 md:gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewDetails(token)}
                className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 hover:bg-accent hover:text-foreground transition-all opacity-60 group-hover:opacity-100 p-0"
              >
                <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Details</p>
            </TooltipContent>
          </Tooltip>

          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 hover:bg-accent transition-all opacity-60 group-hover:opacity-100 p-0"
              >
                <MoreVertical className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-2">
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-9 text-sm hover:bg-accent"
                  onClick={() => onViewDetails(token)}
                >
                  <Info className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-9 text-sm hover:bg-accent"
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
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-9 text-sm hover:bg-accent"
                >
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

