"use client";
import { Token } from "@types";
import { FC } from "react";

interface Props {
  token: Token;
}

const TokenActions: FC<Props> = ({ token }) => {
  const { balance } = token;
  const canSend = balance > 0;
  const isDust = balance === 0;

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
      >
        Send
      </button>

      {/* Exchange */}
      <button
        className="text-yellow-400 transition-200 hover:text-yellow-200 py-2"
        onClick={() => alert("Exchange coming soon")}
      >
        Exchange
      </button>

      {/* Remove */}
      <button
        className={`${
          isDust
            ? "text-red-400 transition-200 hover:text-red-200 py-2"
            : "text-gray-500 cursor-not-allowed"
        }`}
        disabled={!isDust}
        onClick={() =>
          alert(
            "Token accounts cannot be removed on Ethereum. You can hide it in your wallet UI."
          )
        }
      >
        Remove
      </button>
    </div>
  );
};

export default TokenActions;
