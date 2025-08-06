"use client";
import { Token } from "@types";
import { FC, HTMLAttributes } from "react";
import TokenActions from "./TokenActions";
import { motion, Variants } from "framer-motion";
import { useTokenPrice } from "@hooks"; // or wherever it's defined
import { TokenPrice } from "@components";

interface Props extends HTMLAttributes<HTMLDivElement> {
  token: Token;
  variants: Variants;
  usdPrice: number;
}

const TokenListItem: FC<Props> = ({ token, variants, usdPrice }) => {
  const { symbol, name, balance } = token;
  const canSend = balance > 0;

  return (
    <motion.div
      layout
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="page-padding-x grid grid-cols-4 gap-4 py-2 items-center border-b border-eth-gray-800 hover:bg-eth-gray-800/50 transition-colors"
    >
      {/* Token name */}
      <div>
        <p className="font-semibold text-white">{symbol}</p>
        <p className="text-sm text-gray-500">{name}</p>
      </div>

      {/* Balance */}
      <p className={`text-right ${canSend ? "text-white " : "text-gray-500"}`}>
        {Number.isInteger(balance) ? balance : balance.toFixed(4)}
      </p>

      {/* USD Value */}
      <p className="text-right text-green-500 font-medium">
        <TokenPrice token={token} usdPrice={usdPrice} />
      </p>

      {/* Actions */}
      <TokenActions token={token} />
    </motion.div>
  );
};

export default TokenListItem;
