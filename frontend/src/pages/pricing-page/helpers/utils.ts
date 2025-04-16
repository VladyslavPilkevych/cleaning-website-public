import { ChemicalCleaningType, PricingPageFormData } from "./types";

export const defaultPricingPageFormData: PricingPageFormData = {
  date: null,
  time: null,
  property: {
    type: null,
    area: null,
    rooms: null,
    steps: false,
  },
  windows: {
    cleaning: null,
    mold: null,
    area: null,
    count: null,
  },
  services: [],
  vacuum: null,
  chemicalCleaning: {
    chemic: null,
    type: ChemicalCleaningType.REGULAR,
  },
  address: {
    street: null,
    city: null,
    psc: null,
    house: null,
    floor: null,
  },
  contacts: {
    name: null,
    email: null,
    phone: null,
    message: null,
  },
  paymentMethod: null,
  totalPrice: 46,
};
