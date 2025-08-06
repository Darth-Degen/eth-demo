export type Token = {
  contractAddress: `0x${string}`;
  name: string;
  symbol: string;
  balance: number;
  usdValue: number;
  decimals: number;
}

export type EnrichedToken = Token & { usdValue: number };

export type SortKey = keyof Pick<EnrichedToken, "name" | "balance" | "usdValue">;
