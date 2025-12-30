import type { Token, TokenStatus } from "@/types/token";

const tokenNames = [
  { name: "Pepe Coin", symbol: "PEPE" },
  { name: "Shiba Inu", symbol: "SHIB" },
  { name: "Dogecoin", symbol: "DOGE" },
  { name: "Floki Inu", symbol: "FLOKI" },
  { name: "Baby Doge", symbol: "BABYDOGE" },
  { name: "SafeMoon", symbol: "SAFEMOON" },
  { name: "Akita Inu", symbol: "AKITA" },
  { name: "Kishu Inu", symbol: "KISHU" },
  { name: "Saitama", symbol: "SAITAMA" },
  { name: "Hoge Finance", symbol: "HOGE" },
  { name: "Dogelon Mars", symbol: "ELON" },
  { name: "Samoyedcoin", symbol: "SAMO" },
  { name: "Pitbull", symbol: "PIT" },
  { name: "Corgi Inu", symbol: "CORGI" },
  { name: "Hokkaido Inu", symbol: "HOKK" },
  { name: "Shih Tzu", symbol: "SHIH" },
  { name: "Pomeranian", symbol: "POM" },
  { name: "Husky Token", symbol: "HUSKY" },
  { name: "Dachshund", symbol: "DACH" },
  { name: "Pug Token", symbol: "PUG" },
];

const chains = ["Ethereum", "BSC", "Polygon", "Arbitrum", "Base"];

/**
 * Generate a random token
 */
function generateToken(index: number, status: TokenStatus): Token {
  const tokenInfo = tokenNames[index % tokenNames.length];
  const basePrice = Math.random() * 10;
  const age = Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000; // Random age up to 30 days

  return {
    id: `token-${status}-${index}`,
    name: tokenInfo.name,
    symbol: tokenInfo.symbol,
    logo: `https://api.dicebear.com/7.x/identicon/svg?seed=${tokenInfo.symbol}`,
    price: basePrice,
    change24h: (Math.random() - 0.5) * 40, // -20% to +20%
    volume24h: Math.random() * 10_000_000,
    marketCap: Math.random() * 100_000_000,
    liquidity: Math.random() * 5_000_000,
    holders: Math.floor(Math.random() * 50_000),
    age,
    status,
    chain: chains[Math.floor(Math.random() * chains.length)],
    contract: `0x${Math.random().toString(16).substring(2, 42)}`,
    verified: Math.random() > 0.3,
    trending: Math.random() > 0.7,
    description: `${tokenInfo.name} is a community-driven token on ${
      chains[Math.floor(Math.random() * chains.length)]
    }.`,
  };
}

/**
 * Generate mock tokens for all statuses
 */
export function generateMockTokens(count: number = 30): Token[] {
  const tokens: Token[] = [];
  const statuses: TokenStatus[] = ["new", "final-stretch", "migrated"];

  for (let i = 0; i < count; i++) {
    const status = statuses[i % statuses.length];
    tokens.push(generateToken(i, status));
  }

  return tokens;
}

/**
 * Generate a price update for a token
 */
export function generatePriceUpdate(token: Token): {
  price: number;
  change24h: number;
} {
  // Simulate small price movements (-5% to +5%)
  const priceChange = (Math.random() - 0.5) * 0.1;
  const newPrice = token.price * (1 + priceChange);
  const newChange = token.change24h + priceChange * 100;

  return {
    price: newPrice,
    change24h: newChange,
  };
}

