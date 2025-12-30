import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TokenLogoProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

export const TokenLogo = React.memo(
  ({ src, alt, size = "md", className }: TokenLogoProps) => {
    const [error, setError] = React.useState(false);

    return (
      <div
        className={cn(
          "relative rounded-full overflow-hidden bg-secondary flex-shrink-0",
          sizeClasses[size],
          className
        )}
      >
        {!error ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="40px"
            className="object-cover"
            onError={() => setError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-muted-foreground">
            {alt.charAt(0)}
          </div>
        )}
      </div>
    );
  }
);

TokenLogo.displayName = "TokenLogo";

