"use client";
import { Token } from "@types";
import { FC } from "react";

interface Props {
  token: Token;
  usdPrice: number;
}

const TokenPrice: FC<Props> = ({ usdPrice, token }) => {
  // const { data: priceUSD, isLoading, isError } = useTokenPrice(contractAddress);

  // if (isLoading) return <p className="text-right text-gray-500">...</p>;
  // if (isError) return <p className="text-right text-red-400">Err</p>;

  const totalUSD = token.balance * usdPrice;

  return (
    <div className="">
      {token.balance > 0 ? (
        <p className="text-right text-green-500 font-medium">
          {totalUSD > 0 ? (
            `$${totalUSD.toFixed(2)}`
          ) : (
            <span className="text-green-200">0.00</span>
          )}
        </p>
      ) : (
        <p className="text-right text-gray-500 font-medium">{totalUSD}</p>
      )}
    </div>
  );
};

export default TokenPrice;
