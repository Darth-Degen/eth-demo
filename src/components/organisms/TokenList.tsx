"use client";
import { FC, HTMLAttributes, useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface Props extends HTMLAttributes<HTMLDivElement> {}
interface Token {
  contractAddress: string;
  name: string;
  symbol: string;
  balance: number;
  usdValue: number;
}

const TokenList: FC<Props> = (props) => {
  const { address, isConnected } = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);

  return <div {...props} className="w-full py-20 px-32"></div>;
};

export default TokenList;
