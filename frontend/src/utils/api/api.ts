import axios from "axios";
import { DbPricingFormData, PricingPageFormData } from "../../pages/pricing-page/helpers/types";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export function contactFormAPI(formData: ContactFormData) {
  return api.post(`${BASE_URL}/contacts/send`, formData);
}

export function savePricesFormAPI(formData: PricingPageFormData) {
  return api.post(`${BASE_URL}/form/save`, formData);
}

export function getAllClientsAPI() {
  return api.get(`${BASE_URL}/form/data`);
}

export function filterClientsAPI(startDate: string, endDate: string) {
  return api.get(`${BASE_URL}/form/data/filter`, { params: { startDate, endDate } });
}

export function superbaseSubmitFormAPI(formData: DbPricingFormData) {
  return api.post(`${BASE_URL}/superbase/submit-pricing-form`, { params: { formData } });
}

export function adminPanelAuthAPI(password: string) {
  return api.post(`${BASE_URL}/admin-panel/auth`, { password });
}

export function superbaseGetAllOrdersAPI() {
  return api.get(`${BASE_URL}/superbase/pricing-orders-table`);
}
