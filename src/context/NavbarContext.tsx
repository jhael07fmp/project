/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";

const context = createContext<any>("");

type NavbarContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const NavbarContext = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <context.Provider value={{ isOpen, setIsOpen, searchTerm, setSearchTerm }}>
      {children}
    </context.Provider>
  );
};

export default NavbarContext;

export const useNavbarContext = () => {
  return useContext<NavbarContextType>(context);
};
