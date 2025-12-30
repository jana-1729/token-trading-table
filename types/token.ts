/**
 * Token status types
 */
export type TokenStatus = "new" | "final-stretch" | "migrated";

/**
 * Sort direction
 */
export type SortDirection = "asc" | "desc" | null;

/**
 * Sort field options
 */
export type SortField =
  | "name"
  | "price"
  | "change24h"
  | "volume"
  | "marketCap"
  | "liquidity"
  | "holders"
  | "age";

/**
 * Token interface
 */
export interface Token {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  age: number; // timestamp
  status: TokenStatus;
  chain: string;
  contract: string;
  verified: boolean;
  trending: boolean;
  description?: string;
}

/**
 * Price update from WebSocket
 */
export interface PriceUpdate {
  tokenId: string;
  price: number;
  change24h: number;
  timestamp: number;
}

/**
 * Table sort state
 */
export interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

/**
 * Filter state
 */
export interface FilterState {
  status: TokenStatus | "all";
  verified: boolean | null;
  trending: boolean | null;
  minPrice: number | null;
  maxPrice: number | null;
  minVolume: number | null;
  searchQuery: string;
}

/**
 * WebSocket connection state
 */
export interface WebSocketState {
  connected: boolean;
  lastUpdate: number | null;
  error: string | null;
}

