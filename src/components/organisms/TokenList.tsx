"use client";
import { useAccount, useReadContract } from "wagmi";
import { useBalance } from "wagmi";
import { FC } from "react";
import { formatEther } from "ethers";
import { erc20Abi, formatUnits } from "viem";
import { abi } from "@constants";

interface Props {}

// Example ERC20 token addresses (replace with actual tokens)
interface Token {
  address: `0x${string}`;
  symbol: string;
  decimals: number;
}
const tokens: Array<Token> = [
  {
    address: "0x0000000000000000000000000000000000000000",
    symbol: "ETH",
    decimals: 18,
  },
  {
    address: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    symbol: "USDC",
    decimals: 6,
  },
  {
    address: "0x7d1afa7b7c1e4e1c1c1c1c1c1c1c1c1c1c1c1c1c",
    symbol: "MATIC",
    decimals: 18,
  },
  {
    address: "0x4300000000000000000000000000000000000004",
    symbol: "BASE",
    decimals: 18,
  },
  {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol: "USDT",
    decimals: 6,
  },
  {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    decimals: 18,
  },
];

interface TokenBalanceProps {
  token: Token;
  connectedAddress: `0x${string}` | undefined;
}
const TokenBalance: FC<TokenBalanceProps> = ({ token, connectedAddress }) => {
  const { data: tokenBalance } = useBalance({
    address: connectedAddress,
    token: token.address,
  });
  console.log("Token Balance:", token.symbol, tokenBalance);

  return (
    <div className="flex flex-row gap-2">
      <p>{token.symbol} Balance:</p>
      {tokenBalance && <p>{formatUnits(tokenBalance.value, token.decimals)}</p>}
    </div>
  );

  // // console.log("Read Contract Result:", result);
  // console.log(token.symbol, result.status, result.data);

  // const { data, isLoading, isError } = useReadContract({
  //   abi,
  //   address: token.address, // token contract address
  //   functionName: "balanceOf",
  //   args: [userAddress!], // user address
  //   account: userAddress, // user address
  // });

  // console.log("Token Balance Data:", data);
  // if (isLoading) return <p>Loading {token.symbol}...</p>;
  // if (isError || !data) return <p>Error fetching balance for {token.symbol}</p>;

  // return (
  //   <div className="flex gap-2 mb-4">
  //     <p>{token.symbol}</p>
  //     {typeof result.data === "bigint" && (
  //       <p>{formatUnits(result.data, token.decimals)}</p>
  //     )}
  //   </div>
  // );
};

const TokenList: FC<Props> = (props: Props) => {
  const {} = props;

  const { address: connectedAddress } = useAccount();

  const { data: ethBalance } = useBalance({
    address: connectedAddress,
  });

  console.log("ETH Balance:", ethBalance);

  const { data: tokenBalance } = useBalance({
    address: connectedAddress,
    token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  });

  console.log("Token Balance:", tokenBalance);
  return (
    <div className="w-full py-20 px-32">
      <div>
        Gas: {ethBalance && formatEther(ethBalance.value)}
        {ethBalance?.symbol}
      </div>
      <div>
        Token Balance: {tokenBalance && formatUnits(tokenBalance.value, 6)}
        {tokenBalance?.symbol}
      </div>

      <div className="flex flex-col gap-4 pt-6">
        {tokens.map((token) => (
          <TokenBalance
            key={token.symbol}
            token={token}
            connectedAddress={connectedAddress}
          />
        ))}
      </div>
      {/* <TokenBalance key={tokens[5].symbol} token={tokens[5]} /> */}
    </div>
  );
};

export default TokenList;
