import { Connection, PublicKey } from "@solana/web3.js";

import { FindNftByMintOutput, Metaplex } from "@metaplex-foundation/js";
//read nft mint address from wallet
export const findNftByMint = async (
  connection: Connection,
  mintAddress: PublicKey
): Promise<FindNftByMintOutput | null> => {
  //fetch nft metadata from metaplex
  const metaplex = new Metaplex(connection!);
  let nft: FindNftByMintOutput | null;
  try {
    nft = await metaplex.nfts().findByMint({ mintAddress: mintAddress });    
    // console.log("nft ", nft);
  } catch (e) {
    console.error("findNftByMint ", e);
    return null;
  }
  return nft;
};
