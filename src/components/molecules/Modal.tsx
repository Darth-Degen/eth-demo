import { motion } from "framer-motion";
import { FC, ReactNode, useEffect, HTMLAttributes, useRef } from "react";
import { midClickAnimation, scaleExitAnimation } from "@constants";
import Image from "next/image";
import { useOutsideAlerter } from "@hooks";
import { CloseIcon } from "@components";
interface Props extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  children: ReactNode;
}
const Modal: FC<Props> = (props: Props) => {
  const { show, children, className, ...componentProps } = props;

  const ref = useRef(null);
  useOutsideAlerter(ref, () => componentProps.onClick);

  //stop page scroll (when modal or menu open)
  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [show]);

  return (
    <motion.div
      key="image-modal"
      className="fixed inset-0 backdrop-blur-sm z-50 w-screen h-screen "
      onClick={componentProps.onClick}
      {...scaleExitAnimation}
      ref={ref}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute left-1/2 top-[40svh] transform -translate-x-1/2 -translate-y-1/2 overflow-clip p-8 lg:p-12
        bg-eth-gray-800 rounded-3xl border-[1px] w-[95vw] sm:w-[500px] h-[360px] ${
          className ?? " "
        }`}
      >
        <motion.div
          className="fixed top-3 md:top-5 right-3 md:right-6 cursor-pointer"
          onClick={componentProps.onClick}
        >
          <CloseIcon />
        </motion.div>
        {children}
      </div>
    </motion.div>
  );
};

export default Modal;
