// Packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const router = require("./routes/router");
const apiRouter = require("./routes/api");

// Initialize App
const app = express();

// Database
mongoose
  .connect(process.env.URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB is connected"));

// Port
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("tiny"));

// Set View Engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views"));

// Load Assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));

// Routes
app.use("/", router);
app.use("/api", apiRouter);

// Run Server
app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
