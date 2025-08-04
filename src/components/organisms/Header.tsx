"use client";

import { FC } from "react";
import { useAccount, useBalance } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatEther } from "viem";
import { AnimatePresence, motion } from "framer-motion";
import { fastEnterAnimation } from "@constants";
import { useEthPrice } from "@hooks";

const Header: FC = () => {
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({ address });

  const {
    data: ethPriceUSD,
    isLoading: isEthPriceLoading,
    isError: isEthPriceError,
  } = useEthPrice();

  // derived state
  const ethAmount = ethBalance ? parseFloat(formatEther(ethBalance.value)) : 0;
  const ethValueUSD =
    ethPriceUSD != null ? (ethAmount * ethPriceUSD).toFixed(2) : null;

  // render logic
  const showEthInfo =
    !isEthPriceLoading && ethBalance && !isEthPriceError && isConnected;

  return (
    <div className="page-padding flex justify-between items-center w-full md:min-h-[104px] bg-eth-gray-700 transition-300">
      <AnimatePresence mode="wait">
        {showEthInfo && (
          <motion.div {...fastEnterAnimation} className="flex justify-start">
            <p className="ml-2">{ethAmount.toFixed(4)} ETH</p>
            {ethValueUSD && (
              <p className="text-green-400 font-medium ml-2">
                (${ethValueUSD})
              </p>
            )}
          </motion.div>
        )}
        {!isEthPriceLoading && isEthPriceError && (
          <p className="text-red-500">Error fetching ETH price</p>
        )}
      </AnimatePresence>

      <div className="flex justify-end flex-grow">
        <ConnectButton chainStatus="icon" />
      </div>
    </div>
  );
};

export default Header;
