import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { Token } from '@types';

const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

// Fetcher function for token balances + metadata
const fetchTokenBalances = async (address: `0x${string}`): Promise<Token[]> => {
  const res = await fetch(ALCHEMY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'alchemy_getTokenBalances',
      params: [address],
    }),
  });

  const result = await res.json();
  const balances = result.result.tokenBalances;

  // console.log("Token Balances:", balances);

  const metadataPromises = balances.map(async (token: any) => {
    const metaRes = await fetch(ALCHEMY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'alchemy_getTokenMetadata',
        params: [token.contractAddress],
      }),
    });

    const meta = await metaRes.json();
    const decimals = meta.result.decimals || 18;
    const formatted = Number(token.tokenBalance) / Math.pow(10, decimals);

    return {
      contractAddress: token.contractAddress,
      name: meta.result.name,
      symbol: meta.result.symbol,
      balance: formatted,
      usdValue: meta.result.usdPrice ? formatted * meta.result.usdPrice : 0,
    };
  });

  const resolved = await Promise.all(metadataPromises);
  // console.log("Token Metadata:", resolved);
  return resolved
  .sort((a, b) => b.balance - a.balance);

};

// Custom hook using React Query
export const useTokenBalances = () => {
  const { address, isConnected } = useAccount();

  const query = useQuery<Token[]>({
    queryKey: ['tokenBalances', address],
    queryFn:  async () => await fetchTokenBalances(address!),
    enabled: !!isConnected && !!address,  
    staleTime: 60 * 1000,  
    refetchInterval: 60 * 1000,  
    retry: 1,
  });

  return {
    tokens: query.data ?? [],
    loading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
};
