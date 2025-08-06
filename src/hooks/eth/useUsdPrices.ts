import { useQuery } from "@tanstack/react-query";
import { useChainId } from "wagmi";

// mapping between chainId and CoinGecko platform param
const getCoinGeckoPlatform = (chainId: number): string | null => {
  switch (chainId) {
    case 1:
      return "ethereum";
    case 8453:
      return "base";
    case 137:
      return "polygon-pos";
    case 42161:
      return "arbitrum-one";
    default:
      return null;
  }
};

// fetches the USD prices of multiple ERC-20 tokens by their contract addresses
export const useUsdPrices = (contractAddresses: `0x${string}`[]) => {
  const key = process.env.NEXT_PUBLIC_COINGECKO_API_KEY; 
  const chainId = useChainId();
  const platform = getCoinGeckoPlatform(chainId);

  const query =  useQuery({
    queryKey: ["usdPrices", contractAddresses, platform],
    enabled: !!platform && contractAddresses.length > 0 && !!key,
    staleTime: 60_000,
    refetchInterval: 60_000,
    queryFn: async () => {
      const ids = contractAddresses.map(addr => addr.toLowerCase()).join(",");

      const url = `https://api.coingecko.com/api/v3/simple/token_price/${platform}?contract_addresses=${ids}&vs_currencies=usd&x_cg_demo_api_key=${key}`;
      const res = await fetch(url); 

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data?.status?.error_message || "CoinGecko request failed");
      }

      return data;
    },
  });

  return {
    prices: query.data ?? {},
    loading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
  }
};
