import { FC, useState } from "react";
import { CloseIcon, Logo, Menu, MenuIcon } from "@components";
import { AnimatePresence } from "framer-motion";

const HeaderContent: FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <div className="w-screen flex items-center justify-between px-4 md:px-6 py-4 z-20">
      <Logo />
      <AnimatePresence mode="wait">
        {!openMenu ? (
          <div
            key="menu-icon"
            onClick={() => setOpenMenu(true)}
            className="cursor-pointer"
          >
            <MenuIcon />
          </div>
        ) : (
          <div
            onClick={() => setOpenMenu(false)}
            className="cursor-pointer z-[100]"
          >
            <CloseIcon />
          </div>
        )}
      </AnimatePresence>

      <Menu toggleMenu={setOpenMenu} open={openMenu} />
    </div>
  );
};
export default HeaderContent;
