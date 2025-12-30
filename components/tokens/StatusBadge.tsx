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

  return <Badge variant={config.variant}>{config.label}</Badge>;
});

StatusBadge.displayName = "StatusBadge";

