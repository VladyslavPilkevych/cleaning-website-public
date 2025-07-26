const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY, {
  apiVersion: "2025-03-31.basil",
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = 'eur', name, email, language, formData } = req.body.params;

    const parsedFormData = JSON.parse(formData);

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
      // metadata: {
      //   name,
      //   email,
      //   language,
      //   formData,
      // },
      metadata: {
        name,
        email,
        language,
      
        // Основные поля
        cleaning_date: "", // todo parsedFormData?.date
        cleaning_time: parsedFormData?.time ?? "",
        vacuum: parsedFormData?.vacuum ? "true" : "false",
        paymentMethod: parsedFormData?.paymentMethod ?? "",
        totalPrice: String(parsedFormData?.totalPrice ?? ""),
      
        // Контакты
        contact_name: parsedFormData.contacts?.name ?? "",
        contact_email: parsedFormData.contacts?.email ?? "",
        contact_phone: parsedFormData.contacts?.phone ?? "",
        contact_message: parsedFormData.contacts?.message ?? "",
      
        // Адрес
        address_street: parsedFormData.address?.street ?? "",
        address_city: parsedFormData.address?.city ?? "",
        address_psc: parsedFormData.address?.psc ?? "",
        address_house: parsedFormData.address?.house ?? "",
        address_floor: parsedFormData.address?.floor ?? "",
      
        // Недвижимость
        property_type: parsedFormData.property?.type ?? "",
        property_area: parsedFormData.property?.area ?? "",
        property_rooms: parsedFormData.property?.rooms ?? "",
        property_steps: parsedFormData.property?.steps ? "true" : "false",
      
        // Окна
        windows_cleaning: parsedFormData.windows?.cleaning ? "true" : "false",
        windows_mold: parsedFormData.windows?.mold ? "true" : "false",
        windows_area: parsedFormData.windows?.area ?? "",
        windows_count: parsedFormData.windows?.count ?? "",
      
        // Химчистка
        chemic: parsedFormData.chemicalCleaning?.chemic ? "true" : "false",
        chemic_type: parsedFormData.chemicalCleaning?.type ?? "",
        
        services: JSON.stringify(parsedFormData.services),
        // ...serviceMeta // todo
      },
      
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

