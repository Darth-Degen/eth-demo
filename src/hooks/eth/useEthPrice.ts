import { useQuery } from '@tanstack/react-query';

interface CoinGeckoPriceResponse {
  ethereum: {
    usd: number;
  };
}

// Custom hook to fetch the current ETH/USD price from CoinGecko
export const useEthPrice = () => {
  return useQuery({
    queryKey: ['ethPriceUSD'],
    // Query function that fetches the ETH price from CoinGecko
    queryFn: async (): Promise<number> => {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );

      if (!res.ok) {
        throw new Error('Failed to fetch ETH price');
      }

      const data: CoinGeckoPriceResponse = await res.json();

      return data.ethereum.usd;
    },
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    retry: 1,
  });
};
