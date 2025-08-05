import { FC, useState } from "react";
import { Modal } from "@components";
import { Token } from "@types";

interface Props {
  show: boolean;
  close: () => void;
  token: Token | null;
}

const SendTokenModal: FC<Props> = (props: Props) => {
  const { show, close, token } = props;

  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleSend = () => {
    // Replace with wagmi writeContract or viem logic
    if (token) {
      console.log(`Sending ${amount} ${token.symbol} to ${toAddress}`);
      alert(`Mock sending ${amount} ${token.symbol} to ${toAddress}`);
    } else {
      console.log(`No token selected. Cannot send.`);
      alert(`No token selected. Cannot send.`);
    }
    close();
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
              className="w-full p-2 rounded bg-eth-gray-700 text-white border border-gray-600"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />

            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 rounded bg-eth-gray-700 text-white border border-gray-600"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
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
