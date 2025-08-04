import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { midClickAnimation, enterAnimation } from "@constants";
import Link from "next/link";

const Logo: FC = () => {
  return (
    <motion.div
      className="my-0 flex items-center gap-2 cursor-pointer"
      {...enterAnimation}
    >
      <Link href="/">
        <Image
          src="/images/logo.png"
          height={35}
          width={35}
          alt="Logo"
          priority
          className="transition-all duration-300 opacity-80 hover:opacity-100"
        />
      </Link>
    </motion.div>
  );
};
export default Logo;
