const nodemailer = require("nodemailer");

async function testSMTP() {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.tm",
      port: 465,
      secure: true,
      auth: {
        user: "salmonleoline@edny.net",
        pass: "SkX'f\\A`;N",
      },
    });

    await transporter.verify();
    console.log("SMTP configuration is correct. Connection successful!");
  } catch (error) {
    console.error("Error connecting to SMTP server:", error);
  }
}

testSMTP();