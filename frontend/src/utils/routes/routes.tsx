import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../pages/home-page";
import ContactsPage from "../../pages/contacts-page";
import AboutPage from "../../pages/about-page";
import PricingPage from "../../pages/pricing-page";
import { RouteNames } from "./routes.constants";
import AdminPanel from "../../pages/admin-panel.tsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path={RouteNames.HOME} element={<HomePage />} />
      <Route path={RouteNames.CONTACTS} element={<ContactsPage />} />
      <Route path={RouteNames.ABOUT} element={<AboutPage />} />
      <Route path={RouteNames.PRICING} element={<PricingPage />} />
      <Route path={RouteNames.ADMIN_PANEL} element={<AdminPanel />} />
      <Route path="*" element={<Navigate to={RouteNames.HOME} />} />
    </Routes>
  );
}
export default AppRoutes;
