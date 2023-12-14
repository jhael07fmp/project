import { createUserWithEmailAndPassword } from "firebase/auth";
import { Barber, User } from "../interfaces/Interfaces";
import { getMany, getOne, post } from "./methods";
import { auth } from "../config/firebase";

const colletionName = "users";

export const postUser = async (id: string, body: User) =>
  post({ id, body, colletionName });

export const getUser = async (id: string) =>
  getOne<User>({ id, colletionName });

export const getUsers = async () => getMany<User>({ colletionName });

export const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user.uid;
};

export const signUp = async (userData: User | Barber) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const u = userData as any;
  delete u.password;
  await postUser(userData.id, { ...(u as User) });
};
