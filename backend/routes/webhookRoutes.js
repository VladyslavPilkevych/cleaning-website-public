const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY, {
  apiVersion: "2025-03-31.basil",
});
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const paymentTranslations = require("../utils/emails/locales/paymentLocales");
const {
  generateClientPaymentEmailHTML,
  generateAdminPaymentEmailHTML,
} = require("../utils/emails/templates/emailTemplates");

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

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const metadata = paymentIntent.metadata;

      const email = metadata.email;
      const name = metadata.name;
      const amount = paymentIntent.amount;
      const language = metadata.language;

      const formData = {
        date: metadata.cleaning_date,
        time: metadata.cleaning_time,
        vacuum: metadata.vacuum === "true",
        paymentMethod: metadata.paymentMethod,
        totalPrice: Number(metadata.totalPrice),
        contacts: {
          name: metadata.contact_name,
          email: metadata.contact_email,
          phone: metadata.contact_phone,
          message: metadata.contact_message,
        },
        address: {
          street: metadata.address_street,
          city: metadata.address_city,
          psc: metadata.address_psc,
          house: metadata.address_house,
          floor: metadata.address_floor,
        },
        property: {
          type: metadata.property_type,
          area: metadata.property_area,
          rooms: metadata.property_rooms,
          steps: metadata.property_steps === "true",
        },
        windows: {
          cleaning: metadata.windows_cleaning === "true",
          mold: metadata.windows_mold === "true",
          area: metadata.windows_area,
          count: metadata.windows_count,
        },
        chemicalCleaning: {
          chemic: metadata.chemic === "true",
          type: metadata.chemic_type,
        },
        services: [],
      };

      // for (let i = 1; i <= 10; i++) {
      //   const id = metadata[`service_${i}_id`];
      //   if (!id) break;
      //   formData.services.push({
      //     id,
      //     count: Number(metadata[`service_${i}_count`] ?? 0),
      //     price: Number(metadata[`service_${i}_price`] ?? 0),
      //   });
      // } // TODO

      const amountFormatted = (amount / 100).toFixed(2);
      try {
        await transporter.sendMail({
          from: `LexiShine Cleaning <${process.env.EMAIL_USER}>`,
          to: email,
          subject: paymentTranslations[language].paymentSubject,
          html: generateClientPaymentEmailHTML(name, amountFormatted, language, true),
        });

        await transporter.sendMail({
          from: `LexiShine Payment Notification <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `LexiShine Payment Notification ${name}`,
          html: generateAdminPaymentEmailHTML(formData, amountFormatted),
        });
      } catch (err) {
        console.error("Error sending emails:", err);
      }
    }

    res.status(200).json({ received: true });
  }
);

module.exports = router;
