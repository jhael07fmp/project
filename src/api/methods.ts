import { DocumentData, WithFieldValue, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export type postType<T> = { colletionName: string; id: string; body: T };

export const post = async <T>({ id, colletionName, body }: postType<T>) => {
  const data = body as WithFieldValue<DocumentData>;
  await setDoc(doc(db, colletionName, id), data);
};
