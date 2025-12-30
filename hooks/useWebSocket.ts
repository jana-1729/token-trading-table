"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateTokenPrice } from "@/store/slices/tokensSlice";
import {
  setConnected,
  setLastUpdate,
  setWebSocketError,
} from "@/store/slices/websocketSlice";
import { websocketService } from "@/lib/websocket";
import type { Token, PriceUpdate } from "@/types/token";

/**
 * Custom hook to manage WebSocket connection for real-time price updates
 */
export function useWebSocket(tokens: Token[]) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tokens.length === 0) {
      return;
    }

    // Connect to WebSocket
    try {
      websocketService.connect(tokens);
      dispatch(setConnected(true));

      // Subscribe to price updates
      const unsubscribe = websocketService.subscribe(
        (update: PriceUpdate) => {
          dispatch(
            updateTokenPrice({
              tokenId: update.tokenId,
              price: update.price,
              change24h: update.change24h,
            })
          );
          dispatch(setLastUpdate(update.timestamp));
        }
      );

      // Cleanup on unmount
      return () => {
        unsubscribe();
        websocketService.disconnect();
        dispatch(setConnected(false));
      };
    } catch (error) {
      dispatch(
        setWebSocketError(
          error instanceof Error ? error.message : "WebSocket connection failed"
        )
      );
    }
  }, [tokens, dispatch]);
}

