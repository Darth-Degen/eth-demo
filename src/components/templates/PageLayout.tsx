import { FC, ReactNode } from "react";
import {
  PageHead,
  Header,
  Footer,
  SplashScreen,
  SendTokenModal,
} from "@components";
import { enterAnimation } from "@constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSendModalStore } from "@hooks";

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

  const { isOpen, token, closeModal } = useSendModalStore();

  return (
    <div
      className={`flex flex-col min-h-[100svh] h-full justify-between overflow-none ${
        fixed ? "fixed inset-0" : absolute ? "absolute inset-0" : "relative"
      }`}
    >
      <PageHead
        title="Eth Demo"
        description="A demo application for Ethereum token transfers"
        url="https://eth-demo.vercel.app/" // no backslash at the end
        twitter="twitterhandle"
      />
      {/* header */}
      <Header />

      {/* body */}
      <motion.main
        className={`flex flex-col h-full w-full overflow-x-clip max-w-[1820px] mx-auto`}
        {...enterAnimation}
      >
        {children}
      </motion.main>

      {/* footer */}
      {footer && <Footer />}

      {/* load screen */}
      {assets && <SplashScreen assets={assets} />}

      {/* modal */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <SendTokenModal
            show={isOpen}
            close={() => closeModal()}
            token={token}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
export default PageLayout;
