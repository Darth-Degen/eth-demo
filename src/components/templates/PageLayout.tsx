import { FC, ReactNode, useState } from "react";
import {
  PageHead,
  Header,
  Footer,
  SplashScreen,
  ImageModal,
} from "@components";
import { enterAnimation } from "@constants";
import { AnimatePresence, motion } from "framer-motion";
import { useViewStore } from "src/stores";

interface Props {
  children: ReactNode;
  footer?: boolean;
  fixed?: boolean; //prevents scroll
  absolute?: boolean; //allows scroll
  assets?: boolean[];
}

const PageLayout: FC<Props> = (props: Props) => {
  const {
    footer = true,
    fixed = false,
    absolute = false,
    children,
    assets = [],
  } = props;

  const { showModal, setShowModal } = useViewStore();

  return (
    <div
      className={`flex flex-col min-h-[100svh] h-full justify-between overflow-none ${
        fixed ? "fixed inset-0" : absolute ? "absolute inset-0" : "relative"
      }`}
    >
      <PageHead
        title="Name"
        description="Description"
        url="https://addurl.xyz" // no backslash at the end
        twitter="twitterhandle"
      />
      {/* header */}
      <Header />

      {/* body */}
      <motion.main
        className={`flex flex-col h-full w-full overflow-x-clip`}
        {...enterAnimation}
      >
        {children}
      </motion.main>

      {/* footer */}
      {footer && <Footer />}

      {/* load screen */}
      {assets && <SplashScreen assets={assets} />}

      {/* modals */}
      <AnimatePresence mode="wait">
        {showModal && (
          <ImageModal
            key="image-modal"
            show={showModal}
            close={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
export default PageLayout;
