const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

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
    const { name, phone, message, email } = req.body;
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
      html: `
        <p>Hello, ${name}</p>
        <p>Thank you for your message</p>
        <p>Our team will contact you soon</p>
        `,
    });
    
    await transporter.sendMail({
      from: `Support request ${process.env.EMAIL_USER}`,
      to: process.env.EMAIL_USER,
      subject: `New support request from ${name} (${phone})`,
      text: message,
      html: `
        <p>Name: ${name}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
        `,
    });

    return res.status(200).send({ status: 200, message: "Success" });
  } catch (e) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
});
