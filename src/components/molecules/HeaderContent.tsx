import { Dispatch, SetStateAction, FC, useEffect, useState } from "react";
import { handleAssetLoad } from "@utils";
import { useViewStore } from "src/stores";
import { useAccount, useBalance, useEnsName } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TokenList } from "@components";
import { formatEther } from "viem";
import { AnimatePresence, motion } from "framer-motion";
import { fastEnterAnimation } from "@constants";

const HeaderContent: FC = () => {
  const [ethPriceUSD, setEthPriceUSD] = useState<number | null>(null);

  const { address: connectedAddress, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({
    address: connectedAddress,
  });

  const ethAmount = ethBalance ? parseFloat(formatEther(ethBalance.value)) : 0;
  const ethValueUSD = ethPriceUSD ? (ethAmount * ethPriceUSD).toFixed(2) : null;

  // Fetch ETH/USD price from CoinGecko
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await res.json();
        setEthPriceUSD(data.ethereum.usd);
      } catch (error) {
        console.error("Failed to fetch ETH price", error);
      }
    };

    fetchEthPrice();
  }, []);
  return (
    <div className="flex justify-between items-center w-full px-16 py-8 bg-eth-gray-700 transtion-300">
      <AnimatePresence mode="wait">
        {ethBalance && (
          <motion.div {...fastEnterAnimation} className="flex justify-start">
            <p className="ml-2">
              {parseFloat(formatEther(ethBalance.value)).toFixed(4)} ETH
            </p>
            {ethValueUSD && (
              <p className="text-green-400 font-medium ml-2">
                (${ethValueUSD})
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-end flex-grow">
        <ConnectButton />
      </div>
    </div>
  );
};
export default HeaderContent;
