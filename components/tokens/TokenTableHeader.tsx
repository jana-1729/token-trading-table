import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SortField, SortDirection } from "@/types/token";
import { cn } from "@/lib/utils";

interface TokenTableHeaderProps {
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

interface HeaderCellProps {
  field: SortField;
  label: string;
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  className?: string;
}

const HeaderCell = React.memo(
  ({
    field,
    label,
    sortField,
    sortDirection,
    onSort,
    className,
  }: HeaderCellProps) => {
    const isActive = sortField === field;
    const Icon = isActive
      ? sortDirection === "asc"
        ? ArrowUp
        : ArrowDown
      : ArrowUpDown;

    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onSort(field)}
        className={cn(
          "h-auto p-1 sm:p-1.5 md:p-2 hover:bg-accent font-semibold text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider transition-all",
          isActive && "text-foreground bg-accent",
          className
        )}
      >
        <span className="truncate">{label}</span>
        <Icon className={cn("ml-0.5 sm:ml-1 md:ml-1.5 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 flex-shrink-0 transition-transform", isActive && "scale-110")} />
      </Button>
    );
  }
);

HeaderCell.displayName = "HeaderCell";

export const TokenTableHeader = React.memo(
  ({ sortField, sortDirection, onSort }: TokenTableHeaderProps) => {
    return (
      <div className="grid grid-cols-[1fr_auto_70px] md:grid-cols-[minmax(200px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_100px] lg:grid-cols-[minmax(200px,2fr)_minmax(120px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)_minmax(80px,1fr)_120px] gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 px-2 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-3 border-b border-border bg-card/50 backdrop-blur-sm rounded-t-lg sm:rounded-t-xl sticky top-0 z-10">
        {/* Token */}
        <div className="flex items-center min-w-0">
          <HeaderCell
            field="name"
            label="Token"
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
            className="text-[10px] md:text-xs"
          />
        </div>

        {/* Price */}
        <div className="flex items-center justify-end md:justify-start min-w-0">
          <HeaderCell
            field="price"
            label="Price"
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
            className="text-[10px] md:text-xs"
          />
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center justify-start min-w-0">
          <HeaderCell
            field="volume"
            label="Volume 24h"
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        </div>

        {/* Market Cap */}
        <div className="hidden md:flex items-center justify-start min-w-0">
          <HeaderCell
            field="marketCap"
            label="Market Cap"
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        </div>

        {/* Liquidity */}
        <div className="hidden lg:flex items-center justify-start">
          <HeaderCell
            field="liquidity"
            label="Liquidity"
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        </div>

        {/* Holders */}
        <div className="hidden lg:flex items-center justify-start">
          <HeaderCell
            field="holders"
            label="Holders"
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        </div>

        {/* Age */}
        <div className="hidden lg:flex items-center justify-start">
          <HeaderCell
            field="age"
            label="Age"
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center">
          <span className="text-[8px] sm:text-[9px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
            Actions
          </span>
        </div>
      </div>
    );
  }
);

TokenTableHeader.displayName = "TokenTableHeader";

