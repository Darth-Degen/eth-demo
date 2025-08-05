import { useAccount, useChainId } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { Token } from '@types';


// returns the correct Alchemy RPC URL based on chainId. 
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


// fetches ERC-20 token balances + metadata for a given address and chain. 
const fetchTokenBalances = async ({
  address,
  chainId,
}: {
  address: `0x${string}`;
  chainId: number;
}): Promise<Token[]> => {
  const ALCHEMY_URL = getAlchemyUrl(chainId);
  if (!ALCHEMY_URL) throw new Error('Unsupported network');

  // step 1: get raw balances
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

  // step 2: get metadata (name, symbol, decimals, price) for each token
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
      usdValue: meta.result.usdPrice
        ? formatted * meta.result.usdPrice
        : 0,
      decimals: decimals,
    };
  });

  // step 3: format, filter, and sort token list
  const resolved = await Promise.all(metadataPromises);

  return resolved 
    .sort((a, b) => b.balance - a.balance);  
};


// fetch token balances for the connected wallet.
 
export const useTokenBalances = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const query = useQuery<Token[]>({
    queryKey: ['tokenBalances', address, chainId],  
    queryFn: () => fetchTokenBalances({ address: address!, chainId }),
    enabled: !!isConnected && !!address && !!chainId,
    staleTime: 600 * 1000,        
    refetchInterval: 600 * 1000,  
    retry: 1,                    
  });

  return {
    tokens: query.data ?? [],
    loading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
};
