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
        <div className="container mx-auto px-4 py-8 max-w-[1600px]">
          {/* Header */}
          <header className="mb-8 space-y-2">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold">Token Discovery</h1>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              Real-time token trading data with live price updates
            </p>
          </header>

          {/* Main Content */}
          <main>
            <TokenTable />
          </main>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              Built with Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit &
              React Query
            </p>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

