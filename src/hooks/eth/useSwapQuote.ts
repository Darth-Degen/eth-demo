import { useQuery } from '@tanstack/react-query';

interface SwapQuoteParams {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string; // in base units (e.g. wei)
  userAddress: string;
}

export const useSwapQuote = (params?: SwapQuoteParams) => {
  return useQuery({
    queryKey: ['swapQuote', params],
    enabled: !!params?.fromTokenAddress && !!params?.toTokenAddress && !!params?.amount && !!params?.userAddress,
    staleTime: 60_000,
    queryFn: async () => {
      const { fromTokenAddress, toTokenAddress, amount, userAddress } = params!;

      const res = await fetch(
        `https://api.0x.org/swap/v1/quote?buyToken=${toTokenAddress}&sellToken=${fromTokenAddress}&sellAmount=${amount}&takerAddress=${userAddress}`
      );

      if (!res.ok) throw new Error('Failed to fetch swap quote');
      return res.json();
    },
  });
};
