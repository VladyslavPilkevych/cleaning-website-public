const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY, {
  apiVersion: "2025-03-31.basil",
});


// TODO: implementation hidden for security reasons
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = 'eur' } = req.body.params;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      metadata: req.body.params,
      
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

