const mongoose = require("mongoose");

const connectDB = async() => {
      const connecting = await mongoose.connect(process.env.MONGO_URL)

      console.log(`MongoDb connected URL: ${connecting.connection.host}`.bgMagenta.bold)
}

module.exports = connectDB;