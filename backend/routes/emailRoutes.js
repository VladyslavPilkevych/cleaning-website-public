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
    console.log(language);
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
        <p>${translations[language].greeting}, ${name}</p>
        <p>${translations[language].thanks}</p>
        <p>${translations[language].followup}</p>
        `,
    });
    
    await transporter.sendMail({
      from: `Support request ${process.env.EMAIL_USER}`,
      to: process.env.EMAIL_USER,
      subject: `New support request from ${name} (${phone})`,
      text: message,
      html: `
        <p>Ім'я: ${name}</p>
        <p>Телефон: ${phone}</p>
        <p>Повідомлення: ${message}</p>
        <p>Мова спілкування: ${language}</p>
        `,
    });

    return res.status(200).send({ status: 200, message: translations[language].success });
  } catch (e) {
    return res
      .status(500)
      .send({ status: 500, message: translations[language].error });
  }
});

module.exports = router;
