"use client";
import { TokenActions } from "@components";
import { Token } from "@types";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  token: Token;
}

const TokenListItem: FC<Props> = ({ token }) => {
  const { symbol, name, balance, usdValue } = token;

  const canSend = balance > 0;
  const isDust = balance === 0;

  return (
    <div className="grid grid-cols-4 gap-4 py-2 items-center border-b border-eth-gray-800 hover:bg-eth-gray-800/50 transition-colors">
      {/* Token name */}
      <div>
        <p className="font-semibold text-white">{symbol}</p>
        <p className="text-sm text-gray-500">{name}</p>
      </div>

      {/* Balance */}
      <p className="text-right text-white">
        {balance.toFixed(4)}{" "}
        {canSend ? (
          <span className="text-green-500">✓</span>
        ) : (
          <span className="text-red-500">✗</span>
        )}
      </p>

      {/* USD Value */}
      <p className="text-right text-green-500 font-medium">
        {usdValue > 0 ? `$${usdValue.toFixed(2)}` : "--"}
      </p>

      {/* Actions */}
      <TokenActions token={token} />
    </div>
  );
};

export default TokenListItem;
