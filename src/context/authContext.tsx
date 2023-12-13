import { createContext, useContext, useState } from "react";
import { auth } from "../config/firebase";
import { AuthContextType } from "../interfaces/types-auth";
import {
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const context = createContext<any>(null);

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (email: string, password: string) => {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
  };

  const currentUser = async () => {
    await setPersistence(auth, browserLocalPersistence);
    return auth.currentUser;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export default AuthContext;

export const useAuthContext = () => {
  return useContext<AuthContextType>(context);
};
