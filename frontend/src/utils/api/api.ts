import axios from "axios";

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
  return api.post(`${BASE_URL}/contacts`, formData);
}
