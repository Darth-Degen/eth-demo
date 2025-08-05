import { useAccount, useChainId } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { Token } from '@types';


// Returns the correct Alchemy RPC URL based on chainId. 
const getAlchemyUrl = (chainId: number) => {
  const baseKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  if (!baseKey) return null;

  switch (chainId) {
    case 1:
      return `https://eth-mainnet.g.alchemy.com/v2/${baseKey}`;
    case 8453:
      return `https://base-mainnet.g.alchemy.com/v2/${baseKey}`;
    default:
      return null; // Unsupported chain
  }
};


// Fetches ERC-20 token balances + metadata for a given address and chain. 
const fetchTokenBalances = async ({
  address,
  chainId,
}: {
  address: `0x${string}`;
  chainId: number;
}): Promise<Token[]> => {
  const ALCHEMY_URL = getAlchemyUrl(chainId);
  if (!ALCHEMY_URL) throw new Error('Unsupported network');

  // Step 1: Get raw balances
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

  // Step 2: Get metadata (name, symbol, decimals, price) for each token
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
    console.log(
      `Token: ${meta.result.name} (${meta.result.symbol}), Balance: ${formatted}, Price: ${meta.result.usdPrice}`
    )
    return {
      contractAddress: token.contractAddress,
      name: meta.result.name,
      symbol: meta.result.symbol,
      balance: formatted,
      usdValue: meta.result.usdPrice
        ? formatted * meta.result.usdPrice
        : 0,
      decimals: decimals,
    };
  });

  // Step 3: Format, filter, and sort token list
  const resolved = await Promise.all(metadataPromises);

  return resolved 
    .sort((a, b) => b.balance - a.balance); // Sort descending
};


// Custom React hook to fetch token balances for the connected wallet.
 
export const useTokenBalances = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const query = useQuery<Token[]>({
    queryKey: ['tokenBalances', address, chainId],  
    queryFn: () => fetchTokenBalances({ address: address!, chainId }),
    enabled: !!isConnected && !!address && !!chainId,
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
