"use client";

import * as React from "react";
import { TokenTable } from "./tokens/TokenTable";
import { ErrorBoundary } from "./ErrorBoundary";
import { useTokens } from "@/hooks/useTokens";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppDispatch } from "@/store/hooks";
import { setTokens, setLoading, setError } from "@/store/slices/tokensSlice";
import { Activity } from "lucide-react";

export function TokenDiscovery() {
  const dispatch = useAppDispatch();
  const { data: tokens, isLoading, error } = useTokens();

  // Update Redux store when tokens are fetched
  React.useEffect(() => {
    if (tokens) {
      dispatch(setTokens(tokens));
    }
  }, [tokens, dispatch]);

  React.useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  React.useEffect(() => {
    if (error) {
      dispatch(setError(error.message));
    }
  }, [error, dispatch]);

  // Connect to WebSocket for real-time updates
  useWebSocket(tokens || []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-[1600px]">
          {/* Header */}
          <header className="mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-foreground/5 ring-1 ring-foreground/10">
                <Activity className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Token Discovery
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base ml-[52px]">
              Real-time token trading data with live price updates
            </p>
          </header>

          {/* Main Content */}
          <main>
            <TokenTable />
          </main>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border/50 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground/70">
              Built with Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit & React Query
            </p>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

