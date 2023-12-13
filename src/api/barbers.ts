import { Barber } from "../interfaces/Interfaces";
import { getMany, getOne, getType, post } from "./methods";

const colletionName = "barbers";

export const postBarber = async (id: string, body: Barber) => post({ id, body, colletionName });

export const getBarber = async ({ id, colletionName }: getType) =>
  getOne<Barber>({ id, colletionName });

export const getBarbers = async () => getMany<Barber>({ colletionName });
