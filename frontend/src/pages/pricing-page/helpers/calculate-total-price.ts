import { ChemicalCleaningType, PricingPageFormData } from "./types";

export function calculateTotalPrice(
  formData: PricingPageFormData,
  priceDeliveryExtra: number | null
): number {
  return (
    formData.services.reduce((total, service) => {
      return total + service.price * service.count;
    }, formData.totalPrice || 0) +
    Number(formData?.property?.rooms || 0) * 5 +
    Number(formData?.property?.area || 0) * 1.1 +
    (formData.property?.steps ? 10 : 0) +
    (formData.windows?.cleaning
      ? Number(formData.windows?.count || 0) * 10
      : 0) +
    (formData.vacuum ? 14.99 : 0) +
    (formData.chemicalCleaning?.chemic ? 10 : 0) +
    (formData.chemicalCleaning?.type === ChemicalCleaningType.REGULAR
      ? 10
      : 20) +
    (priceDeliveryExtra || 0)
  );
}
