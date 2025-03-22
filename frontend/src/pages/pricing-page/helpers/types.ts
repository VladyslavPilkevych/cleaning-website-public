import { Dayjs } from "dayjs";

export type ServiceCardType = {
  id: string;
  src: string;
  srcInverted: string;
  text: string;
  additionalQuestion?: string;
  isMulti: boolean;
};

export enum PropertyType {
  APARTMENT = "apartment",
  HOUSE = "house",
  OFFICE = "office",
}

export type PropertyFormData = {
  type: PropertyType | null;
  area: string | null;
  rooms: string | null;
  steps: boolean | null;
}

export type WindowFormData = {
  cleaning: boolean | null;
  mold: boolean | null;
  area: string | null;
  count: string | null;
}

export type ServicesFormData = {
  oven: boolean | null;
  iron: string | null;
  fridge: boolean | null;
  balcony: boolean | null;
  microwave: boolean | null;
  wardrobe: boolean | null;
  pet: boolean | null;
  plates: boolean | null;
  blinds: string | null;
  radiator: string | null;
}

export enum ChemicalCleaningType {
  REGULAR = "regular",
  BIO = "bio",
}

export type ChemicalCleaningFormData = {
  chemic: boolean | null;
  type: ChemicalCleaningType | null;
}

export type ChemicalServicesFormData = {
  sofa: boolean | null;
  sofaSingle: boolean | null;
  armchair: boolean | null;
  sofaCorner: string | null;
  carpet: string | null;
  mattress: string | null;
  mattressDouble: string | null;
}

export type AddressFormData = {
  street: string | null;
  city: string | null;
  psc: string | null;
  house: string | null;
  floor: string | null;
}

export type ContactFormData = {
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
}

export enum PAYMENT_METHOD {
  CASH = "cash",
  CARD = "card",
}

export type PricingPageFormData = {
  date: Dayjs | null;
  time: string | null;
  property: PropertyFormData;
  windows: WindowFormData;
  services: ServicesFormData;
  vacuum: boolean | null;
  chemicalCleaning: ChemicalCleaningFormData;
  chemicalServices: ChemicalServicesFormData;
  address: AddressFormData;
  contacts: ContactFormData;
  paymentMethod: PAYMENT_METHOD | null;
  // totalPrice: string | null;
};
