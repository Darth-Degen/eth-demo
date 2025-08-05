import { FC, useState } from "react";
import { Modal } from "@components";
import { Token } from "@types";
import { useSendToken, useTokenBalances } from "@hooks";
import { toast } from "react-hot-toast";
import { isAddress } from "viem";

interface Props {
  show: boolean;
  close: () => void;
  token: Token | null;
}

const SendTokenModal: FC<Props> = (props: Props) => {
  const { show, close, token } = props;

  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { sendToken, isPending, error, txHash } = useSendToken();
  const { refetch } = useTokenBalances();

  const handleSend = async () => {
    if (!token) {
      toast.error("No token selected");
      return;
    }

    // Validate address
    if (!isAddress(toAddress)) {
      toast.error("Invalid Ethereum address");
      return;
    }

    // Validate amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Enter a valid token amount");
      return;
    }

    // Validate against available balance
    if (parsedAmount > token.balance) {
      toast.error(`Insufficient ${token.symbol} balance`);
      return;
    }

    // Proceed with sending
    const toastId = toast.loading(`Sending ${amount} ${token.symbol}...`);
    try {
      await sendToken({
        tokenAddress: token.contractAddress as `0x${string}`,
        to: toAddress as `0x${string}`,
        amount: amount.toString(),
        decimals: token.decimals,
      });

      toast.success("Token sent!", { id: toastId });
      await refetch(); // Refresh balances
      close(); // Close modal
    } catch (err: any) {
      toast.error(err?.message || "Transaction failed", { id: toastId });
    }
  };

  return (
    <Modal show={show} onClick={() => close()}>
      {token ? (
        <div className="flex items-center justify-center h-full">
          <div className="bg-eth-gray-800 text-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold mb-4">Send ${token.symbol}</h2>

            <input
              type="text"
              placeholder="Recipient address"
              className="w-full p-2 rounded bg-eth-gray-700 text-white border border-gray-600 focus:outline-eth-purple "
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />

            <input
              type="number"
              placeholder="Amount"
              className="no-spinner w-full p-2 rounded bg-eth-gray-700 text-white border border-gray-600 focus:outline-eth-purple"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button
              className="bg-eth-purple transition-200 hover:bg-eth-purple-700 disabled:hover:bg-eth-purple disabled:cursor-not-allowed px-6 py-3 rounded text-sm mt-6 disabled:opacity-50"
              onClick={handleSend}
              disabled={!toAddress || !amount}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div>No token selected</div>
      )}
    </Modal>
  );
};

export default SendTokenModal;
