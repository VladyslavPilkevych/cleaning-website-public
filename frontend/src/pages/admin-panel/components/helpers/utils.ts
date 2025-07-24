import { EventInput } from "@fullcalendar/core";
import { DbPricingFormData } from "../../../pricing-page/helpers/types";
import { TableEvent } from "./types";

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function toLocalISOString(dt: Date): string {
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(
    dt.getDate()
  )}T${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;
}

// export function convertToEvent(data: DbPricingFormData): TableEvent {
//   if (!data.date) throw new Error("Date is required");

//   const [year, month, day] = data.date.split("-").map(Number);
//   const time = data?.time ? Number(data.time.split(":")[0]) : 0;

//   const eventStart = new Date(year, Number(month) - 1, day, time, 0, 0);
//   const eventEnd = new Date(eventStart.getTime() + 3 * 60 * 60 * 1000); // +3 hours

//   // const date = data.date?.split("T")[0];
//   // const time = data.time + ":00";

//   // const startStr = date && time ? `${date}T${time}` : date || "";
//   // const eventStart = new Date(startStr);
//   // const eventEnd = new Date(eventStart.getTime() + 3 * 60 * 60 * 1000);

//   // const addressParts = [
//   //   data.address_street,
//   //   data.address_house,
//   //   data.address_city,
//   //   data.address_psc,
//   // ]
//   //   .filter(Boolean)
//   //   .join(", ");

//   const addressParts = data.address_street;

//   const customTitle = `Name: ${data.contact_name}, Address: ${addressParts}`;

//   return {
//     customId: data.id,
//     title: customTitle,
//     start: toLocalISOString(eventStart),
//     end: toLocalISOString(eventEnd),
//   };
// }

export function convertToEvent(data: DbPricingFormData): EventInput {
  if (!data.date) throw new Error("Date is required");

  const [year, month, day] = data.date.split("-").map(Number);
  const time = data?.time ? Number(data.time.split(":")[0]) : 0;

  const eventStart = new Date(year, Number(month) - 1, day, time, 0, 0);
  const eventEnd = new Date(eventStart.getTime() + 3 * 60 * 60 * 1000); // +3 hours

  const addressParts = [
    data.address_street,
    data.address_house,
    data.address_city,
    data.address_psc,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    id: String(data.id),
    title: `Name: ${data.contact_name}, Address: ${addressParts}`,
    start: eventStart.toISOString(),
    end: eventEnd.toISOString(),
    extendedProps: {
      name: data.contact_name,
      address: addressParts,
      customId: data.id,
    },
  };
}
