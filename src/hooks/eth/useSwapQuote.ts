import { useQuery } from "@tanstack/react-query";

interface SwapQuoteParams {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string; // base units
  userAddress: string;
}

const API_KEY = process.env.NEXT_PUBLIC_0X_API_KEY;

export const useSwapQuote = (params?: SwapQuoteParams) => {
  return useQuery({
    queryKey: ["swapQuoteV2", params],
    enabled:
      !!params?.fromTokenAddress &&
      !!params?.toTokenAddress &&
      !!params?.amount &&
      !!params?.userAddress,
    staleTime: 60_000,
    queryFn: async () => {
      const { fromTokenAddress, toTokenAddress, amount, userAddress } = params!;

      const url = new URL("https://api.0x.org/swap/permit2/quote");
      url.searchParams.append("sellToken", fromTokenAddress);
      url.searchParams.append("buyToken", toTokenAddress);
      url.searchParams.append("sellAmount", amount);
      url.searchParams.append("taker", userAddress);
      url.searchParams.append("chainId", "1"); // or 8453 for Base

      const res = await fetch(url.toString(), {
        headers: {
          "0x-api-key": API_KEY ?? "",
          "0x-version": "v2",
        },
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("[0x V2 Quote Error]", error);
        throw new Error("Failed to fetch v2 quote");
      }

      const data = await res.json();
      return data;
    },
  });
};
