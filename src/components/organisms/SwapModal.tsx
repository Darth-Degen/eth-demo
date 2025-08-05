// components/modals/SwapModal.tsx
"use client";
import { FC, useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { Modal } from "@components";
import { useExecuteSwap, useSwapQuote } from "@hooks";
import { STABLECOINS } from "@constants";
import { Token } from "@types";

interface Props {
  show: boolean;
  close: () => void;
  token: Token | null;
}

const SwapModal: FC<Props> = (props: Props) => {
  const { show, close, token } = props;
  const { address } = useAccount();

  const [amount, setAmount] = useState<string>("");
  const [selectedTo, setSelectedTo] = useState(STABLECOINS[0]);

  const parsedAmount = token
    ? parseUnits(amount || "0", token.decimals).toString()
    : "0";

  const { data: quote, isLoading } = useSwapQuote(
    token && address
      ? {
          fromTokenAddress: token.contractAddress,
          toTokenAddress: selectedTo.address,
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
      <div className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Swap {token.symbol}
        </h2>

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 rounded bg-eth-gray-700 text-white border border-gray-600"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="w-full p-2 rounded bg-eth-gray-700 text-white border border-gray-600"
          onChange={(e) =>
            setSelectedTo(STABLECOINS.find((t) => t.symbol === e.target.value)!)
          }
        >
          {STABLECOINS.map((sc) => (
            <option key={sc.symbol} value={sc.symbol}>
              {sc.symbol}
            </option>
          ))}
        </select>

        {quote && (
          <div className="text-sm text-gray-300 space-y-1">
            <p>
              Estimated Output:{" "}
              <span className="text-white font-medium">
                {formatUnits(BigInt(quote.buyAmount), selectedTo.decimals)}{" "}
                {selectedTo.symbol}
              </span>
            </p>
            <p>Gas: {quote.estimatedGas}</p>
            <p>Price Impact: {quote.estimatedPriceImpact || "N/A"}</p>
          </div>
        )}

        <button
          className="bg-eth-purple text-white w-full py-2 rounded hover:bg-eth-purple-700"
          onClick={handleSwap}
          disabled={!quote || isLoading}
        >
          {isLoading ? "Fetching quote..." : `Swap to ${selectedTo.symbol}`}
        </button>
      </div>
    </Modal>
  );
};

export default SwapModal;
