/* eslint-disable @typescript-eslint/ban-types */
import {
  DocumentData,
  QueryFieldFilterConstraint,
  WhereFilterOp,
  WithFieldValue,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export type postType<T> = { colletionName: string; id: string; body: T };
export type getType = { colletionName: string; id: string };

export const post = async <T>({ id, colletionName, body }: postType<T>) => {
  const data = body as WithFieldValue<DocumentData>;
  return await setDoc(doc(db, colletionName, id), data);
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

export const getWhere = async <T>({
  colletionName,
  property,
  condition,
  compareValue,
}: {
  colletionName: string;
  property: string;
  condition: WhereFilterOp;
  compareValue: string | number | boolean;
}) => {
  const ref = collection(db, colletionName);
  const q = query(ref, where(property, condition, compareValue));
  const d = await getDocs(q);
  return d.docs.map((x) => x.data() as T);
};

export const getWhereCondition = async <T>({
  colletionName,
  condition,
}: {
  colletionName: string;
  condition: QueryFieldFilterConstraint;
}) => {
  const ref = collection(db, colletionName);
  const q = query(ref, condition);
  const d = await getDocs(q);
  return d.docs.map((x) => x.data() as T);
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const getDocsRealtime = (
  colletionName: string,
  fun: Function,
  condition?: QueryFieldFilterConstraint
) => {
  const q = condition
    ? query(collection(db, colletionName), condition!)
    : query(collection(db, colletionName));
  onSnapshot(q, (querySnapshot) => {
    fun(querySnapshot.docs.map((x) => x.data()));
  });
};

export const update = async ({
  id,
  colletionName,
  propName,
  value,
}: {
  id: string;
  colletionName: string;
  propName: string;
  value: string;
}) => {
  // const collection = doc();
  const update = await updateDoc(doc(db, colletionName, id), {
    [propName]: value,
  });

  console.log(update);
};
