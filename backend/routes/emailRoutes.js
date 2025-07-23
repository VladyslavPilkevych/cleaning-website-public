const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const translations = require("./emailLocales");

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
        .send({ status: 400, message: translations[language].missingFields });
    }

    await transporter.sendMail({
      from: `LexiShine cleaning ${process.env.EMAIL_USER}`,
      to: email,
      subject: `${name} (${phone})`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
          <h2 style="color: #4CAF50;">LexiShine Cleaning</h2>
          <p style="font-size: 16px;">${translations[language].greeting}, ${name}</p>
          <p style="font-size: 16px;">${translations[language].thanks}</p>
          <p style="font-size: 16px;">${translations[language].followup}</p>
        </div>
        `,
    });

    await transporter.sendMail({
      from: `Support request ${process.env.EMAIL_USER}`,
      to: process.env.EMAIL_USER,
      subject: `New support request from ${name} (${phone})`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <h2 style="color: #4CAF50;">LexiShine Cleaning</h2>
            <p style="font-size: 16px;">Нова заявка на підтримку:</p>
            <ul style="font-size: 15px; color: #333; line-height: 1.6;">
              <li><strong>Ім'я:</strong> ${name}</li>
              <li><strong>Пошта:</strong> ${email}</li>
              <li><strong>Телефон:</strong> ${phone}</li>
              <li><strong>Повідомлення:</strong> ${message}</li>
              <li><strong>Мова спілкування:</strong> ${language}</li>
            </ul>
        </div>
        `,
    });

    return res
      .status(200)
      .send({ status: 200, message: translations[language].success });
  } catch (e) {
    return res
      .status(500)
      .send({ status: 500, message: translations[language].error });
  }
});

module.exports = router;
