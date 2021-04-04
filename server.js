// Packages
const express = require("express");
const morgan = require("morgan");

// Initialize App
const app = express();

// Middlewares
app.use(morgan("common"));
app.use(express.json());