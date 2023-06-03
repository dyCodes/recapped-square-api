const express = require("express");

const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const routes = require("./src/routes");

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/api", routes);

// Start server
app.listen(process.env.PORT || 8000);
