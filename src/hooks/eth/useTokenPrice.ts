import { useQuery } from '@tanstack/react-query';

//fetches the price of a specific ERC-20 token by its contract address from coingecko
export const useTokenPrice = (contractAddress: `0x${string}`) => {
  return useQuery({
    queryKey: ['tokenPrice', contractAddress],
    queryFn: async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contractAddress}&vs_currencies=usd`
      );
      const data = await res.json();
      return data[contractAddress.toLowerCase()]?.usd ?? 0;
    },
    enabled: !!contractAddress,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
};
