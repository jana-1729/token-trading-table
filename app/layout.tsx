import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Token Trading Table - Real-time Token Discovery",
  description:
    "Discover and track cryptocurrency tokens with real-time price updates, comprehensive market data, and advanced filtering options.",
  keywords: [
    "crypto",
    "tokens",
    "trading",
    "cryptocurrency",
    "blockchain",
    "DeFi",
  ],
  authors: [{ name: "Token Trading Table" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark" storageKey="token-trading-theme">
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
