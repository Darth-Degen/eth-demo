export type BaseToken = {
  symbol: string;
  decimals: number;
  address: `0x${string}`;
};

export type Stablecoin = BaseToken;

export type Token = BaseToken & {
  contractAddress: `0x${string}`;
  name: string;
  balance: number;
  usdValue: number;
  isNative?: boolean; 
};

export type SwapToken = BaseToken & {
  name?: string;
  isNative?: boolean;
};
