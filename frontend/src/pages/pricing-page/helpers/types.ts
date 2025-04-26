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

export type DbPricingFormData = {
  date: string | null;
  time: string | null;
  property_type: string | null;
  property_area: string | null;
  property_rooms: string | null;
  property_steps: boolean | null;
  windows_cleaning: boolean | null;
  windows_mold: boolean | null;
  windows_area: string | null;
  windows_count: string | null;
  services: string | null; // JSON строка
  vacuum: boolean | null;
  chemical_cleaning: boolean | null;
  chemical_cleaning_type: string | null;
  address_street: string | null;
  address_city: string | null;
  address_psc: string | null;
  address_house: string | null;
  address_floor: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_message: string | null;
  payment_method: string | null;
  total_price: number | null;
};
