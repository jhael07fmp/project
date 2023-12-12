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

export interface Role {
  id: string;
  name: string;
}

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
  schedule: ScheduleType;
  services: Service[];
  barbers: Barber[];
  rating: number;
  lat: number;
  lon: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  specialPrice: number;
  durationInMin: number;
}

export interface Barber {
  id: string;
  name: string;
  userId: string;
  taxId: string;
  schedule: ScheduleType;
  services: Service[];
  rating: number;
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
