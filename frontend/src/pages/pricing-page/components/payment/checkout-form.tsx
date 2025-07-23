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
import { useTranslation } from "react-i18next";
import { PricingPageFormData } from "../../helpers/types";
import ThemeColors from "../../../../utils/theme/colors";
import { submitPricingForm } from "../../helpers/submit-form";

type CheckoutFormProps = {
  totalPrice: number;
  formEmail: string | null;
  formData: PricingPageFormData;
  restartForm: () => void;
};

enum MessageTypeEnum {
  ERROR = "error",
  SUCCESS = "success",
}

function CheckoutForm({
  totalPrice,
  formEmail,
  formData,
  restartForm,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState(formEmail || "");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageTypeEnum | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null
  );
  const { t } = useTranslation("translation");

  const language = useTranslation().i18n.language;

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
      setMessageType(MessageTypeEnum.ERROR);
      setIsLoading(false);
      return;
    }

    try {
      const res = await onlinePaymentStripeAPI({
        amount: Math.round(totalPrice * 100),
        name: formData.contacts.name ?? "",
        email,
        language,
        formData,
      });

      const clientSecret = res.data.clientSecret;

      const confirmResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmResult.error) {
        setMessage(confirmResult.error.message || t("payment-error"));
        setMessageType(MessageTypeEnum.ERROR);
      } else if (confirmResult.paymentIntent.status === "succeeded") {
        setMessage(t("payment-success"));
        setMessageType(MessageTypeEnum.SUCCESS);
        await submitPricingForm({ formData, t, restartForm, totalPrice });
      } else {
        setMessage(
          t("payment-unexpected") + `${confirmResult.paymentIntent.status}`
        );
        setMessageType(MessageTypeEnum.ERROR);
      }
    } catch (serverError: any) {
      setMessage(serverError.message || t("payment-server-error"));
      setMessageType(MessageTypeEnum.ERROR);
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
        <StyledMessage id="email-errors">{emailError}</StyledMessage>
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

      {message && (
        <StyledMessage
          style={{
            color:
              messageType === MessageTypeEnum.SUCCESS
                ? ThemeColors.Primary
                : ThemeColors.Warning,
          }}
        >
          {message}
        </StyledMessage>
      )}
    </StyledForm>
  );
}

export default CheckoutForm;
