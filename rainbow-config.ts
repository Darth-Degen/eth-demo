
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, polygon, base } from "wagmi/chains"; 

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  

export const config = getDefaultConfig({
  appName: 'Eth Demo',
  projectId: 'cf424d22bf31edb3acf6e4bda4b9b64a',
  chains: [mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`), 
    // [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${alchemyKey}`),
    // [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${alchemyKey}`),

  },
});