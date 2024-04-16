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

module.exports = mongoose.model("Menu", menuSchema);
