// const express = require("express");
// const router = express.Router();
// const dotenv = require("dotenv");
// const stripe = require("stripe")(process.env.STRIPE_KEY, {
//   apiVersion: "2025-03-31.basil",
// });

// router.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     ui_mode: "custom",
//     line_items: [
//       {
//         // Provide the exact Price ID (e.g. price_1234) of the product you want to sell
//         price: "price_1RGonaRqtvsCiSv0vzU75wUM",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     return_url: `${process.env.FRONTEND_URL}`,
//   });

//   res.send({ clientSecret: session.client_secret });
// });

// router.get("/session-status", async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//   res.send({
//     status: session.status,
//     customer_email: session.customer_details.email
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY, {
  apiVersion: "2025-03-31.basil",
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = 'eur', paymentMethod } = req.body.params;
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      // payment_method: paymentMethod,
      // confirm: true,
      // confirmation_method: "manual",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

