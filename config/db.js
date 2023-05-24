const mongoose = require("mongoose");

const connectDB = async() => {
    const con = await mongoose.connect(process.env.DB_STRING)
    console.log("connected to db.. ", con.connection.host)
}

module.exports = connectDB;