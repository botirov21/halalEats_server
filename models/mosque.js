const mongoose = require("mongoose");

const mosqueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        info: {
            type: String,
            required: true,
        },
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
        isMetropolitan: {
            type: Boolean,
            required: true,
            default: false,
        },
        province: {
            type: String,
            required: function () { return !this.isMetropolitan; },
        },
        city: {
            type: String,
            required: function () { return !this.isMetropolitan; },
        },
        metropolitanCity: {
            type: String,
            required: function () { return this.isMetropolitan; },
            enum: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju'],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Mosque", mosqueSchema);
