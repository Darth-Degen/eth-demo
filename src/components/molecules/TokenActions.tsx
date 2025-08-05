"use client";
import { useSendModalStore } from "@hooks";
import { Token } from "@types";
import { FC } from "react";

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
            ? "text-blue-400 transition-200 hover:text-blue-200 py-2"
            : "text-gray-500 cursor-not-allowed"
        }`}
        disabled={!canSend}
        onClick={() => openSendModal(token)}
      >
        Send
      </button>

      {/* Exchange */}
      <button
        className="text-yellow-400 transition-200 hover:text-yellow-200 py-2"
        onClick={openUniswap}
      >
        Exchange
      </button>
    </div>
  );
};

export default TokenActions;
