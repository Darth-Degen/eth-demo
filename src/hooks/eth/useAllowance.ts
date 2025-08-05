import { useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';
import { useAccount } from 'wagmi';

// uses useReadContract to get how much a spender is approved to spend
export const useAllowance = ({
  tokenAddress,
  spenderAddress,
}: {
  tokenAddress: `0x${string}`;
  spenderAddress: `0x${string}`;
}) => {
  const { address: owner } = useAccount();

  return useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [owner!, spenderAddress],
    query: {
      enabled: !!owner && !!tokenAddress && !!spenderAddress,
    },
  });
};
