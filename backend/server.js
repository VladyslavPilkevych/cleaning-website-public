require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const formRoutes = require("./routes/formRoutes");
const emailRoutes = require("./routes/emailRoutes");
const adminPanelRoutes = require("./routes/adminPanelRoutes");

const server = express();

dotenv.config();

server.use(express.static(__dirname + "/public"));
server.use(express.json());
server.use(cors());
server.use(bodyParser.json());

// Routes
server.use("/api/form", formRoutes);
server.use("/api/email", emailRoutes);
server.use("/api/admin-panel", adminPanelRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}:`);
});
