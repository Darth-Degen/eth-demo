"use client";
import { useSendModalStore } from "@hooks";
import { Token } from "@types";
import { FC } from "react";
import { FiSend, FiRefreshCw } from "react-icons/fi";

interface Props {
  token: Token;
}

const TokenActions: FC<Props> = ({ token }) => {
  const { balance, symbol, contractAddress } = token;
  const canSend = balance > 0;

  const openSendModal = useSendModalStore((s) => s.openModal);

  const openUniswap = () => {
    const uniswapUrl = `https://www.sushi.com/base/swap?token0=${contractAddress}`;
    window.open(uniswapUrl, "_blank");
  };

  return (
    <div className="flex justify-end gap-4 text-sm">
      {/* Send */}
      <button
        className={`${
          canSend
            ? "text-white transition-200 py-2"
            : "text-gray-500 cursor-not-allowed"
        }`}
        disabled={!canSend}
        onClick={() => openSendModal(token)}
        title="Send"
      >
        <FiSend size={20} />
      </button>

      {/* Exchange */}
      <button
        className="text-yellow-300 py-2"
        onClick={openUniswap}
        title="Exchange"
      >
        <FiRefreshCw size={20} />
      </button>
    </div>
  );
};

export default TokenActions;
