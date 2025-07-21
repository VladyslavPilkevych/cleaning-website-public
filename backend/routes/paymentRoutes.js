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
    console.log("formData", formData);

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const serviceMeta = {};
    if(formData?.services && formData?.services.length > 0){
      formData.services.forEach((s, i) => {
        serviceMeta[`service_${i + 1}_id`] = s.id;
        serviceMeta[`service_${i + 1}_count`] = String(s.count);
        serviceMeta[`service_${i + 1}_price`] = String(s.price);
      });
    }

    // todo serviceMeta

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
        cleaning_date: formData?.date ?? "",
        cleaning_time: formData?.time ?? "",
        vacuum: formData?.vacuum ? "true" : "false",
        paymentMethod: formData?.paymentMethod ?? "",
        totalPrice: String(formData?.totalPrice ?? ""),
      
        // Контакты
        contact_name: formData.contacts?.name ?? "",
        contact_email: formData.contacts?.email ?? "",
        contact_phone: formData.contacts?.phone ?? "",
        contact_message: formData.contacts?.message ?? "",
      
        // Адрес
        address_street: formData.address?.street ?? "",
        address_city: formData.address?.city ?? "",
        address_psc: formData.address?.psc ?? "",
        address_house: formData.address?.house ?? "",
        address_floor: formData.address?.floor ?? "",
      
        // Недвижимость
        property_type: formData.property?.type ?? "",
        property_area: formData.property?.area ?? "",
        property_rooms: formData.property?.rooms ?? "",
        property_steps: formData.property?.steps ? "true" : "false",
      
        // Окна
        windows_cleaning: formData.windows?.cleaning ? "true" : "false",
        windows_mold: formData.windows?.mold ? "true" : "false",
        windows_area: formData.windows?.area ?? "",
        windows_count: formData.windows?.count ?? "",
      
        // Химчистка
        chemic: formData.chemicalCleaning?.chemic ? "true" : "false",
        chemic_type: formData.chemicalCleaning?.type ?? "",
        
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

