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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <TokenLogo src={token.logo} alt={token.symbol} size="lg" />
              <div className="flex-1">
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {token.name}
                  <TokenBadge
                    verified={token.verified}
                    trending={token.trending}
                  />
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-1">
                  <span className="font-mono">{token.symbol}</span>
                  <StatusBadge status={token.status} />
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Price Section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(token.price)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">24h Change</p>
                <PriceChange value={token.change24h} />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Volume 24h</p>
                <p className="font-semibold">
                  ${formatCompactNumber(token.volume24h)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
                <p className="font-semibold">
                  ${formatCompactNumber(token.marketCap)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Liquidity</p>
                <p className="font-semibold">
                  ${formatCompactNumber(token.liquidity)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Holders</p>
                <p className="font-semibold">
                  {formatCompactNumber(token.holders)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Chain</p>
                <Badge variant="outline">{token.chain}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Age</p>
                <p className="font-semibold">{formatTimeAgo(token.age)}</p>
              </div>
            </div>

            {/* Description */}
            {token.description && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Description
                </p>
                <p className="text-sm">{token.description}</p>
              </div>
            )}

            {/* Contract Address */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Contract Address
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-secondary p-2 rounded overflow-x-auto">
                  {token.contract}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyContract}
                  className="flex-shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-success mt-1">
                  Copied to clipboard!
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Button className="flex-1" asChild>
                <a
                  href={`https://etherscan.io/address/${token.contract}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Explorer
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button variant="secondary" className="flex-1">
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
