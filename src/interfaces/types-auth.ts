import { User, UserCredential } from "firebase/auth";
import * as I from "../interfaces/Interfaces";

export type AuthContextType = {
  currentUser: () => Promise<User | null>;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  userData: I.User;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
};
