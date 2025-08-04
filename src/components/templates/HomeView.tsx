import { Dispatch, SetStateAction, FC, useEffect } from "react";
import { handleAssetLoad } from "@utils";
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
