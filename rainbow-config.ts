
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: 'Eth Demo',
  projectId: 'cf424d22bf31edb3acf6e4bda4b9b64a',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});