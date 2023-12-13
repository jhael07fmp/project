import { User, UserCredential } from "firebase/auth";

export type AuthContextType = {
  currentUser: () => Promise<User | null>;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};
