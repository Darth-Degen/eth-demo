import { Dispatch, SetStateAction, FC, useEffect } from "react";
import { handleAssetLoad } from "@utils";
import { useViewStore } from "src/stores";
import { useAccount, useEnsName } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface Props {
  setAssets: Dispatch<SetStateAction<boolean[]>>;
}

const HomeView: FC<Props> = (props: Props) => {
  const { setAssets } = props;
  const { showView } = useViewStore();

  const { address } = useAccount();
  const { data, error, status } = useEnsName({ address });

  useEffect(() => {
    handleAssetLoad(0, setAssets);
  }, [setAssets]);

  console.log("ENS Name:", data);
  console.log("ENS Error:", error);
  console.log("ENS Status:", status);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ConnectButton />
    </div>
  );
};

export default HomeView;
