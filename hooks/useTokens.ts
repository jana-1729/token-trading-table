"use client";

import { useQuery } from "@tanstack/react-query";
import { generateMockTokens } from "@/lib/mockData";
import type { Token } from "@/types/token";

/**
 * Custom hook to fetch tokens using React Query
 */
export function useTokens() {
  return useQuery<Token[], Error>({
    queryKey: ["tokens"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return generateMockTokens(30);
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
}

