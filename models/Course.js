const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true, "Please add a course title"]
    },

    description: {
        type: String,
        required:[true, "Please add a course description"]
    },

    weeks: {
        type: Number,
        required:[true, "Please add number of weeks"]
    },

    tuition: {
        type: Number,
        required:[true, "Please add tution cost"]
    },

    minimumSkill: {
        type: String,
        required:[true, "Please add minimum skills"],
        enum: ["beginner", "intermediate", "advanced"]
    },

    scholarhipsAvailable: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: "Bootcamp",
        required: true
    }
})

module.exports = mongoose.model('Course', courseSchema)