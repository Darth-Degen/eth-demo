import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconBar, NavItem } from "@components";
import Link from "next/link";
import { useWindowSize } from "@hooks";
import { fadeVariants } from "@constants";
import { useOutsideAlerter } from "@hooks";

interface Props {
  toggleMenu: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const Menu: FC<Props> = (props: Props) => {
  const { toggleMenu, open } = props;
  const [winWidth, winHeight] = useWindowSize();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const ref = useRef(null);

  useOutsideAlerter(ref, () => toggleMenu(false));

  const isTablet: boolean = winWidth < 900;
  //stop page scroll (when modal or menu open)
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (open) {
      timeoutRef.current = setTimeout(() => {
        document.body.style.overflow = "hidden";
      }, 700);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [open]);
  return (
    <AnimatePresence mode="wait" initial={false}>
      {open && (
        <motion.aside
          key="main-menu"
          // onMouseLeave={() => toggleMenu(false)}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isTablet ? winWidth - 15 : 669, opacity: 1 }}
          exit={{
            width: 0,
            transition: { duration: 0.5 },
            opacity: 1,
          }}
          transition={{ duration: 0.7 }}
          className=" bg-template-black fixed top-0 right-0 z-50 lg:shadow-xl font-daysOne lg:shadow-gray-600"
          // onClick={() => toggleMenu(false)}
          ref={ref}
        >
          <motion.div
            className={`px-4 sm:px-6 lg:px-10 py-6 h-screen relative`}
            variants={fadeVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="absolute left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2  flex flex-col items-center justify-start text-4xl sm:text-6xl gap-2">
              <NavItem href="/about">About</NavItem>
              <NavItem href="/more">More</NavItem>
            </div>
            <IconBar className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 bottom-3" />
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Menu;
