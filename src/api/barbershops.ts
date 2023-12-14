import { Barber, Barbershop } from "../interfaces/Interfaces";
import { getMany, getOne, getWhere, post } from "./methods";

const colletionName = "barbershop";

export const postBarbershop = async (id: string, body: Barbershop) =>
  post({ id, body, colletionName });

export const getBarbershop = async (id: string) => getOne<Barbershop>({ id, colletionName });

export const getBarbershops = async () => getMany<Barbershop>({ colletionName });

export const getBarberByBarbershopId = async (id: string) =>
  getWhere<Barber>({
    colletionName: "barbers",
    condition: "==",
    compareValue: id,
    property: "barbershopId",
  });
