import React, { useEffect, useState } from "react";
import {
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PaymentRequest } from "@stripe/stripe-js";

import {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledMessage,
  Spinner,
  StyledHeading,
} from "./checkout-form.styles";
import { onlinePaymentStripeAPI } from "../../../../utils/api/api";

type CheckoutFormProps = {
  totalPrice: number;
  formEmail: string | null;
};

function CheckoutForm({ totalPrice, formEmail }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState(formEmail || "");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null
  );
  useEffect(() => {
    if (!stripe || !totalPrice) return;
  
    const createRequest = async () => {
      const pr = stripe.paymentRequest({
        country: "SK",
        currency: "eur",
        total: {
          label: "Total",
          amount: Math.round(totalPrice * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
  
      const result = await pr.canMakePayment();
      if (result) {
        setPaymentRequest(pr);
      } else {
        setPaymentRequest(null);
      }
    };
  
    createRequest();
  }, [stripe, totalPrice]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    const cardElement = elements.getElement(CardElement);

    // const { paymentMethod, error } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement!,
    //   billing_details: {
    //     email,
    //   },
    // });
    
    // if (!isValidEmail(email)) {
    //   setEmailError("Please enter a valid email address.");
    //   return;
    // } else {
    //   setEmailError(null);
    // }
    
    // if (error) {
    //   setMessage(error.message || "Something went wrong");
    // } else {
    //   setMessage("Payment method created: " + paymentMethod.id);
    //   const res = await onlinePaymentStripeAPI({
    //     amount: Math.round(totalPrice * 100),
    //   });
    //   console.log(res);
    // }

    // setIsLoading(false);


     // -------------------------------------------------------------------

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    setEmailError(null);

  const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
    type: "card",
    card: cardElement!,
    billing_details: { email },
  });

  if (pmError || !paymentMethod) {
    setMessage(pmError?.message || "Failed to create payment method");
    setIsLoading(false);
    return;
  }

  try {
    const res = await onlinePaymentStripeAPI({
      amount: Math.round(totalPrice * 100),
      name: "test",  // TODO
      email,
    });

    const clientSecret = res.data.clientSecret;

    const confirmResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmResult.error) {
      setMessage(confirmResult.error.message || "Payment failed");
    } else if (confirmResult.paymentIntent.status === "succeeded") {
      setMessage("✅ Payment successful!");
    } else {
      setMessage(`Unexpected status: ${confirmResult.paymentIntent.status}`);
    }
  } catch (serverError: any) {
    setMessage(serverError.message || "Server error");
  }

  setIsLoading(false);

  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <StyledForm id="payment-form" onSubmit={handleSubmit}>
      <StyledHeading>Checkout</StyledHeading>

      <StyledLabel>Email</StyledLabel>
      <StyledInput
        id="email"
        type="email"
        value={email}
        onChange={(e) => {
          const value = e.target.value;
          setEmail(value);
          if (!isValidEmail(value)) {
            setEmailError("Invalid email format.");
          } else {
            setEmailError(null);
          }
        }}
        placeholder="Enter your email to receive receipt"
      />
      {emailError && (
        <StyledMessage  id="email-errors">{emailError}</StyledMessage>
      )}

      {paymentRequest && (
        <>
          <StyledLabel>Pay with GPay / Apple Pay</StyledLabel>
          <PaymentRequestButtonElement
            key={`prb-${Math.round(totalPrice * 100)}`} 
            options={{ paymentRequest }}
          />
        </>
      )}

      <StyledLabel>Or pay with card</StyledLabel>
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />

      <StyledButton disabled={isLoading || !stripe}>
        {isLoading ? (
          <Spinner />
        ) : (
          `Pay Now ${Math.round(totalPrice * 100) / 100} EUR`
        )}
      </StyledButton>

      {message && <StyledMessage>{message}</StyledMessage>}
    </StyledForm>
  );
}

export default CheckoutForm;
