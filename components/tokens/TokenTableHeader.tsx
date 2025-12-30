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
          "h-auto p-2 hover:bg-accent font-semibold",
          isActive && "text-primary",
          className
        )}
      >
        {label}
        <Icon className="ml-2 h-4 w-4" />
      </Button>
    );
  }
);

HeaderCell.displayName = "HeaderCell";

export const TokenTableHeader = React.memo(
  ({ sortField, sortDirection, onSort }: TokenTableHeaderProps) => {
    return (
      <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto_auto] lg:grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto] gap-3 sm:gap-4 px-3 sm:px-4 py-2 border-b bg-muted/50 rounded-t-lg">
        {/* Token */}
        <div className="flex items-center min-w-[200px]">
          <HeaderCell
            field="name"
            label="Token"
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        </div>

        {/* Price */}
        <div className="flex items-center justify-start">
          <HeaderCell
            field="price"
            label="Price"
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        </div>

        {/* Volume */}
        <div className="hidden sm:flex items-center justify-start">
          <HeaderCell
            field="volume"
            label="Volume 24h"
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        </div>

        {/* Market Cap */}
        <div className="hidden sm:flex items-center justify-start">
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
          <span className="text-sm font-semibold text-muted-foreground">
            Actions
          </span>
        </div>
      </div>
    );
  }
);

TokenTableHeader.displayName = "TokenTableHeader";

