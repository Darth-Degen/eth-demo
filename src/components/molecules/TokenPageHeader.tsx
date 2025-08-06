// components/TokenPageHeader.tsx
import { FC } from "react";
import { FiRefreshCw } from "react-icons/fi";

interface Props {
  onRefresh: () => void;
}

const TokenPageHeader: FC<Props> = ({ onRefresh }) => {
  return (
    <div className="page-padding flex gap-2">
      <h2 className="text-2xl font-semibold">Your Tokens</h2>
      <button
        onClick={onRefresh}
        className="px-4 py-2 rounded transition-200 hover:scale-110 -mt-1"
        aria-label="Refresh"
      >
        <FiRefreshCw size={24} />
      </button>
    </div>
  );
};

export default TokenPageHeader;
