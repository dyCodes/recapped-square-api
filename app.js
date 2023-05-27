const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

const routes = require("./src/routes");

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", routes);

// Start server
app.listen(process.env.PORT || 8000);
