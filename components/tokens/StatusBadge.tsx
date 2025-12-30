import * as React from "react";
import { Badge } from "@/components/ui/badge";
import type { TokenStatus } from "@/types/token";

interface StatusBadgeProps {
  status: TokenStatus;
}

const statusConfig = {
  new: {
    label: "New Pair",
    variant: "success" as const,
  },
  "final-stretch": {
    label: "Final Stretch",
    variant: "warning" as const,
  },
  migrated: {
    label: "Migrated",
    variant: "secondary" as const,
  },
};

export const StatusBadge = React.memo(({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Badge 
      variant={config.variant} 
      className="text-[8px] sm:text-[9px] md:text-[10px] px-1.5 sm:px-2 py-0 sm:py-0.5 font-bold leading-tight whitespace-nowrap"
    >
      {config.label}
    </Badge>
  );
});

StatusBadge.displayName = "StatusBadge";

