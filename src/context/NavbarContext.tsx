import { createContext, useContext, useState } from "react";

const context = createContext<any>("");

type NavbarContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavbarContext = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return <context.Provider value={{ isOpen, setIsOpen }}>{children}</context.Provider>;
};

export default NavbarContext;

export const useNavbarContext = () => {
  return useContext<NavbarContextType>(context);
};
