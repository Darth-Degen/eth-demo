// components/TokenTableHeader.tsx
import { FC } from "react";

type SortKey = "name" | "balance" | "usdValue";

interface Props {
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  toggleSort: (key: SortKey) => void;
}

const TokenTableHeader: FC<Props> = ({ sortKey, sortDir, toggleSort }) => {
  const renderSortArrow = (key: SortKey) => {
    if (sortKey !== key) return <span className="w-[20px]"></span>;
    return <span className="w-[20px]">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className="page-padding-x grid grid-cols-4 gap-4 text-sm font-medium text-gray-400 uppercase border-b border-eth-gray-700 pb-4">
      <button
        onClick={() => toggleSort("name")}
        className="flex items-center justify-start"
      >
        Token {renderSortArrow("name")}
      </button>
      <button
        onClick={() => toggleSort("balance")}
        className="flex items-center justify-end"
      >
        Balance {renderSortArrow("balance")}
      </button>
      <button
        onClick={() => toggleSort("usdValue")}
        className="flex items-center justify-end"
      >
        Value (USD) {renderSortArrow("usdValue")}
      </button>
      <p className="text-right"></p>
    </div>
  );
};

export default TokenTableHeader;
