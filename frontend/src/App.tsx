import React from "react";
import Header from "./components/header";
import AppRoutes from "./utils/routes";
import Box from "./components/box";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
      <Box css={{ overflowX: "hidden" }}>
        <Header />
        <AppRoutes />
        <Footer />
        <ToastContainer />
      </Box>
  );
}

export default App;
