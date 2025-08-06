"use client";
import {
  TokenListItem,
  TokenMessage,
  TokenPageHeader,
  TokenTableHeader,
} from "@components";
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

  const sortedTokens = [...enrichedTokens].sort((a, b) => {
    let aVal: string | number | undefined;
    let bVal: string | number | undefined;

    if (sortKey === "name") {
      aVal = a.name?.toLowerCase();
      bVal = b.name?.toLowerCase();
    } else if (sortKey === "usdValue") {
      aVal = a.usdValue * a.balance;
      bVal = b.usdValue * b.balance;
    } else {
      aVal = a[sortKey];
      bVal = b[sortKey];
    }

    if (aVal === undefined || bVal === undefined) return 0;
    if (sortDir === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  console.log("sortedTokens Tokens:", sortedTokens);
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
      <TokenPageHeader onRefresh={handleRefresh} />

      <AnimatePresence mode="wait">
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
            {tokens.length > 0 && (
              <TokenTableHeader
                sortKey={sortKey}
                sortDir={sortDir}
                toggleSort={toggleSort}
              />
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

      <TokenMessage
        error={error}
        pricesError={pricesError}
        isEmpty={tokens.length === 0}
        isLoading={loading}
      />
    </motion.div>
  );
};

export default TokenList;
