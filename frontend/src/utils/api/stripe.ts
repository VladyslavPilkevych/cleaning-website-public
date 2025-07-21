import { loadStripe } from "@stripe/stripe-js";

const stripeKey = process.env.REACT_APP_STRIPE_KEY || "";
export const stripePromise = loadStripe(stripeKey);
