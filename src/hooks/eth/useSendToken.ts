import { erc20Abi } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';

export const useSendToken = () => {
  const { address: from } = useAccount();
  const { writeContractAsync, isPending, error, data } = useWriteContract();

  const sendToken = async ({
    tokenAddress,
    to,
    amount,
    decimals,
  }: {
    tokenAddress: `0x${string}`;
    to: `0x${string}`;
    amount: string;
    decimals: number;
  }) => {
    if (!from) throw new Error('No sender wallet connected');
    const value = parseUnits(amount, decimals); // formats based on token decimals

    return await writeContractAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'transfer',
      args: [to, value],
    });
  };

  return {
    sendToken,
    isPending,
    error,
    txHash: data,
  };
};
