import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./utils/translations/i18n";
import { BrowserRouter } from "react-router-dom";
import "./utils/styles/reset.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
