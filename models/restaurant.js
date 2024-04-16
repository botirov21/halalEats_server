const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Menu = require('./menu');

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
    city:{
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
    hallImage: [
      {
        type: String,
      },
    ],
    workingDays: {
      type: String,
      required: true,
    },
    menu: [Menu.schema],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencing the User model
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User', // Referencing the User model
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
