const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const bootcamps = require("./routes/bootcamp");

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on ${process.env.NODE_ENV} mode port ${PORT}`));
