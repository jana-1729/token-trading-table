import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TokenStatus } from "@/types/token";
import { cn } from "@/lib/utils";

interface TokenFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: TokenStatus | "all";
  onStatusFilterChange: (status: TokenStatus | "all") => void;
}

const statusOptions: Array<{ value: TokenStatus | "all"; label: string }> = [
  { value: "all", label: "All Tokens" },
  { value: "new", label: "New Pairs" },
  { value: "final-stretch", label: "Final Stretch" },
  { value: "migrated", label: "Migrated" },
];

export const TokenFilters = React.memo(
  ({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
  }: TokenFiltersProps) => {
    return (
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tokens by name or symbol..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => onSearchChange("")}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Badge
              key={option.value}
              variant={statusFilter === option.value ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105",
                statusFilter === option.value && "ring-2 ring-primary"
              )}
              onClick={() => onStatusFilterChange(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>
    );
  }
);

TokenFilters.displayName = "TokenFilters";

