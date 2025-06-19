// import React, { useEffect, useState } from "react";
// import { PaymentRequestButtonElement, useCheckout, useStripe } from "@stripe/react-stripe-js";
// import { PaymentRequest } from '@stripe/stripe-js';

// import {
//   StyledForm,
//   StyledLabel,
//   StyledInput,
//   StyledButton,
//   StyledPaymentElement,
//   StyledMessage,
//   Spinner,
//   StyledHeading,
// } from "./CheckoutForm.styles";

// const validateEmail = async (email: string, checkout: any) => {
//   const updateResult = await checkout.updateEmail(email);
//   const isValid = updateResult.type !== "error";
//   return { isValid, message: !isValid ? updateResult.error.message : null };
// };

// const EmailInput = ({ email, setEmail, error, setError }: any) => {
//   const checkout = useCheckout();

//   const handleBlur = async () => {
//     if (!email) {
//       return;
//     }
//     const { isValid, message } = await validateEmail(email, checkout);
//     if (!isValid) {
//       setError(message);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setError(null);
//     setEmail(e.target.value);
//   };

//   return (
//     <>
//       <StyledLabel>Email</StyledLabel>
//       <StyledInput
//         id="email"
//         type="text"
//         value={email}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         placeholder="you@example.com"
//       />
//       {error && <StyledMessage id="email-errors">{error}</StyledMessage>}
//     </>
//   );
// };

// const GooglePayButton = () => {
//   const stripe = useStripe();
//   const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

//   useEffect(() => {
//     if (stripe) {
//       const pr = stripe.paymentRequest({
//         country: "SK",
//         currency: "eur",
//         total: {
//           label: "Total",
//           amount: 10,
//         },
//         requestPayerName: true,
//         requestPayerEmail: true,
//       });

//       pr.canMakePayment().then((result) => {
//         if (result) {
//           setPaymentRequest(pr);
//         }
//       });
//     }
//   }, [stripe]);

//   if (!paymentRequest) {
//     return null;
//   }

//   return <PaymentRequestButtonElement options={{ paymentRequest }} />;
// };

// const CheckoutForm = () => {
//   const checkout = useCheckout();
//   const [email, setEmail] = useState("");
//   const [emailError, setEmailError] = useState<null | string>(null);
//   const [message, setMessage] = useState<null | string>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const { isValid, message } = await validateEmail(email, checkout);
//     if (!isValid) {
//       setEmailError(message);
//       setMessage(message);
//       setIsLoading(false);
//       return;
//     }
//     const result = await checkout.confirm();
//     if (result.type === "error") {
//       setMessage(result.error.message);
//     } else {
//       setMessage("Payment successful!");
//     }
//     setIsLoading(false);
//   };

//   return (
//     <StyledForm id="payment-form" onSubmit={handleSubmit}>
//       {/* <EmailInput
//         email={email}
//         setEmail={setEmail}
//         error={emailError}
//         setError={setEmailError}
//       />
//       <StyledHeading>Payment</StyledHeading> */}
//       <GooglePayButton />
//       {/* <StyledPaymentElement id="payment-element" /> */}
//       {/* <StyledButton disabled={isLoading} id="submit">
//         <span id="button-text">
//           {isLoading ? <Spinner id="spinner" /> : `Pay ${checkout.total.total.amount} now`}
//         </span>
//       </StyledButton> */}
//       {/* {message && <StyledMessage id="payment-message">{message}</StyledMessage>} */}
//     </StyledForm>
//   );
// };

// export default CheckoutForm;

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
} from "./CheckoutForm.styles";
import { onlinePaymentStripeAPI } from "../../../utils/api/api";

type CheckoutFormProps = {
  totalPrice: number;
};

function CheckoutForm({ totalPrice }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  // const [amount, setAmount] = useState(1000);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null
  );
  // const [clientSecret, setClientSecret] = useState(null);

  // useEffect(() => {
  // if (stripe) {
  //   const pr = stripe.paymentRequest({
  //     country: "SK",
  //     currency: "eur",
  //     total: {
  //       label: "Total",
  //       amount: 1000,
  //     },
  //     requestPayerName: true,
  //     requestPayerEmail: true,
  //   });

  //   pr.canMakePayment().then((result) => {
  //     console.log("canMakePayment result:", result);
  //     if (result) {
  //       setPaymentRequest(pr);
  //     }
  //   });
  // }
  // }, [stripe]);
  // useEffect(() => {
  //   // (async () => {
  //   //   if (amount < 50) return;
  //   //   const res = await onlinePaymentStripeAPI({ amount });
  //   //   setClientSecret(res.data.clientSecret);
  //   // })();
  //   if (!stripe) return;

  //   const pr = stripe.paymentRequest({
  //     country: "SK",
  //     currency: "eur",
  //     total: {
  //       label: "Total",
  //       amount: Math.round(totalPrice * 100),
  //     },
  //     requestPayerName: true,
  //     requestPayerEmail: true,
  //   });

  //   pr.canMakePayment().then((result) => {
  //     console.log("canMakePayment result:", result);
  //     if (result) {
  //       setPaymentRequest(pr);
  //     }
  //   });
  // }, [stripe, totalPrice]);
  // useEffect(() => {
  //   if (!stripe || !totalPrice) return;

  //   const pr = stripe.paymentRequest({
  //     country: "SK",
  //     currency: "eur",
  //     total: {
  //       label: "Total",
  //       amount: Math.round(totalPrice * 100),
  //     },
  //     requestPayerName: true,
  //     requestPayerEmail: true,
  //   });

  //   pr.canMakePayment().then((result) => {
  //     if (result) {
  //       setPaymentRequest(pr);
  //     } else {
  //       setPaymentRequest(null);
  //     }
  //   });
  // }, [stripe, totalPrice]);
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

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
      billing_details: {
        email,
      },
    });

    if (error) {
      setMessage(error.message || "Something went wrong");
    } else {
      setMessage("Payment method created: " + paymentMethod.id);
      const res = await onlinePaymentStripeAPI({
        amount: Math.round(totalPrice * 100),
      });
      console.log(res);
    }

    setIsLoading(false);
  };

  return (
    <StyledForm id="payment-form" onSubmit={handleSubmit}>
      <StyledHeading>Checkout</StyledHeading>

      <StyledLabel>Email</StyledLabel>
      <StyledInput
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

      {message && <StyledMessage>{message}</StyledMessage>}
    </StyledForm>
  );
}

export default CheckoutForm;
