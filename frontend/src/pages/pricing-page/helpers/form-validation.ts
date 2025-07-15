import { PricingPageFormData, PricingPageFormDataErrors } from "./types";
import { TFunction } from "i18next";

export function validatePricingPageForm(
  formData: PricingPageFormData,
  t: TFunction,
  setFormErrors: (errors: PricingPageFormDataErrors) => void,
): boolean {
  const errors: PricingPageFormDataErrors = {};

  if (!formData.date) {
    errors.date = t("pricing.errors.date");
  }

  if (!formData.time) {
    errors.time = t("pricing.errors.time");
  }

  if (!formData.property.type) {
    errors.propertyType = t("pricing.errors.propertyType");
  }

  if (!formData.property.area) {
    errors.propertyArea = t("pricing.errors.propertyArea");
  }

  if (!formData.property.rooms) {
    errors.propertyRooms = t("pricing.errors.propertyRooms");
  }

  // if (!formData.address.street) {
  //   errors.addressStreet = t("pricing.errors.addressStreet");
  // }

  // if (!formData.address.city) {
  //   errors.addressCity = t("pricing.errors.addressCity");
  // }

  // if (!formData.address.psc) {
  //   errors.addressPsc = t("pricing.errors.addressPsc");
  // }

  if (!formData.address.house) {
    errors.addressHouse = t("pricing.errors.addressHouse");
  }

  if (!formData.contacts.name) {
    errors.contactsName = t("pricing.errors.contactsName");
  }

  if (!formData.contacts.email) {
    errors.contactsEmail = t("pricing.errors.contactsEmail");
  }

  if (!formData.contacts.phone) {
    errors.contactsPhone = t("pricing.errors.contactsPhone");
  }

  if (!formData.paymentMethod) {
    errors.paymentMethod = t("pricing.errors.paymentMethod");
  }

  console.log("errors:", errors);
  setFormErrors(errors);

  return Object.keys(errors).length === 0;
}
