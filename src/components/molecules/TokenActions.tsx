"use client";
import { useSendModalStore, useSwapModalStore } from "@hooks";
import { Token } from "@types";
import { FC } from "react";
import { FiSend, FiRefreshCw } from "react-icons/fi";

interface Props {
  token: Token;
}

const TokenActions: FC<Props> = ({ token }) => {
  const { balance, contractAddress } = token;
  const canSend = balance > 0;

  const openSendModal = useSendModalStore((s) => s.openModal);
  const openSwapModal = useSwapModalStore((s) => s.open);

  return (
    <div className="flex justify-end gap-0 text-sm">
      {/* Send */}
      <button
        className={`p-2 md:p-3 ${
          canSend
            ? "text-white transition-200 hover:lg:scale-125"
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
        className="text-yellow-300 p-2 md:p-3 transition-200 hover:lg:scale-125"
        onClick={() => openSwapModal(token)}
        title="Exchange"
      >
        <FiRefreshCw size={20} />
      </button>
    </div>
  );
};

export default TokenActions;
