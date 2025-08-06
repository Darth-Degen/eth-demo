"use client";
import { useSendModalStore } from "@hooks";
import { Token } from "@types";
import { FC } from "react";
import { FiSend, FiRepeat } from "react-icons/fi";
import { useChainId } from "wagmi";

interface Props {
  token: Token;
}

const TokenActions: FC<Props> = ({ token }) => {
  const { balance, symbol, contractAddress } = token;
  const canSend = balance > 0;

  const openSendModal = useSendModalStore((s) => s.openModal);
  const chainId = useChainId();

  const openSushiSwap = () => {
    const token1Map: Record<number, string> = {
      1: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT on Ethereum
      8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
    };

    const chainSlugMap: Record<number, string> = {
      1: "ethereum",
      8453: "base",
    };

    const token1 = token1Map[chainId];
    const chainSlug = chainSlugMap[chainId];

    if (!token1 || !chainSlug) {
      console.error("Unsupported chain ID:", chainId);
      return;
    }

    const url = `https://www.sushi.com/${chainSlug}/swap?token0=${contractAddress}&token1=${token1}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-end text-sm">
      {/* Send */}
      <button
        className={`p-2 md:px-4 ${
          canSend
            ? "text-white transition-200 hover:md:scale-125"
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
        className="text-yellow-300 p-2 md:p-3 transition-200 hover:md:scale-125"
        onClick={openSushiSwap}
        title="Exchange"
      >
        <FiRepeat size={20} />
      </button>
    </div>
  );
};

export default TokenActions;
