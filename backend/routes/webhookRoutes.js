const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY, {
  apiVersion: "2025-03-31.basil",
});
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const translations = require("./webhookLocales");

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

      // let formData = {};
      // try {
      //   formData = JSON.parse(metadata.formData);
      // } catch (err) {
      //   console.error("❌ Failed to parse formData:", err.message);
      // }

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
        // services: [],
      };
      
      // // Чтение сервисов из metadata
      // for (let i = 1; i <= 10; i++) {
      //   const id = metadata[`service_${i}_id`];
      //   if (!id) break;
      //   formData.services.push({
      //     id,
      //     count: Number(metadata[`service_${i}_count`] ?? 0),
      //     price: Number(metadata[`service_${i}_price`] ?? 0),
      //   });
      // }
      


      const amountFormatted = (amount / 100).toFixed(2);
      try {
        await transporter.sendMail({
          from: `LexiShine Cleaning <${process.env.EMAIL_USER}>`,
          to: email,
          subject: translations[language].paymentSubject,
          html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
                  <h2 style="color: #4CAF50;">LexiShine Cleaning</h2>
                  <p style="font-size: 16px;">${translations[
                    language
                  ].paymentGreeting(name)}</p>
                  <p style="font-size: 16px;">${translations[
                    language
                  ].paymentReceived(amountFormatted)}</p>
                  <p style="font-size: 16px;">${
                    translations[language].paymentConfirmed
                  }</p>
                  <hr style="margin: 20px 0;">
                  <p style="font-size: 15px; color: #555;">${
                    translations[language].paymentContact
                  }</p>
                  <p style="margin-top: 30px; font-size: 14px; color: #999;">${
                    translations[language].paymentReceiptNote
                  }</p>
                  <p style="font-size: 14px; color: #999;">${
                    translations[language].paymentFooter
                  }</p>
                </div>
          `,
        });

        await transporter.sendMail({
          from: `LexiShine Payment Notification <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `LexiShine Payment Notification ${name}`,
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <h2 style="color: #4CAF50;">LexiShine Cleaning</h2>
            <p style="font-size: 16px;">Нова оплата отримана:</p>
            <ul style="font-size: 15px; color: #333; line-height: 1.6;">
              <li><strong>Ім'я:</strong> ${formData.contacts.name}</li>
              <li><strong>Пошта:</strong> ${formData.contacts.email}</li>
              <li><strong>Телефон:</strong> ${
                formData.contacts.phone ?? "—"
              }</li>
              <li><strong>Повідомлення:</strong> ${
                formData.contacts.message ?? "—"
              }</li>
              <li><strong>Сума:</strong> €${(formData.totalPrice ?? 0).toFixed(
                2
              )}</li>
              <li><strong>Метод оплати:</strong> ${
                formData.paymentMethod === "card" ? "Картка" : "Готівка"
              }</li>
              <li><strong>Дата прибирання:</strong> ${
                formData.date ? formData.date.format("DD.MM.YYYY") : "—"
              }</li>
              <li><strong>Час:</strong> ${formData.time ?? "—"}</li>
            </ul>

            <h3 style="color: #4CAF50;">Адреса</h3>
            <ul style="font-size: 15px; color: #333;">
              <li><strong>Вулиця:</strong> ${
                formData.address.street ?? "—"
              }</li>
              <li><strong>Будинок:</strong> ${
                formData.address.house ?? "—"
              }</li>
              <li><strong>Поверх:</strong> ${formData.address.floor ?? "—"}</li>
              <li><strong>Місто:</strong> ${formData.address.city ?? "—"}</li>
              <li><strong>Поштовий індекс:</strong> ${
                formData.address.psc ?? "—"
              }</li>
            </ul>

            <h3 style="color: #4CAF50;">Інформація про нерухомість</h3>
            <ul style="font-size: 15px; color: #333;">
              <li><strong>Тип:</strong> ${
                formData.property.type === "apartment"
                  ? "Квартира"
                  : formData.property.type === "house"
                  ? "Будинок"
                  : formData.property.type === "office"
                  ? "Офіс"
                  : "—"
              }</li>
              <li><strong>Площа:</strong> ${
                formData.property.area ?? "—"
              } м²</li>
              <li><strong>Кількість кімнат:</strong> ${
                formData.property.rooms ?? "—"
              }</li>
              <li><strong>Прибирання поетапно:</strong> ${
                formData.property.steps ? "Так" : "Ні"
              }</li>
            </ul>
            
            <h3 style="color: #4CAF50;">Миття вікон</h3>
            <ul style="font-size: 15px; color: #333;">
              <li><strong>Потрібно миття:</strong> ${
                formData.windows.cleaning ? "Так" : "Ні"
              }</li>
              <li><strong>Площа вікон:</strong> ${
                formData.windows.area ?? "—"
              } м²</li>
              <li><strong>Кількість вікон:</strong> ${
                formData.windows.count ?? "—"
              }</li>
              <li><strong>Цвіль:</strong> ${
                formData.windows.mold ? "Так" : "Ні"
              }</li>
            </ul>
            
            <h3 style="color: #4CAF50;">Хімчистка</h3>
            <ul style="font-size: 15px; color: #333;">
              <li><strong>Потрібна:</strong> ${
                formData.chemicalCleaning.chemic ? "Так" : "Ні"
              }</li>
              <li><strong>Тип:</strong> ${
                formData.chemicalCleaning.type === "bio"
                  ? "Біо"
                  : formData.chemicalCleaning.type === "regular"
                  ? "Звичайна"
                  : "—"
              }</li>
            </ul>
            
            <h3 style="color: #4CAF50;">Інші послуги</h3>
            <ul style="font-size: 15px; color: #333;">
              <li><strong>Пилосос:</strong> ${
                formData.vacuum ? "Так" : "Ні"
              }</li>
              </ul>
              </div>
              `,
            });
            // ${
            //   formData.services.length > 0
            //     ? formData.services
            //         .map(
            //           (s, i) => `
            //   <li><strong>Додаткова послуга ${i + 1}:</strong> ID: ${
            //             s.id
            //           }, Кількість: ${s.count}, Ціна: €${s.price}</li>
            // `
            //         )
            //         .join("")
            //     : "<li>Немає додаткових послуг</li>"
            // }
      } catch (err) {
        console.error("Error sending emails:", err);
      }
    }

    res.status(200).json({ received: true });
  }
);

module.exports = router;
