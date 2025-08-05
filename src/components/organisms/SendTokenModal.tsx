import { FC, useState } from "react";
import { Modal } from "@components";
import { Token } from "@types";
import { useSendToken } from "@hooks";
import { toast } from "react-hot-toast";

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

  console.log("token.decimals:", token?.decimals);
  const handleSend = async () => {
    if (!token) {
      toast.error("No token found");
      return;
    }

    const toastId = toast.loading(`Sending ${amount} ${token.symbol}...`);

    try {
      await sendToken({
        tokenAddress: token.contractAddress as `0x${string}`,
        to: toAddress as `0x${string}`,
        amount: amount.toString(),
        decimals: token.decimals,
      });

      toast.success("Token sent!", { id: toastId });
      close(); // close modal on success
    } catch (err: any) {
      toast.error(err?.message || "Transaction failed", { id: toastId });
    }
  };

  return (
    <Modal
      show={show}
      onClick={() => close()}
      className="w-[95vw] sm:w-[500px] h-[360px]"
    >
      {token ? (
        <div className="flex items-center justify-center h-full">
          <div className="bg-eth-gray-800 text-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Send ${token.symbol}</h2>

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
              className="w-full p-2 rounded bg-eth-gray-700 text-white border border-gray-600 focus:outline-eth-purple"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button
              className="bg-eth-purple transition-200 hover:bg-eth-purple-700 px-6 py-3 rounded text-sm mt-6"
              onClick={handleSend}
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
