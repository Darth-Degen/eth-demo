export const truncatePubKey = (pubKey: string): string => 
   pubKey.slice(0, 4) +
      "..." +
   pubKey.slice(-4)
            
