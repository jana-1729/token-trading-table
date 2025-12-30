import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ExternalLink, Copy } from "lucide-react";

interface TokenDetailsDialogProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TokenDetailsDialog = React.memo(
  ({ token, open, onOpenChange }: TokenDetailsDialogProps) => {
    const [copied, setCopied] = React.useState(false);

    const copyContract = React.useCallback(() => {
      if (token?.contract) {
        navigator.clipboard.writeText(token.contract);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }, [token?.contract]);

    if (!token) return null;

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[calc(100vw-32px)] sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin p-4 sm:p-6">
          <DialogHeader>
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <TokenLogo src={token.logo} alt={token.symbol} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-base sm:text-xl md:text-2xl flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="truncate">{token.name}</span>
                  <TokenBadge
                    verified={token.verified}
                    trending={token.trending}
                  />
                </DialogTitle>
                <DialogDescription className="flex items-center gap-1.5 sm:gap-2 mt-1 flex-wrap">
                  <span className="font-mono text-xs sm:text-sm">{token.symbol}</span>
                  <StatusBadge status={token.status} />
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-5 md:space-y-6 mt-3 sm:mt-4">
            {/* Price Section */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold truncate">
                  {formatCurrency(token.price)}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">24h Change</p>
                <div className="text-sm sm:text-base">
                  <PriceChange value={token.change24h} />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Volume 24h</p>
                <p className="text-sm sm:text-base font-semibold truncate">
                  ${formatCompactNumber(token.volume24h)}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Market Cap</p>
                <p className="text-sm sm:text-base font-semibold truncate">
                  ${formatCompactNumber(token.marketCap)}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Liquidity</p>
                <p className="text-sm sm:text-base font-semibold truncate">
                  ${formatCompactNumber(token.liquidity)}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Holders</p>
                <p className="text-sm sm:text-base font-semibold truncate">
                  {formatCompactNumber(token.holders)}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Chain</p>
                <Badge variant="outline" className="text-xs">{token.chain}</Badge>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Age</p>
                <p className="text-sm sm:text-base font-semibold">{formatTimeAgo(token.age)}</p>
              </div>
            </div>

            {/* Description */}
            {token.description && (
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  Description
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">{token.description}</p>
              </div>
            )}

            {/* Contract Address */}
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                Contract Address
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-[10px] sm:text-xs bg-secondary p-2 rounded overflow-x-auto scrollbar-thin">
                  {token.contract}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyContract}
                  className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-success mt-1">
                  Copied to clipboard!
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4 border-t">
              <Button className="flex-1 h-9 sm:h-10 text-xs sm:text-sm" asChild>
                <a
                  href={`https://etherscan.io/address/${token.contract}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="hidden sm:inline">View on Explorer</span>
                  <span className="sm:hidden">Explorer</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </a>
              </Button>
              <Button variant="secondary" className="flex-1 h-9 sm:h-10 text-xs sm:text-sm">
                Trade Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

TokenDetailsDialog.displayName = "TokenDetailsDialog";
