const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY, {
  apiVersion: "2025-03-31.basil",
});
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post(
  "/mail",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    
    console.log("LOLKA");
    console.log("✅ Webhook received:", req.headers["stripe-signature"]);

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("event, type", event.type);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const metadata = paymentIntent.metadata;

      const email = metadata.email;
      const name = metadata.name;
      const amount = paymentIntent.amount;

      try {
        await transporter.sendMail({
          from: `LexiShine Cleaning <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Thank you for your payment",
          html: `
            <p>Hi ${name},</p>
            <p>We’ve received your payment of €${amount / 100}.</p>
            <p>We’ll be in touch soon. Thank you!</p>
          `,
        });

        await transporter.sendMail({
          from: `LexiShine Payment Notification <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `New payment from ${name}`,
          html: `
            <p>New payment received:</p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Amount:</strong> €${amount / 100}</li>
            </ul>
          `,
        });
      } catch (err) {
        console.error("Error sending emails:", err);
      }
    }

    res.status(200).json({ received: true });
  }
);

module.exports = router;
