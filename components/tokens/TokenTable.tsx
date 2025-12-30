"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { TokenTableHeader } from "./TokenTableHeader";
import { TokenTableRow } from "./TokenTableRow";
import { TokenTableSkeleton } from "./TokenTableSkeleton";
import { TokenDetailsDialog } from "./TokenDetailsDialog";
import { TokenFilters } from "./TokenFilters";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSortState } from "@/store/slices/tokensSlice";
import { setSearchQuery, setStatusFilter } from "@/store/slices/filtersSlice";
import type { Token, SortField } from "@/types/token";
import { AlertCircle } from "lucide-react";

export const TokenTable = React.memo(() => {
  const dispatch = useAppDispatch();
  const { tokens, sortState, loading, error } = useAppSelector(
    (state) => state.tokens
  );
  const filters = useAppSelector((state) => state.filters);

  const [selectedToken, setSelectedToken] = React.useState<Token | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [previousPrices, setPreviousPrices] = React.useState<
    Record<string, number>
  >({});

  // Track price changes for animations
  React.useEffect(() => {
    const newPrices: Record<string, number> = {};
    tokens.forEach((token) => {
      newPrices[token.id] = token.price;
    });
    setPreviousPrices(newPrices);
  }, [tokens]);

  // Filter tokens
  const filteredTokens = React.useMemo(() => {
    return tokens.filter((token) => {
      // Status filter
      if (filters.status !== "all" && token.status !== filters.status) {
        return false;
      }

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [tokens, filters]);

  // Sort tokens
  const sortedTokens = React.useMemo(() => {
    if (!sortState.field || !sortState.direction) {
      return filteredTokens;
    }

    const sorted = [...filteredTokens].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortState.field) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "change24h":
          aValue = a.change24h;
          bValue = b.change24h;
          break;
        case "volume":
          aValue = a.volume24h;
          bValue = b.volume24h;
          break;
        case "marketCap":
          aValue = a.marketCap;
          bValue = b.marketCap;
          break;
        case "liquidity":
          aValue = a.liquidity;
          bValue = b.liquidity;
          break;
        case "holders":
          aValue = a.holders;
          bValue = b.holders;
          break;
        case "age":
          aValue = a.age;
          bValue = b.age;
          break;
        default:
          return 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortState.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortState.direction === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return sorted;
  }, [filteredTokens, sortState]);

  const handleSort = React.useCallback(
    (field: SortField) => {
      const newDirection =
        sortState.field === field
          ? sortState.direction === "asc"
            ? "desc"
            : sortState.direction === "desc"
            ? null
            : "asc"
          : "asc";

      dispatch(
        setSortState({
          field: newDirection ? field : null,
          direction: newDirection,
        })
      );
    },
    [sortState, dispatch]
  );

  const handleViewDetails = React.useCallback((token: Token) => {
    setSelectedToken(token);
    setDialogOpen(true);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 space-y-4 rounded-xl border border-destructive/20 bg-destructive/5">
        <div className="p-3 rounded-full bg-destructive/10">
          <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-destructive" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg sm:text-xl font-semibold">Error loading tokens</p>
          <p className="text-sm text-muted-foreground max-w-md">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Filters */}
      <TokenFilters
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => dispatch(setSearchQuery(query))}
        statusFilter={filters.status}
        onStatusFilterChange={(status) => dispatch(setStatusFilter(status))}
      />

      {/* Table Container */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <TokenTableHeader
          sortField={sortState.field}
          sortDirection={sortState.direction}
          onSort={handleSort}
        />

        <div className="p-3 sm:p-4 space-y-3">
          {loading ? (
            <TokenTableSkeleton rows={10} />
          ) : sortedTokens.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 space-y-3">
              <div className="p-3 rounded-full bg-muted/50">
                <AlertCircle className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-base sm:text-lg font-semibold">No tokens found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {sortedTokens.map((token) => (
                <TokenTableRow
                  key={token.id}
                  token={token}
                  onViewDetails={handleViewDetails}
                  previousPrice={previousPrices[token.id]}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Details Dialog */}
      <TokenDetailsDialog
        token={selectedToken}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
});

TokenTable.displayName = "TokenTable";

