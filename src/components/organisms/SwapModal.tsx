"use client";

import { FC, useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { Modal } from "@components";
import { useExecuteSwap, useSwapQuote } from "@hooks";
import type { Token } from "@types";
import { STABLECOINS } from "@constants";

interface Props {
  show: boolean;
  close: () => void;
  token: Token | null;
}

const SwapModal: FC<Props> = ({ show, close, token }) => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");

  const USDT = STABLECOINS.find((t) => t.symbol === "USDT")!;

  const isValidAmount = amount && !isNaN(Number(amount)) && Number(amount) > 0;

  const parsedAmount =
    token && isValidAmount
      ? parseUnits(
          Number(amount).toFixed(token.decimals),
          token.decimals
        ).toString()
      : "0";

  const { data: quote, isLoading } = useSwapQuote(
    token && address && isValidAmount
      ? {
          fromTokenAddress: token.contractAddress,
          toTokenAddress: USDT.address,
          amount: parsedAmount,
          userAddress: address,
        }
      : undefined
  );

  const { executeSwap } = useExecuteSwap();

  const handleSwap = async () => {
    if (!quote) return;
    await executeSwap(quote.data, quote.to);
    close();
  };

  if (!token) return null;

  return (
    <Modal show={show} onClick={close}>
      <div className="h-full flex flex-col justify-center gap-4 ">
        <h2 className="text-lg font-semibold text-white text-center">
          Swap {token.symbol} to USDT
        </h2>

        <input
          type="text"
          inputMode="decimal"
          pattern="^\d*\.?\d*$"
          placeholder={`Amount of ${token.symbol}`}
          className="w-full p-2 rounded bg-eth-gray-700 text-white border border-gray-600"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
        />

        {quote && (
          <div className="text-sm text-gray-300 space-y-1">
            <p>
              Estimated Output:{" "}
              <span className="text-white font-medium">
                {formatUnits(BigInt(quote.buyAmount), USDT.decimals)} USDT
              </span>
            </p>
            <p>Gas: {quote.estimatedGas}</p>
            <p>Price Impact: {quote.estimatedPriceImpact || "N/A"}</p>
          </div>
        )}

        <button
          className="bg-eth-purple text-white w-full py-2 rounded hover:bg-eth-purple-700 disabled:opacity-50"
          onClick={handleSwap}
          disabled={!quote || isLoading || !isValidAmount}
        >
          {isLoading ? "Fetching quote..." : "Swap to USDT"}
        </button>
      </div>
    </Modal>
  );
};

export default SwapModal;
