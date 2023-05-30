const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");

// models
const Bootcamp = require("./models/Bootcamp");

// config env
dotenv.config({ path: "./config/config.env" });

// Read file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/data/bootcamps.json`, "utf-8")
);

// connect database
mongoose.connect(process.env.DB_STRING)

const insertData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log("data inserted succuessfully!");
    process.exit(1);
  } catch (error) {
    console.log("error: ", error);
  }
};

const delereData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log("data deleted succuessfully!");
    process.exit(1);
  } catch (error) {
    console.log("error: ", error);
  }
};



if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  delereData();
}
