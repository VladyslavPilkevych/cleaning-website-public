require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const formRoutes = require("./routes/formRoutes");

const server = express();

dotenv.config();

server.use(express.static(__dirname + "/public"));
server.use(express.json());

server.use(cors());
server.use(bodyParser.json());

// server.get("*", (req, res) => {
//   res.sendFile("public/index.html", { root: __dirname });
// });


server.use("/api/form", formRoutes);

server.post("/api/contacts", async (req, res) => {
  try {
    const { name, phone, message, email } = req.body;
    if (!name || !phone || !message || !email) {
      return res
        .status(400)
        .send({ status: 400, message: "Missing required fields" });
    }

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}:`);
});
