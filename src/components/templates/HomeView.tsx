import { Dispatch, SetStateAction, FC, useEffect } from "react";
import { handleAssetLoad } from "@utils";
import { useViewStore } from "src/stores";

interface Props {
  setAssets: Dispatch<SetStateAction<boolean[]>>;
}

const HomeView: FC<Props> = (props: Props) => {
  const { setAssets } = props;
  const { showView } = useViewStore();

  useEffect(() => {
    handleAssetLoad(0, setAssets);
  }, [setAssets]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center"></div>
  );
};

export default HomeView;
