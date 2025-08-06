import { useSendTransaction } from 'wagmi';

// this hook will execute a swap transaction using the provided transaction data and recipient address
export const useExecuteSwap = () => {
  const { sendTransactionAsync } = useSendTransaction();

  const executeSwap = async (txData: string, to: string) => {
    return await sendTransactionAsync({
      to: to as `0x${string}`,
      data: txData as `0x${string}`,
    });
  };

  return { executeSwap };
};
