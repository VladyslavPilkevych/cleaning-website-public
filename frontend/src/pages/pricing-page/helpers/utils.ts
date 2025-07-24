import {
  ChemicalCleaningType,
  DbPricingFormData,
  PricingPageFormData,
} from "./types";

export const getDefaultPricingPageFormData = (): PricingPageFormData => ({
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
});

// export const defaultPricingPageFormData: PricingPageFormData = {
//   date: null,
//   time: null,
//   property: {
//     type: null,
//     area: null,
//     rooms: null,
//     steps: false,
//   },
//   windows: {
//     cleaning: null,
//     mold: null,
//     area: null,
//     count: null,
//   },
//   services: [],
//   vacuum: null,
//   chemicalCleaning: {
//     chemic: null,
//     type: ChemicalCleaningType.REGULAR,
//   },
//   address: {
//     street: null,
//     city: null,
//     psc: null,
//     house: null,
//     floor: null,
//   },
//   contacts: {
//     name: null,
//     email: null,
//     phone: null,
//     message: null,
//   },
//   paymentMethod: null,
//   totalPrice: 46,
// };

export function convertPricingFormToDb(
  input: PricingPageFormData,
  totalPrice: number
): DbPricingFormData {
  const date = input.date ? input.date.format("YYYY-MM-DD") : null;

  return {
    date: date,
    time: input.time,
    property_type: input.property?.type ?? null,
    property_area: input.property?.area ?? null,
    property_rooms: input.property?.rooms ?? null,
    property_steps: input.property?.steps ?? null,
    windows_cleaning: input.windows?.cleaning ?? null,
    windows_mold: input.windows?.mold ?? null,
    windows_area: input.windows?.area ?? null,
    windows_count: input.windows?.count ?? null,
    services: input.services ? JSON.stringify(input.services) : null, // jsonb
    vacuum: input.vacuum,
    chemical_cleaning: input.chemicalCleaning?.chemic ?? null,
    chemical_cleaning_type: input.chemicalCleaning?.type ?? null,
    address_street: input.address?.street ?? null,
    address_city: null, // todo: input.address?.city ?? null,
    address_psc: null, // todo: input.address?.psc ?? null,
    address_house: input.address?.house ?? null,
    address_floor: input.address?.floor ?? null,
    contact_name: input.contacts?.name ?? null,
    contact_email: input.contacts?.email ?? null,
    contact_phone: input.contacts?.phone ?? null,
    contact_message: input.contacts?.message ?? null,
    payment_method: input.paymentMethod ?? null,
    total_price: totalPrice,
  };
}
