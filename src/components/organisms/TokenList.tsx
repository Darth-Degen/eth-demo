"use client";
import { useTokenBalances } from "@hooks";
import { FC, HTMLAttributes } from "react";
import { useAccount } from "wagmi";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const TokenList: FC<Props> = (props) => {
  const { isConnected } = useAccount();
  const { tokens, loading, error } = useTokenBalances();
  console.log("Tokens:", tokens);

  if (!isConnected) return null;
  return (
    <div {...props}>
      {loading && <p>Loading token balances...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {tokens.length === 0 && !loading && (
        <p className="text-orange-500">No tokens found</p>
      )}

      {/* Display token balances */}
      {!loading &&
        tokens.length > 0 &&
        tokens.map((token) => {
          if (token.balance > 0) {
            return (
              <div key={token.contractAddress} className="py-1">
                {token.symbol} - {token.balance}
              </div>
            );
          }
        })}
    </div>
  );
};
//<p>No tokens found</p>
export default TokenList;
