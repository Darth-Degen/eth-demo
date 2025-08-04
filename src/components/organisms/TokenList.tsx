"use client";
import { TokenListItem } from "@components";
import { useTokenBalances } from "@hooks";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { FC, HTMLAttributes } from "react";
import { useAccount } from "wagmi";

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
  const { tokens, loading, error } = useTokenBalances();

  if (!isConnected) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="page-padding-yw-full h-full"
    >
      <h2 className="page-padding text-2xl font-semibold">Your Tokens</h2>

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
          <p className="text-right">Actions</p>
        </div>
      )}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="scrollbar-custom page-padding-x relative h-[50vh] overflow-y-auto"
      >
        {tokens.map((token) =>
          token.name ? (
            <TokenListItem
              key={token.contractAddress}
              token={token}
              variants={itemVariants}
            />
          ) : null
        )}
      </motion.div>
    </motion.div>
  );
};

export default TokenList;
