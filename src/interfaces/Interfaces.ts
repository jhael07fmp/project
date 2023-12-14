/* eslint-disable @typescript-eslint/ban-types */
export interface User {
  id: string;
  name?: string;
  taxId?: string;
  genre?: string;
  email: string;
  phone?: string;
  address?: string;
  roles?: Role[];
}

export type Role = string;

export type DateRangeType = {
  from: number | string;
  to: number | string;
};

export type ScheduleType = {
  monday?: DateRangeType;
  tuesday?: DateRangeType;
  wednesday?: DateRangeType;
  thursday?: DateRangeType;
  friday?: DateRangeType;
  saturday?: DateRangeType;
  sunday?: DateRangeType;
};

export interface Barbershop {
  id: string;
  taxId: string;
  name: string;
  address: string;
  schedule?: ScheduleType;
  services: Service[];
  rating?: number;
  lat?: number;
  lon?: number;
  image?: string;
}

export type Service = string;

export interface Barber {
  id: string;
  name: string;
  userId: string;
  barbershopId: string;
  taxId: string;
  schedule?: ScheduleType;
  services?: Service[];
  rating?: number;
  image?: string;
}

export interface Appointment {
  id: string;
  dateInMillis: number;
  userId: string;
  barbershopId: string;
  baberId: string;
  services: Service[];
}

export type InputComponentType = {
  label: string;
  type: string;
  placeholder: string;
  register: Function;
  name: string;
};
