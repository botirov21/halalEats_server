const mongoose = require("mongoose");


const restaurantSchema = new mongoose.Schema(
  { 
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    restaurantImage: {
      type: String,
      required: true,
    },
    menuImage: [
      {
        type: String,
        required: true,
      },
    ],
    hallImage: [
      {
        type: String,
        required: true,
      },
    ],
    prayerRoom: {
      type: Boolean,
      default: true,
    },
    workingDays: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);