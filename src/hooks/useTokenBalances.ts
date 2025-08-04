import { useAccount } from 'wagmi';
import { useCallback, useEffect, useState } from 'react';
import { Token } from '@types';
 

export const useTokenBalances = () => {
  const { address, isConnected } = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBalances = useCallback(async () => {
    if (!isConnected || !address) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`, {
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

      const metadataPromises = balances.map(async (token: any) => {
        const metaRes = await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`, {
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
      const sorted = resolved
        .filter((t) => t.usdValue > 0)
        .sort((a, b) => b.usdValue - a.usdValue);

      setTokens(sorted);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [address, isConnected]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  return { tokens, loading, error, refetch: fetchBalances };
};
