const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  { 
    name: { 
      type: String,
      required: true
    },
    rating: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  }
);

const restaurantSchema = new mongoose.Schema(
  { 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
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
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
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
