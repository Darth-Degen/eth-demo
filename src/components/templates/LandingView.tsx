import { motion } from "framer-motion";
import { Dispatch, SetStateAction, FC } from "react";
import { slideDown } from "@constants";
import { IconBar } from "@components";
import { handleAssetLoad } from "@utils";
import Image from "next/image";
import { useViewStore } from "src/stores";

interface Props {
  setAssets: Dispatch<SetStateAction<boolean[]>>;
}

const LandingView: FC<Props> = (props: Props) => {
  const { setAssets } = props;
  const { showView } = useViewStore();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <motion.div {...slideDown(showView)}>
        <Image
          src="/images/logo.png"
          alt="EXP"
          width={400}
          height={400}
          className="px-2 lg:px-20 2xl:px-0"
          onLoadingComplete={() => handleAssetLoad(0, setAssets)}
        />
      </motion.div>
      <IconBar className="lg:hidden absolute bottom-3" />
    </div>
  );
};

export default LandingView;
