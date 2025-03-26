const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.post("/save", async (req, res) => {
  const {
    date,
    time,
    property,
    windows,
    chemicalCleaning,
    address,
    contacts,
    paymentMethod,
    vacuum,
    services,
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO ${process.env.DB_TABLE_NAME} (
        date, time, property_type, property_area, property_rooms, property_steps,
        windows_cleaning, windows_mold, windows_area, windows_count,
        chemic, chemic_type,
        address_street, address_city, address_psc, address_house, address_floor,
        contact_name, contact_email, contact_phone, contact_message,
        payment_method, vacuum, services
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        date,
        time,
        property.type,
        property.area,
        property.rooms,
        property.steps,
        windows.cleaning,
        windows.mold,
        windows.area,
        windows.count,
        chemicalCleaning.chemic,
        chemicalCleaning.type,
        address.street,
        address.city,
        address.psc,
        address.house,
        address.floor,
        contacts.name,
        contacts.email,
        contacts.phone,
        contacts.message,
        paymentMethod,
        vacuum,
        JSON.stringify(services),
      ]
    );

    res.status(201).json({ id: result.insertId, message: "Data saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

router.get("/data", async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM ${process.env.DB_TABLE_NAME}`);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.get("/data/filter", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const [rows] = await db.query(
      `SELECT * FROM ${process.env.DB_TABLE_NAME} WHERE date BETWEEN ? AND ?`,
      [startDate, endDate]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to filter data" });
  }
});

module.exports = router;