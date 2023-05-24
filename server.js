const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Import routers
const bootcamps = require("./routes/bootcamp");

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body parser middleware
app.use(express.json())

// Routes
app.use("/api/v1/bootcamps", bootcamps);

connectDB()

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on ${process.env.NODE_ENV} mode port ${PORT}`));
