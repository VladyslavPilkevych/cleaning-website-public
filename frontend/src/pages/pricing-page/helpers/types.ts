import { Dayjs } from "dayjs";

export type ServiceCardType = {
  id: string;
  src: string;
  srcInverted: string;
  text: string;
  additionalQuestion?: string;
  price: number;
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
};

export type WindowFormData = {
  cleaning: boolean | null;
  mold: boolean | null;
  area: string | null;
  count: string | null;
};

export enum ChemicalCleaningType {
  REGULAR = "regular",
  BIO = "bio",
}

export type ChemicalCleaningFormData = {
  chemic: boolean | null;
  type: ChemicalCleaningType | null;
};

export type AddressFormData = {
  street: string | null;
  city: string | null;
  psc: string | null;
  house: string | null;
  floor: string | null;
};

export type ContactFormData = {
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
};

export enum PAYMENT_METHOD {
  CASH = "cash",
  CARD = "card",
}

export type ServicesFormData = {
  id: string;
  count: number;
  price: number;
};

export type PricingPageFormData = {
  date: Dayjs | null;
  time: string | null;
  property: PropertyFormData;
  windows: WindowFormData;
  // services: { [key: string]: boolean | string | null };
  services: ServicesFormData[];
  vacuum: boolean | null;
  chemicalCleaning: ChemicalCleaningFormData;
  address: AddressFormData;
  contacts: ContactFormData;
  paymentMethod: PAYMENT_METHOD | null;
  totalPrice: number | null;
};

export type PricingPageFormDataErrors = {
  date?: string;
  time?: string;
  propertyType?: string;
  propertyArea?: string;
  propertyRooms?: string;
  propertySteps?: string;
  addressStreet?: string;
  addressCity?: string;
  addressPsc?: string;
  addressHouse?: string;
  contactsName?: string;
  contactsEmail?: string;
  contactsPhone?: string;
  paymentMethod?: string;
};
