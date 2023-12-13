import { User } from "../interfaces/Interfaces";
import { getMany, getOne, post } from "./methods";

const colletionName = "users";

export const postUser = async (id: string, body: User) => post({ id, body, colletionName });
export const getUser = async (id: string) => getOne<User>({ id, colletionName });
export const getUsers = async () => getMany<User>({ colletionName });
