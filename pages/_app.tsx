import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
//solana wallet
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import { Toaster } from "react-hot-toast";
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

//eth packages
import { WagmiProvider } from "wagmi";
// import { config } from "../config";
import { config } from "../rainbow-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint =
    "https://mainnet.helius-rpc.com/?api-key=fd98bcfd-5344-4cc0-8ac1-db7ba9603613";

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new LedgerWalletAdapter(),
    ],
    [network]
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <Component {...pageProps} />
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    style: {
                      border: "2px solid #0D864C",
                      padding: "16px",
                      color: "#fff",
                      backgroundColor: "#020202",
                    },
                    iconTheme: {
                      primary: "#0D864C",
                      secondary: "#454545",
                    },
                  }}
                />
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
