import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const getSplByAddress = async (
  connection: Connection,
  publicKey: PublicKey,
  tokenAddress: string
) => {
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    publicKey,
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  // Filter the token accounts to find the ones associated with the specified token address
  const tokenAccountsForAddress = tokenAccounts.value.filter((accountInfo) => {
    return accountInfo.account.data.parsed.info.mint === tokenAddress;
  });

  return tokenAccountsForAddress;
};
