import {
  DocumentData,
  WithFieldValue,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export type postType<T> = { colletionName: string; id: string; body: T };
export type getType = { colletionName: string; id: string };

export const post = async <T>({ id, colletionName, body }: postType<T>) => {
  const data = body as WithFieldValue<DocumentData>;
  await setDoc(doc(db, colletionName, id), data);
};

export const getOne = async <T>({ id, colletionName }: getType) => {
  const collection = doc(db, colletionName, id);
  const data = await getDoc(collection);
  return data.data() as T;
};

export const getMany = async <T>({ colletionName }: { colletionName: string }) => {
  const ref = collection(db, colletionName);
  const q = query(ref);
  const d = await getDocs(q);
  return d.docs.map((x) => x.data() as T);
};
