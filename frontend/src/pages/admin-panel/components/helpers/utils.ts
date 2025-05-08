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

export function convertToEvent(data: DbPricingFormData): TableEvent {
  const date = data.date?.split("T")[0];
  const time = data.time + ":00";

  const startStr = date && time ? `${date}T${time}` : date || "";
  const eventStart = new Date(startStr);
  const eventEnd = new Date(eventStart.getTime() + 3 * 60 * 60 * 1000);

  let services: string[] | undefined = undefined;
  if (data.services) {
    try {
      services = JSON.parse(data.services);
      if (!Array.isArray(services)) services = undefined;
    } catch {
      services = undefined;
    }
  }

  const addressParts = [
    data.address_street,
    data.address_house,
    data.address_city,
    data.address_psc,
  ]
    .filter(Boolean)
    .join(", ");

  const description =
    `Property Type: ${data.property_type ?? ""}\n` +
    `Address: ${addressParts}\n` +
    `Payment: ${data.payment_method ?? ""}\n`;

  return {
    customId: data.id,
    title: data.contact_name ?? "Cleaning TableEvent",
    start: toLocalISOString(eventStart),
    end: toLocalISOString(eventEnd),
    description,
    services,
  };
}
