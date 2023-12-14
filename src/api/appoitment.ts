/* eslint-disable @typescript-eslint/ban-types */
import { where } from "firebase/firestore";
import { Appointment, User } from "../interfaces/Interfaces";
import { getDocsRealtime, getMany, getOne, getWhereCondition, post } from "./methods";

const colletionName = "appointments";

export const postAppointment = async (id: string, body: Appointment) =>
  post({ id, body, colletionName });

export const getAppoitment = async (id: string) => getOne<Appointment>({ id, colletionName });

export const getAppoitmentsWhere = async (user: User | null) => {
  if (!user) return [];

  if (user.roles?.includes("admin")) return getMany<Appointment>({ colletionName });
  if (user.roles?.includes("employee"))
    return getWhereCondition<Appointment>({
      colletionName,
      condition: where("barberId", "==", user.id),
    });
  if (user.roles?.includes("customer"))
    return getWhereCondition<Appointment>({
      colletionName,
      condition: where("userId", "==", user.id),
    });
  if (user.roles?.includes("owner"))
    return getWhereCondition<Appointment>({
      colletionName,
      condition: where("barbershopId", "==", user.id),
    });
};

export const getAppoitmentsRealtime = (user: User | null, fun: Function) => {
  if (!user) return;

  if (user.roles?.includes("admin")) {
    getDocsRealtime(colletionName, fun);
    return;
  }

  if (user.roles?.includes("employee")) {
    getDocsRealtime(colletionName, fun, where("barberId", "==", user.id));
    return;
  }

  if (user.roles?.includes("customer")) {
    getDocsRealtime(colletionName, fun, where("userId", "==", user.id));
    return;
  }

  if (user.roles?.includes("owner")) {
    getDocsRealtime(colletionName, fun, where("barbershopId", "==", user.id));
    return;
  }
};

export const getAppoitments = async () => getMany<Appointment>({ colletionName });
