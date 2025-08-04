import { motion } from "framer-motion";
import { Dispatch, SetStateAction, FC } from "react";
import { slideLeft, slideRight } from "@constants";
import { handleAssetLoad } from "@utils";
import { useViewStore } from "src/stores";
import Image from "next/image";

interface Props {
  setAssets: Dispatch<SetStateAction<boolean[]>>;
}

const AboutView: FC<Props> = (props: Props) => {
  const { setAssets } = props;
  const { showView } = useViewStore();

  return (
    <div
      className="w-full flex flex-col mt-28 xl:mt-0 xl:flex-row items-center xl:items-start justify-center sm:px-10 gap-8 xl:gap-8 3xl:gap-32 overflow-hidden
        xl:absolute xl:top-1/2 xl:left-1/2 xl:transform xl:-translate-y-1/2 xl:-translate-x-1/2"
    >
      <motion.div {...slideRight(showView)}>
        <Image
          src="/images/logo.png"
          alt="BRKRS"
          width={100}
          height={100}
          onLoadingComplete={() => handleAssetLoad(0, setAssets)}
        />
      </motion.div>
      <motion.div {...slideLeft(showView)}>
        <Image
          src="/images/logo.png"
          alt="BRKRS"
          width={100}
          height={100}
          onLoadingComplete={() => handleAssetLoad(1, setAssets)}
        />
      </motion.div>
    </div>
  );
};

export default AboutView;
