import { useQuery } from '@tanstack/react-query';

// Define the expected shape of the CoinGecko API response
interface CoinGeckoPriceResponse {
  ethereum: {
    usd: number;
  };
}

// Custom hook to fetch the current ETH/USD price from CoinGecko
export const useEthPrice = () => {
  return useQuery({
    // Unique key for caching and invalidation
    queryKey: ['ethPriceUSD'],

    // Query function that fetches the ETH price from CoinGecko
    queryFn: async (): Promise<number> => {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );

      // If the response fails, throw an error to be caught by React Query
      if (!res.ok) {
        throw new Error('Failed to fetch ETH price');
      }

      const data: CoinGeckoPriceResponse = await res.json();

      // Return just the ETH price in USD
      return data.ethereum.usd;
    },

    // Optional: how long the cached data stays fresh (1 minute)
    staleTime: 60 * 1000,

    // Optional: automatically refetch every 1 minute
    refetchInterval: 60 * 1000,

    // Optional: retry once on failure
    retry: 1,
  });
};
