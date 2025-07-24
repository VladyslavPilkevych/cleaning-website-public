const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const paymentTranslations = require("../utils/emails/locales/paymentLocales");

const {
  generateClientPaymentEmailHTML,
  generateAdminPaymentEmailHTML,
  generateClientOnlineSupportHTML,
  generateAdminOnlineSupportHTML,
} = require("../utils/emails/templates/emailTemplates");

dotenv.config();

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

router.post("/send", async (req, res) => {
  try {
    const { name, phone, message, email, language } = req.body.params;
    if (!name || !phone || !message || !email) {
      return res
        .status(400)
        .send({ status: 400, message: "Missing required fields" });
    }

    await transporter.sendMail({
      from: `LexiShine cleaning ${process.env.EMAIL_USER}`,
      to: email,
      subject: `${name} (${phone})`,
      text: message,
      html: generateClientOnlineSupportHTML(name, phone, message, email, language),
    });

    await transporter.sendMail({
      from: `Support request ${process.env.EMAIL_USER}`,
      to: process.env.EMAIL_USER,
      subject: `New support request from ${name} (${phone})`,
      text: message,
      html: generateAdminOnlineSupportHTML(name, phone, message, email, language),
    });

    return res
      .status(200)
      .send({ status: 200, message: "Success" });
  } catch (e) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
});

router.post("/mail-payment-cash", async (req, res) => {
  const { email, name, language, formData, totalPrice } = req.body.params;

  const amountFormatted = Number(totalPrice).toFixed(2);

  try {
    await transporter.sendMail({
      from: `LexiShine Cleaning <${process.env.EMAIL_USER}>`,
      to: email,
      subject: paymentTranslations[language].paymentSubjectCash,
      html: generateClientPaymentEmailHTML(name, amountFormatted, language),
    });

    await transporter.sendMail({
      from: `LexiShine Payment Notification <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `LexiShine Cash Payment Notification ${name}`,
      html: generateAdminPaymentEmailHTML(formData, amountFormatted),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
