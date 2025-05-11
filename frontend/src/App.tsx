// import React, { useEffect, useState } from "react";
// import Header from "./components/header";
// import AppRoutes from "./utils/routes";
// import Box from "./components/box";
// import Footer from "./components/footer";
// import { ToastContainer } from "react-toastify";
// import { CheckoutProvider } from "@stripe/react-stripe-js";
// import { loadStripe, StripeCheckoutOptions } from "@stripe/stripe-js";
// import Loader from "./components/loader";

// const stripeKey = process.env.REACT_APP_STRIPE_KEY;
// console.log(stripeKey);
// const stripePromise = loadStripe(stripeKey || "");

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [clientSecret, setClientSecret] = useState<string>("");
//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:5000/api/payment/create-checkout-session",
//           {
//             method: "POST",
//           }
//         );
//         const data = await res.json();
//         setClientSecret(data.clientSecret);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch client secret", error);
//         setLoading(false);
//       }
//     };

//     fetchClientSecret();
//   }, []);

//   const appearance = { theme: "stripe" as const };
//   const options: StripeCheckoutOptions = {
//     fetchClientSecret: () => Promise.resolve(clientSecret),
//     elementsOptions: { appearance },
//   };

//   if (loading || !clientSecret.length) {
//     return (
//       <Box height="calc(100vh - 479px)">
//         <Loader />
//       </Box>
//     );
//   }

//   return (
//     <CheckoutProvider stripe={stripePromise} options={options}>
//       <Box css={{ overflowX: "hidden" }}>
//         <Header />
//         <AppRoutes />
//         <Footer />
//         <ToastContainer />
//       </Box>
//     </CheckoutProvider>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import AppRoutes from "./utils/routes";
import Box from "./components/box";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import Loader from "./components/loader";
import { onlinePaymentStripeAPI } from "./utils/api/api";

const stripeKey = process.env.REACT_APP_STRIPE_KEY || "";
const stripePromise = loadStripe(stripeKey);

function App() {
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  // useEffect(() => {
  //   const fetchClientSecret = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
  //         method: "POST",
  //       });
  //       const data = await res.json();
  //       setClientSecret(data.clientSecret);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Failed to fetch client secret", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchClientSecret();
  // }, []);
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await onlinePaymentStripeAPI({
          amount: 1000,
          currency: "eur",
        });
        const data = await res.data;
        setClientSecret(data.clientSecret);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch client secret", error);
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  console.log(loading, clientSecret);

  if (loading || (clientSecret && !clientSecret.length)) {
    return (
      <Box height="calc(100vh - 479px)">
        <Loader />
      </Box>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <Box css={{ overflowX: "hidden" }}>
        <Header />
        <AppRoutes />
        <Footer />
        <ToastContainer />
      </Box>
    </Elements>
  );
}

export default App;
