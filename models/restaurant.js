const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Menu = require("./menu");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    restaurantImage: {
      type: String,
      required: true,
    },
    hallImage: [
      {
        type: String,
      },
    ],
    workingDays: {
      type: String,
      required: true,
    },
    workingHours: {
      type: String,
      required: true,
    },
    location: {
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
      required: function () {
        return !this.isMetropolitan;
      },
    },
    city: {
      type: String,
      required: function () {
        return !this.isMetropolitan;
      },
    },
    menu: [Menu.schema],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
