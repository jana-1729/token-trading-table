import type { Token, PriceUpdate } from "@/types/token";
import { generatePriceUpdate } from "./mockData";

/**
 * Mock WebSocket service for real-time price updates
 */
export class MockWebSocketService {
  private subscribers: Set<(update: PriceUpdate) => void> = new Set();
  private intervalId: NodeJS.Timeout | null = null;
  private tokens: Token[] = [];
  private isConnected: boolean = false;

  /**
   * Connect to the mock WebSocket
   */
  connect(tokens: Token[]): void {
    if (this.isConnected) {
      return;
    }

    this.tokens = tokens;
    this.isConnected = true;

    // Simulate price updates every 2-5 seconds
    this.intervalId = setInterval(() => {
      this.sendRandomUpdate();
    }, Math.random() * 3000 + 2000);
  }

  /**
   * Disconnect from the mock WebSocket
   */
  disconnect(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isConnected = false;
    this.subscribers.clear();
  }

  /**
   * Subscribe to price updates
   */
  subscribe(callback: (update: PriceUpdate) => void): () => void {
    this.subscribers.add(callback);

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Send a random price update to all subscribers
   */
  private sendRandomUpdate(): void {
    if (this.tokens.length === 0) {
      return;
    }

    // Pick a random token
    const randomToken = this.tokens[Math.floor(Math.random() * this.tokens.length)];
    const update = generatePriceUpdate(randomToken);

    const priceUpdate: PriceUpdate = {
      tokenId: randomToken.id,
      price: update.price,
      change24h: update.change24h,
      timestamp: Date.now(),
    };

    // Notify all subscribers
    this.subscribers.forEach((callback) => {
      callback(priceUpdate);
    });
  }

  /**
   * Check if connected
   */
  get connected(): boolean {
    return this.isConnected;
  }
}

// Singleton instance
export const websocketService = new MockWebSocketService();

