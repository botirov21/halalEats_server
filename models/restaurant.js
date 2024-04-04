const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new mongoose.Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
},
{
    timestamps: true,
}
);

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
    prayerRoom: {
      type: Boolean,
      default: true,
    },
    workingDays: {
      type: String,
      required: true,
    },
    menu: [menuSchema], 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
