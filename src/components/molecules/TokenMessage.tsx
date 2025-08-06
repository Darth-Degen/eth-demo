import { FC } from "react";

interface Props {
  error?: Error | null;
  pricesError?: Error | null;
  isEmpty?: boolean;
  isLoading?: boolean;
}

const TokenMessage: FC<Props> = ({
  error,
  pricesError,
  isEmpty,
  isLoading,
}) => {
  if (isLoading) return null;

  if (error) {
    return (
      <p className="page-padding-x text-red-500">Error: {error.message}</p>
    );
  }

  if (pricesError) {
    return (
      <p className="page-padding-x text-red-500">
        Price error: {pricesError.message}
      </p>
    );
  }

  if (isEmpty) {
    return <p className="page-padding-x text-orange-400">No tokens found</p>;
  }

  return null;
};

export default TokenMessage;
