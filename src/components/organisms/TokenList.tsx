"use client";
import { TokenListItem } from "@components";
import { useTokenBalances } from "@hooks";
import { motion, Variants } from "framer-motion";
import { FC, HTMLAttributes } from "react";
import { useAccount } from "wagmi";
import { useUsdPrices } from "@hooks";
import { FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const TokenList: FC<Props> = (props) => {
  const { isConnected } = useAccount();
  const { tokens, loading, error, refetch } = useTokenBalances();

  // const tokensWithBalance = tokens.filter((t) => t.balance > 0);
  const contractAddresses = tokens
    .filter((t) => t.balance > 0)
    .map((t) => t.contractAddress);
  const { data: usdPrices } = useUsdPrices(contractAddresses);

  const handleRefresh = () => {
    const toastId = toast.loading(`Refreshing token balances...`);
    refetch()
      .then(() => {
        toast.success("Token balances refreshed", { id: toastId });
      })
      .catch((error) => {
        toast.error(`Failed to refresh token balances: ${error.message}`, {
          id: toastId,
        });
      });
  };

  if (!isConnected) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="page-padding-y w-full h-full"
    >
      <div className="page-padding flex gap-2">
        <h2 className="text-2xl font-semibold">Your Tokens</h2>
        <button
          onClick={() => handleRefresh()}
          className="px-4 py-2 rounded transition-200 hover:scale-110 -mt-1"
          aria-label="Refresh"
        >
          <FiRefreshCw size={24} />
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="page-padding text-gray-400">Loading token balances...</p>
      )}

      {/* Error */}
      {error && (
        <p className="page-padding-x text-red-500">Error: {error.message}</p>
      )}

      {/* Empty */}
      {tokens.length === 0 && !loading && (
        <p className="text-orange-400">No tokens found</p>
      )}

      {/* Table Header */}
      {!loading && tokens.length > 0 && (
        <div className="page-padding-x grid grid-cols-4 gap-4 text-sm font-medium text-gray-400 uppercase border-b border-eth-gray-700 pb-4">
          <p>Token</p>
          <p className="text-right">Balance</p>
          <p className="text-right">Value (USD)</p>
          <p className="text-right"></p>
        </div>
      )}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="scrollbar-custom relative h-[50vh] overflow-y-auto"
      >
        {tokens.map((token) =>
          token.name ? (
            <TokenListItem
              key={token.contractAddress}
              token={token}
              variants={itemVariants}
              usdPrice={
                usdPrices?.[token.contractAddress.toLowerCase()]?.usd ?? 0
              }
            />
          ) : null
        )}
      </motion.div>
    </motion.div>
  );
};

export default TokenList;
