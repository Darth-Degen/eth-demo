"use client";
import { TokenListItem } from "@components";
import { useTokenBalances } from "@hooks";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { useAccount } from "wagmi";
import { useUsdPrices } from "@hooks";
import { FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast";
import { midEnterAnimation, tokenContainerVariants } from "@constants";
import { EnrichedToken, SortKey } from "@types";

const TokenList: FC = () => {
  /*
   * State
   */

  const [sortKey, setSortKey] = useState<SortKey>("balance");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  /*
   * Hooks and Variables
   */

  const { isConnected } = useAccount();
  const {
    tokens,
    loading,
    error,
    refetch: refetchBalances,
  } = useTokenBalances();

  const contractAddresses = tokens
    .filter((t) => t.balance > 0)
    .map((t) => t.contractAddress);

  const {
    prices,
    loading: pricesLoading,
    error: pricesError,
    refetch: refetchPrices,
  } = useUsdPrices(contractAddresses);

  //add usdValue to each token
  const enrichedTokens: EnrichedToken[] = tokens.map((token) => {
    const usd = prices?.[token.contractAddress.toLowerCase()]?.usd ?? 0;
    return {
      ...token,
      usdValue: usd,
    };
  });

  //sort full token list
  const sortedTokens: EnrichedToken[] = [...enrichedTokens].sort((a, b) => {
    const aVal = sortKey === "name" ? a.name?.toLowerCase() : a[sortKey];
    const bVal = sortKey === "name" ? b.name?.toLowerCase() : b[sortKey];

    if (aVal === undefined || bVal === undefined) return 0;
    if (sortDir === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  /*
   * Functions
   */

  const handleRefresh = async () => {
    const toastId = toast.loading("Refreshing token balances...");
    try {
      // Step 1: Refresh balances
      const result = await refetchBalances();
      if (result.isError) throw result.error;

      // Step 2: Refresh prices only if we got non-empty tokens
      if (contractAddresses.length > 0) {
        await refetchPrices();
      }

      toast.success("Balances and prices updated", { id: toastId });
    } catch (err: any) {
      toast.error(`Refresh failed: ${err.message}`, { id: toastId });
    }
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
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

      <AnimatePresence mode="wait">
        {/* Loading */}
        {loading || pricesLoading ? (
          <motion.p
            key="loading"
            className="page-padding text-gray-400"
            {...midEnterAnimation}
          >
            Loading token balances...
          </motion.p>
        ) : (
          <motion.div key="table" {...midEnterAnimation}>
            {/* Table Header */}
            {!loading && tokens.length > 0 && (
              <div className="page-padding-x grid grid-cols-4 gap-4 text-sm font-medium text-gray-400 uppercase border-b border-eth-gray-700 pb-4">
                <button
                  onClick={() => toggleSort("name")}
                  className="text-left"
                >
                  Token
                </button>
                <button
                  onClick={() => toggleSort("balance")}
                  className="text-right"
                >
                  Balance
                </button>
                <button
                  onClick={() => toggleSort("usdValue")}
                  className="text-right"
                >
                  Value (USD)
                </button>
                <p className="text-right"></p>
              </div>
            )}
            {/* Table Body */}
            <motion.div
              variants={tokenContainerVariants}
              initial="hidden"
              animate="visible"
              className="scrollbar-custom relative max-h-[60vh] overflow-y-auto border-b border-eth-gray-700"
            >
              {sortedTokens.map((token) =>
                token.name ? (
                  // <TokenListItem
                  //   key={token.contractAddress}
                  //   token={token}
                  //   variants={tokenItemVariants}
                  //   usdPrice={
                  //     prices?.[token.contractAddress.toLowerCase()]?.usd ?? 0
                  //   }
                  // />
                  <TokenListItem
                    key={token.contractAddress}
                    token={token}
                    usdPrice={token.usdValue}
                  />
                ) : null
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <p className="page-padding-x text-red-500">Error: {error.message}</p>
      )}
      {pricesError && (
        <p className="page-padding-x text-red-500">
          Price error: {pricesError.message}
        </p>
      )}

      {/* Empty */}
      {tokens.length === 0 && !loading && (
        <p className="text-orange-400">No tokens found</p>
      )}
    </motion.div>
  );
};

export default TokenList;
