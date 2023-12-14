import { Barber } from "../interfaces/Interfaces";
import { getMany, getOne, post } from "./methods";

const colletionName = "barbers";

export const postBarber = async (id: string, body: Barber) => post({ id, body, colletionName });

export const getBarber = async (id: string) => getOne<Barber>({ id, colletionName });

export const getBarbers = async () => getMany<Barber>({ colletionName });
