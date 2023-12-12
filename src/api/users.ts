import { User } from "../interfaces/Interfaces";
import { post, postType } from "./methods";

const colletionName = "users";

export const postUser = async (id: string, body: User) => post({ id, body, colletionName });
