import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../pages/home-page";
import ContactsPage from "../../pages/contacts-page";
import AboutPage from "../../pages/about-page";
import PricingPage from "../../pages/pricing-page";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default AppRoutes;
