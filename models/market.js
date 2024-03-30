const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true,
        },
        location: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        marketImage: {
            type: String,
            required: true
        },
        workingDays:{
            type: String,
            required: true,
        },
    },
    {   
        timestamps: true,
    }
);

module.exports = mongoose.model("Market", marketSchema);