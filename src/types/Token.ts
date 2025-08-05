export interface Token {
  contractAddress: `0x${string}`;
  name: string;
  symbol: string;
  balance: number;
  usdValue: number;
  decimals: number;
}
