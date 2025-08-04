import { Dispatch, SetStateAction, FC, useEffect, useState } from "react";
import { handleAssetLoad } from "@utils";
import { useViewStore } from "src/stores";
import { useAccount, useBalance, useEnsName } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TokenList } from "@components";
import { formatEther } from "viem";
import { AnimatePresence, motion } from "framer-motion";
import { fastEnterAnimation } from "@constants";
interface Props {
  setAssets: Dispatch<SetStateAction<boolean[]>>;
}

const HomeView: FC<Props> = (props: Props) => {
  const { setAssets } = props;

  useEffect(() => {
    handleAssetLoad(0, setAssets);
  }, [setAssets]);

  return <div className="w-full h-full flex flex-col"></div>;
};

export default HomeView;
