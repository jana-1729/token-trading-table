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
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 sm:pl-10 pr-8 sm:pr-10 h-9 sm:h-10 md:h-11 text-xs sm:text-sm bg-card/50 border-border/50 focus:bg-card transition-colors"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0.5 sm:right-1 top-1/2 -translate-y-1/2 h-7 w-7 sm:h-8 sm:w-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={() => onSearchChange("")}
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          )}
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {statusOptions.map((option) => (
            <Badge
              key={option.value}
              variant={statusFilter === option.value ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium whitespace-nowrap",
                statusFilter === option.value 
                  ? "ring-2 ring-primary/30 shadow-lg shadow-primary/20" 
                  : "hover:bg-accent/50 hover:border-accent-foreground/20"
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

