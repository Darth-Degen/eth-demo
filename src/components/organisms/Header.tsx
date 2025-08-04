import { FC, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from "framer-motion";
import { HeaderContent } from "@components";
interface Props {
  showHeader?: boolean;
  type?: string;
}

const Header: FC<Props> = (props: Props) => {
  const { type = "absolute", showHeader = true } = props;

  const [animateHeader, setAnimateHeader] = useState<boolean>(true);

  //scroll variables
  const scrollRef = useRef<number>();
  const { scrollY, scrollYProgress } = useScroll();
  const height = 104;
  const headerVariants: Variants = {
    show: {
      y: 0,
      transition: {
        delay: 0.25,
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    hidden: {
      y: -height,
      transition: {
        delay: 0.25,
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // if (latest > 0.95) setAnimateHeader(true);
    if (latest < 0.1) setAnimateHeader(true);
  });

  //hide header on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    //first instance
    if (scrollRef.current === undefined) {
      setAnimateHeader(false);
      scrollRef.current = latest;
      return;
    }

    //scroll down
    if (scrollRef.current < latest) {
      if (scrollRef.current + 30 < latest) {
        setAnimateHeader(false);
        scrollRef.current = latest;
      }
      return;
    }

    //scroll up
    if (scrollRef.current > latest) {
      if (scrollRef.current > latest + 30) {
        setAnimateHeader(true);
        scrollRef.current = latest;
      }
      return;
    }
  });

  useEffect(() => {
    setAnimateHeader(showHeader);
  }, [showHeader]);

  return (
    <header
      className={`top-0 z-10 transition-all duration-500 ${
        type === "scroll" ? "fixed" : type
      } `}
    >
      {type !== "scroll" ? (
        <HeaderContent />
      ) : (
        <motion.aside
          variants={headerVariants}
          initial={showHeader ? "show" : "hidden"}
          animate={animateHeader ? "show" : "hidden"}
        >
          <HeaderContent />
        </motion.aside>
      )}
    </header>
  );
};

export default Header;
