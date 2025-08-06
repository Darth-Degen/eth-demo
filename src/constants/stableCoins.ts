import type { Stablecoin, SwapToken } from "@types";

export const STABLECOINS: Stablecoin[] = [
  {
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
  },
  {
    symbol: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6,
  },
  {
    symbol: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
  },
];

export const SWAP_TARGETS: SwapToken[] = [
  ...STABLECOINS,
  {
    symbol: "ETH",
    name: "Ether",
    decimals: 18,
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    isNative: true,
  },
];
